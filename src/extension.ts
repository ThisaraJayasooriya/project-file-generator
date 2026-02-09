import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

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

function controllerTemplate(name: string) {
	const Name = capitalize(name);

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

function routeTemplate(name: string) {
	const Name = capitalize(name);

	return `import express from 'express';
import {
	create${Name},
	get${Name}s,
	get${Name}ById,
	update${Name},
	delete${Name}
} from '../controllers/${name}.controller.js';

const router = express.Router();

router.post('/', create${Name});
router.get('/', get${Name}s);
router.get('/:id', get${Name}ById);
router.put('/:id', update${Name});
router.delete('/:id', delete${Name});

export default router;
`;
}

function modelTemplate(name: string) {
	const Name = capitalize(name);

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

function routeTemplateFeature(name: string) {
	const Name = capitalize(name);

	return `import express from 'express';
import {
	create${Name},
	get${Name}s,
	get${Name}ById,
	update${Name},
	delete${Name}
} from './${name}.controller.js';

const router = express.Router();

router.post('/', create${Name});
router.get('/', get${Name}s);
router.get('/:id', get${Name}ById);
router.put('/:id', update${Name});
router.delete('/:id', delete${Name});

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

	writeFiles(files, moduleName);
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

	writeFiles(files, moduleName);
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