import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

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
	const moduleName = await vscode.window.showInputBox({
		prompt: 'Enter module name (e.g., host)',
		placeHolder: 'host'
	});

	if (!moduleName) {
		vscode.window.showWarningMessage('Module name is required.');
		return;
	}

	createFiles(moduleName.toLowerCase());
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

function createFiles(moduleName: string) {
	const root = getWorkspaceRoot();
	if (!root) return;

	const controllersDir = path.join(root, 'controllers');
	const routesDir = path.join(root, 'routes');
	const modelsDir = path.join(root, 'models');

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

export function deactivate() {}