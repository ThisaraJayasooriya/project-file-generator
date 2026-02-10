import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { toPascalCase, toCamelCase, toKebabCase } from './utils/case.util';

enum ProjectStructure {
	MVC = 'MVC (controllers / routes / models)',
	FEATURE = 'Feature-based (module folder)'
}

async function createBackendModule(targetFolderUri?: vscode.Uri) {
	const language = await vscode.window.showQuickPick(
		['JavaScript', 'TypeScript'],
		{
			placeHolder: 'Select language'
		}
	);

	if (!language) return;

	const useTypeScript = language === 'TypeScript';

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
		createMVCFiles(moduleName.toLowerCase(), useTypeScript, targetFolderUri);
	} else {
		createFeatureFiles(moduleName.toLowerCase(), useTypeScript, targetFolderUri);
	}
}

async function createReactComponent(targetFolderUri?: vscode.Uri) {
	const language = await vscode.window.showQuickPick(
		['JavaScript', 'TypeScript'],
		{
			placeHolder: 'Select language'
		}
	);

	if (!language) return;

	const useTypeScript = language === 'TypeScript';

	const componentName = await vscode.window.showInputBox({
		prompt: 'Enter component name (e.g., UserCard)',
		placeHolder: 'UserCard'
	});

	if (!componentName) {
		vscode.window.showWarningMessage('Component name is required.');
		return;
	}

	// Input validation: only allow alphanumeric, hyphens, and underscores
	if (!/^[a-zA-Z0-9_-]+$/.test(componentName)) {
		vscode.window.showErrorMessage('Invalid component name. Use only letters, numbers, hyphens, and underscores.');
		return;
	}

	createReactComponentFiles(componentName, useTypeScript, targetFolderUri);
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Project File Generator activated');

	const backendCommand = vscode.commands.registerCommand(
		'projectFileGenerator.createBackendModule',
		async (uri?: vscode.Uri) => {
			await createBackendModule(uri);
		}
	);

	const reactCommand = vscode.commands.registerCommand(
		'projectFileGenerator.createReactComponent',
		async (uri?: vscode.Uri) => {
			await createReactComponent(uri);
		}
	);

	context.subscriptions.push(backendCommand, reactCommand);
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

function controllerTemplate(rawName: string, useTypeScript: boolean) {
	const Name = toPascalCase(rawName);
	const name = toCamelCase(rawName);

	if (useTypeScript) {
		return `import { Request, Response } from 'express';

export const create${Name} = async (req: Request, res: Response): Promise<void> => {
	try {
		res.status(201).json({ message: '${Name} created successfully' });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const get${Name}s = async (req: Request, res: Response): Promise<void> => {
	try {
		res.status(200).json([]);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const get${Name}ById = async (req: Request, res: Response): Promise<void> => {
	try {
		res.status(200).json({});
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const update${Name} = async (req: Request, res: Response): Promise<void> => {
	try {
		res.status(200).json({ message: '${Name} updated successfully' });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const delete${Name} = async (req: Request, res: Response): Promise<void> => {
	try {
		res.status(200).json({ message: '${Name} deleted successfully' });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
`;
	} else {
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
}

function routeTemplate(rawName: string, useTypeScript: boolean) {
	const Name = toPascalCase(rawName);
	const routeName = toKebabCase(rawName);
	const ext = useTypeScript ? '' : '.js';

	if (useTypeScript) {
		return `import express, { Router } from 'express';
import {
	create${Name},
	get${Name}s,
	get${Name}ById,
	update${Name},
	delete${Name}
} from '../controllers/${routeName}.controller';

const router: Router = express.Router();

router.post('/', create${Name});
router.get('/', get${Name}s);
router.get('/:id', get${Name}ById);
router.put('/:id', update${Name});
router.delete('/:id', delete${Name});

export default router;
`;
	} else {
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
}

function modelTemplate(rawName: string, useTypeScript: boolean) {
	const Name = toPascalCase(rawName);

	if (useTypeScript) {
		return `import mongoose, { Schema, Document } from 'mongoose';

export interface I${Name} extends Document {
	// TODO: define fields
	createdAt?: Date;
	updatedAt?: Date;
}

const ${Name}Schema = new Schema<I${Name}>(
	{
		// TODO: define fields
	},
	{ timestamps: true }
);

export default mongoose.model<I${Name}>('${Name}', ${Name}Schema);
`;
	} else {
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
}

function routeTemplateFeature(rawName: string, useTypeScript: boolean) {
	const Name = toPascalCase(rawName);
	const routeName = toKebabCase(rawName);
	const ext = useTypeScript ? '' : '.js';

	if (useTypeScript) {
		return `import express, { Router } from 'express';
import {
	create${Name},
	get${Name}s,
	get${Name}ById,
	update${Name},
	delete${Name}
} from './${routeName}.controller';

const router: Router = express.Router();

router.post('/', create${Name});
router.get('/', get${Name}s);
router.get('/:id', get${Name}ById);
router.put('/:id', update${Name});
router.delete('/:id', delete${Name});

export default router;
`;
	} else {
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
}

function reactComponentTemplate(componentName: string, useTypeScript: boolean) {
	const Name = toPascalCase(componentName);
	const kebabName = toKebabCase(componentName);

	if (useTypeScript) {
		return `import React from 'react';
import styles from './${Name}.module.css';

interface ${Name}Props {
	// TODO: define props
}

const ${Name}: React.FC<${Name}Props> = () => {
	return (
		<div className={styles.container}>
			<h2>${Name} Component</h2>
			{/* TODO: Add component content */}
		</div>
	);
};

export default ${Name};
`;
	} else {
		return `import React from 'react';
import styles from './${Name}.module.css';

const ${Name} = () => {
	return (
		<div className={styles.container}>
			<h2>${Name} Component</h2>
			{/* TODO: Add component content */}
		</div>
	);
};

export default ${Name};
`;
	}
}

function cssModuleTemplate(componentName: string) {
	return `.container {
	padding: 1rem;
	/* TODO: Add styles */
}
`;
}

function createMVCFiles(rawName: string, useTypeScript: boolean, targetFolderUri?: vscode.Uri) {
	const root = getWorkspaceRoot();
	if (!root) return;

	// Always use src folder structure
	const srcDir = path.join(root, 'src');
	ensureFolder(srcDir);

	const name = toKebabCase(rawName);
	const ext = useTypeScript ? 'ts' : 'js';

	const controllersDir = path.join(srcDir, 'controllers');
	const routesDir = path.join(srcDir, 'routes');
	const modelsDir = path.join(srcDir, 'models');

	ensureFolder(controllersDir);
	ensureFolder(routesDir);
	ensureFolder(modelsDir);

	const files = [
		{
			path: path.join(controllersDir, `${name}.controller.${ext}`),
			content: controllerTemplate(rawName, useTypeScript)
		},
		{
			path: path.join(routesDir, `${name}.routes.${ext}`),
			content: routeTemplate(rawName, useTypeScript)
		},
		{
			path: path.join(modelsDir, `${name}.model.${ext}`),
			content: modelTemplate(rawName, useTypeScript)
		}
	];

	writeFiles(files, rawName);
}

function createFeatureFiles(rawName: string, useTypeScript: boolean, targetFolderUri?: vscode.Uri) {
	const root = getWorkspaceRoot();
	if (!root) return;

	// Always use src folder structure
	const srcDir = path.join(root, 'src');
	ensureFolder(srcDir);

	const kebab = toKebabCase(rawName);   // folder & file names
	const pascal = toPascalCase(rawName); // template names
	const ext = useTypeScript ? 'ts' : 'js';

	const moduleDir = path.join(srcDir, kebab); // feature-based folder
	ensureFolder(moduleDir);

	const files = [
		{
			path: path.join(moduleDir, `${kebab}.controller.${ext}`),
			content: controllerTemplate(pascal, useTypeScript)
		},
		{
			path: path.join(moduleDir, `${kebab}.routes.${ext}`),
			content: routeTemplateFeature(rawName, useTypeScript)
		},
		{
			path: path.join(moduleDir, `${kebab}.model.${ext}`),
			content: modelTemplate(pascal, useTypeScript)
		}
	];

	writeFiles(files, rawName);
}

function createReactComponentFiles(componentName: string, useTypeScript: boolean, targetFolderUri?: vscode.Uri) {
	const root = getWorkspaceRoot();
	if (!root) return;

	const Name = toPascalCase(componentName);
	const ext = useTypeScript ? 'tsx' : 'jsx';

	// Always use src/components structure
	const srcDir = path.join(root, 'src');
	ensureFolder(srcDir);

	const componentsDir = path.join(srcDir, 'components');
	ensureFolder(componentsDir);

	// Create component folder inside components
	const componentDir = path.join(componentsDir, Name);
	ensureFolder(componentDir);

	const files = [
		{
			path: path.join(componentDir, `${Name}.${ext}`),
			content: reactComponentTemplate(componentName, useTypeScript)
		},
		{
			path: path.join(componentDir, `${Name}.module.css`),
			content: cssModuleTemplate(componentName)
		}
	];

	writeFiles(files, Name);
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
		`Module "${moduleName}" created successfully`
	);
}

export function deactivate() {}