import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

enum ProjectStructure {
	MVC = 'MVC (controllers / routes / models)',
	FEATURE = 'Feature-based (module folder)'
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Project File Generator activated');

	const command = vscode.commands.registerCommand(
		'projectFileGenerator.createBackendModule',
		async () => {
			await createBackendModule();
		}
	);

	context.subscriptions.push(command);
}

async function createBackendModule() {
	const structure = await vscode.window.showQuickPick(
		[ProjectStructure.MVC, ProjectStructure.FEATURE],
		{
			placeHolder: 'Select backend project structure'
		}
	);

	if (!structure) return;

	const moduleName = await vscode.window.showInputBox({
		prompt: 'Enter module name (e.g., host)',
		placeHolder: 'host'
	});

	if (!moduleName) {
		vscode.window.showWarningMessage('Module name is required.');
		return;
	}

	if (structure === ProjectStructure.MVC) {
		createMVCFiles(moduleName.toLowerCase());
	} else {
		createFeatureFiles(moduleName.toLowerCase());
	}
}

function getWorkspaceRoot(): string | null {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders) {
		vscode.window.showErrorMessage('No workspace is open.');
		return null;
	}
	return workspaceFolders[0].uri.fsPath;
}

function ensureFolder(folderPath: string) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
	}
}

function controllerTemplate(name: string) {
	return `export const ${name}Controller = (req, res) => {
	res.send('${name} controller works');
};
`;
}

function routeTemplate(name: string) {
	return `import express from 'express';
import { ${name}Controller } from '../controllers/${name}.controller.js';

const router = express.Router();

router.get('/', ${name}Controller);

export default router;
`;
}

function modelTemplate(name: string) {
	return `import mongoose from 'mongoose';

const ${name}Schema = new mongoose.Schema({
	// fields here
}, { timestamps: true });

export default mongoose.model('${name}', ${name}Schema);
`;
}

function routeTemplateFeature(name: string) {
	return `import express from 'express';
import { ${name}Controller } from './${name}.controller.js';

const router = express.Router();

router.get('/', ${name}Controller);

export default router;
`;
}

function createMVCFiles(moduleName: string) {
	const root = getWorkspaceRoot();
	if (!root) return;

	const srcDir = path.join(root, 'src');

	const controllersDir = path.join(srcDir, 'controllers');
	const routesDir = path.join(srcDir, 'routes');
	const modelsDir = path.join(srcDir, 'models');

	ensureFolder(controllersDir);
	ensureFolder(routesDir);
	ensureFolder(modelsDir);

	const files = [
		{
			path: path.join(controllersDir, `${moduleName}.controller.js`),
			content: controllerTemplate(moduleName)
		},
		{
			path: path.join(routesDir, `${moduleName}.routes.js`),
			content: routeTemplate(moduleName)
		},
		{
			path: path.join(modelsDir, `${moduleName}.model.js`),
			content: modelTemplate(moduleName)
		}
	];

	for (const file of files) {
		if (fs.existsSync(file.path)) {
			vscode.window.showWarningMessage(
				`File already exists: ${path.basename(file.path)}`
			);
			continue;
		}

		fs.writeFileSync(file.path, file.content);
	}

	vscode.window.showInformationMessage(
		`Backend module "${moduleName}" created successfully`
	);
}

function createFeatureFiles(moduleName: string) {
	const root = getWorkspaceRoot();
	if (!root) return;

	// You can change 'src' later via config
	const srcDir = path.join(root, 'src');
	const moduleDir = path.join(srcDir, moduleName);

	ensureFolder(moduleDir);

	const files = [
		{
			path: path.join(moduleDir, `${moduleName}.controller.js`),
			content: controllerTemplate(moduleName)
		},
		{
			path: path.join(moduleDir, `${moduleName}.routes.js`),
			content: routeTemplateFeature(moduleName)
		},
		{
			path: path.join(moduleDir, `${moduleName}.model.js`),
			content: modelTemplate(moduleName)
		}
	];

	for (const file of files) {
		if (fs.existsSync(file.path)) {
			vscode.window.showWarningMessage(
				`File already exists: ${path.basename(file.path)}`
			);
			continue;
		}

		fs.writeFileSync(file.path, file.content);
	}

	vscode.window.showInformationMessage(
		`Feature-based module "${moduleName}" created successfully`
	);
}

export function deactivate() {}