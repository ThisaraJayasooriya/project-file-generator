import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { toPascalCase, toCamelCase, toKebabCase } from './utils/case.util';

enum ProjectStructure {
	MVC = 'MVC (controllers / routes / models)',
	FEATURE = 'Feature-based (module folder)'
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

	// Input validation: only allow alphanumeric, hyphens, and underscores
	if (!/^[a-zA-Z0-9_-]+$/.test(moduleName)) {
		vscode.window.showErrorMessage('Invalid module name. Use only letters, numbers, hyphens, and underscores.');
		return;
	}

	if (structure === ProjectStructure.MVC) {
		createMVCFiles(moduleName.toLowerCase());
	} else {
		createFeatureFiles(moduleName.toLowerCase());
	}
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

function capitalize(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function controllerTemplate(rawName: string) {
	const Name = toPascalCase(rawName);
	const name = toCamelCase(rawName);

	return `export const create${Name} = async (req, res) => {
	try {
		res.status(201).json({ message: '${Name} created successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const get${Name}s = async (req, res) => {
	try {
		res.status(200).json([]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const get${Name}ById = async (req, res) => {
	try {
		res.status(200).json({});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const update${Name} = async (req, res) => {
	try {
		res.status(200).json({ message: '${Name} updated successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const delete${Name} = async (req, res) => {
	try {
		res.status(200).json({ message: '${Name} deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
`;
}

function routeTemplate(rawName: string) {
	const Name = toPascalCase(rawName);   // PascalCase for functions/classes
	const routeName = toKebabCase(rawName); // kebab-case for URLs & filenames

	return `import express from 'express';
import {
	create${Name},
	get${Name}s,
	get${Name}ById,
	update${Name},
	delete${Name}
} from '../controllers/${routeName}.controller.js';

const router = express.Router();

router.post('/', create${Name});
router.get('/', get${Name}s);
router.get('/:id', get${Name}ById);
router.put('/:id', update${Name});
router.delete('/:id', delete${Name});

export default router;
`;
}

function modelTemplate(rawName: string) {
	const Name = toPascalCase(rawName);

	return `import mongoose from 'mongoose';

const ${Name}Schema = new mongoose.Schema(
	{
		// TODO: define fields
	},
	{ timestamps: true }
);

export default mongoose.model('${Name}', ${Name}Schema);
`;
}

function routeTemplateFeature(rawName: string) {
	const Name = toPascalCase(rawName);
	const routeName = toKebabCase(rawName);

	return `import express from 'express';
import {
	create${Name},
	get${Name}s,
	get${Name}ById,
	update${Name},
	delete${Name}
} from './${routeName}.controller.js';

const router = express.Router();

router.post('/', create${Name});
router.get('/', get${Name}s);
router.get('/:id', get${Name}ById);
router.put('/:id', update${Name});
router.delete('/:id', delete${Name});

export default router;
`;
}

function createMVCFiles(rawName: string) {
	const root = getWorkspaceRoot();
	if (!root) return;

	const name = toKebabCase(rawName);

	const controllersDir = path.join(root, 'src/controllers');
	const routesDir = path.join(root, 'src/routes');
	const modelsDir = path.join(root, 'src/models');

	ensureFolder(controllersDir);
	ensureFolder(routesDir);
	ensureFolder(modelsDir);

	const files = [
		{
			path: path.join(controllersDir, `${name}.controller.js`),
			content: controllerTemplate(rawName)
		},
		{
			path: path.join(routesDir, `${name}.routes.js`),
			content: routeTemplate(rawName)
		},
		{
			path: path.join(modelsDir, `${name}.model.js`),
			content: modelTemplate(rawName)
		}
	];

	writeFiles(files, rawName);
}

function createFeatureFiles(rawName: string) {
	const root = getWorkspaceRoot();
	if (!root) return;

	const kebab = toKebabCase(rawName);   // folder & file names
	const pascal = toPascalCase(rawName); // template names

	// Feature folder inside 'src'
	const srcDir = path.join(root, 'src');
	const moduleDir = path.join(srcDir, kebab); // feature-based folder
	ensureFolder(moduleDir);

	const files = [
		{
			path: path.join(moduleDir, `${kebab}.controller.js`),
			content: controllerTemplate(pascal)
		},
		{
			path: path.join(moduleDir, `${kebab}.routes.js`),
			content: routeTemplateFeature(rawName)
		},
		{
			path: path.join(moduleDir, `${kebab}.model.js`),
			content: modelTemplate(pascal)
		}
	];

	writeFiles(files, rawName);
}

function writeFiles(files: { path: string; content: string }[], moduleName: string) {
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
		`REST backend module "${moduleName}" created successfully`
	);
}

export function deactivate() {}