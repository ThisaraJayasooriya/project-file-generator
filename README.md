# MERN Project File Generator

A professional VS Code extension that accelerates MERN stack development by automatically generating complete project modules with proper file structure, naming conventions, and boilerplate code for both frontend and backend components.

## Features

### Quick Module Generation
Generate complete MERN stack modules with a single command using the Command Palette or right-click context menu.

**Backend Modules:**
- **Controllers**: CRUD operation handlers with comprehensive error handling
- **Routes**: Express router setup with RESTful endpoints
- **Models**: Mongoose schema templates with TypeScript interfaces

**Frontend Components:**
- **React Components**: Functional components with TypeScript/JavaScript
- **CSS Modules**: Scoped styling with `.module.css` files
- **Type Safety**: Props interfaces for TypeScript projects

### Multiple Project Structures
Choose between popular MERN stack architectures:

**Backend Structures:**

1. **MVC Structure** (Separation of Concerns)
   ```
   src/
   ├── controllers/
   │   └── module-name.controller.js
   ├── routes/
   │   └── module-name.routes.js
   └── models/
       └── module-name.model.js
   ```

2. **Feature-Based Structure** (Domain-Driven)
   ```
   src/
   └── module-name/
       ├── module-name.controller.js
       ├── module-name.routes.js
       └── module-name.model.js
   ```

**Frontend Structure:**
```
src/
└── components/
    └── ComponentName/
        ├── ComponentName.tsx
        └── ComponentName.module.css
```

### Smart Naming Conventions
Automatically applies proper case conventions:
- **kebab-case** for file names and URLs
- **PascalCase** for model/class names
- **camelCase** for variables and functions

### Pre-configured Templates
Generated files include:
- Standard CRUD operations (Create, Read, Update, Delete, List)
- Error handling and status codes
- Mongoose schema boilerplate
- Express router configuration
- ES6 module syntax

## Installation

### From VS Code Marketplace (Recommended)
1. Open VS Code
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Type `ext install mern-project-file-generator`
4. Press Enter

### Manual Installation
1. Download `.vsix` file from releases
2. Open VS Code
3. Go to Extensions view (`Ctrl+Shift+X`)
4. Click `...` menu → Install from VSIX
5. Select the downloaded `.vsix` file

## Usage

This extension provides two convenient methods to create files: using the Command Palette or the right-click context menu.

### Method 1: Using Command Palette

**Creating Backend Modules:**

1. Open your MERN project workspace in VS Code
2. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type and select **"Create Backend Module"**
4. Choose language (JavaScript or TypeScript)
5. Select project structure (MVC or Feature-based)
6. Enter module name (e.g., "user", "product", "order")
7. Files are generated automatically in the appropriate directory

**Creating React Components:**

1. Open your React/MERN project workspace
2. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type and select **"Create React Component"**
4. Choose language (JavaScript or TypeScript)
5. Enter component name (e.g., "UserCard", "ProductList")
6. Component files are generated in `src/components/`

### Method 2: Using Right-Click Context Menu (Recommended)

**Creating Backend Modules:**

1. In the VS Code Explorer panel, navigate to the folder where you want to create files
2. Right-click on the folder (or in the empty space within the folder)
3. Select **"Create Backend Module"** from the context menu
4. Example Output

When you create a module named "host", the extension generates the following fil
**Creating React Components:**

1. In the VS Code Explorer panel, navigate to your desired folder
2. Right-click on the folder (or in the empty space within the folder)
3. Select **"Create React Component"** from the context menu
4. Follow the prompts to choose language and enter component name
5. Component files are generated in the selected folder location

**Note:** The right-click method allows you to generate files in any folder within your workspace, providing greater flexibility in organizing your project structure.

## Requirements

- Visual Studio Code v1.109.0 or higher
- Node.js project with `src/` directory structure
- For backend: Express.js and Mongoose (optional)
- For React: React 16.8+ (for functional components)

No additional setup required! The extension works out of the box.

##  Example Output

When you create a module named "host", the extension generates:

**Controller** (`host.controller.js`):
```javascript
export const createHost = async (req, res) => { /* ... */ };
export const getHosts = async (req, res) => { /* ... */ };
export const getHostById = async (req, res) => { /* ... */ };
export const updateHost = async (req, res) => { /* ... */ };
export const deleteHost = async (req, res) => { /* ... */ };
```

**Routes** (`host.routes.js`):
```javascript
import express from 'express';
import { createHost, getHosts, /* ... */ } from './host.controller.js';

const router = express.Router();
router.post('/', createHost);
router.get('/', getHosts);
// ... more routes
```

**Model** (`host.model.js`):
```javascript
import mongoose from 'mongoose';

const HostSchema = new mongoose.Schema({ /* ... */ }, { timestamps: true });
export default mongoose.model('Host', HostSchema);
```Benefits

- **Save Time**: Generate complete modules in seconds, not minutes
- **Consistent Structure**: Maintain uniform code structure across your project
- **Best Practices**: Follow MERN stack conventions automatically
- **Flexible**: Choose between MVC or feature-based architectures
- **TypeScript Ready**: Full TypeScript support for type-safe development
- **Modern React**: Uses functional components and CSS modules
- **Easy Access**: Create files via Command Palette or right-click context menu

##
const UserCard: React.FC<UserCardProps> = () => {
	return (
		<div className={styles.container}>
			<h2>UserCard Component</h2>
			{/* TODO: Add component content */}
		</div>
	);
};

export default UserCard;
```

##  Why Use This Extension?

-  **Save Time**: Generate complete modules in seconds, not minutes
-  **Consistent Structure**: Maintain uniform code structure across your project
-  **Best Practices**: Follow MERN stack conventions automatically
-  **Flexible**: Choose between MVC or feature-based architectures
-  **TypeScript Ready**: Full TypeScript support for type-safe development
-  **Modern React**: Uses functional components and CSS modules

##  Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
License

This extension is licensed under the MIT License.

## Support

If you find this extension helpful, please consider:
- Starring the project
- Sharing it with other developers
- Reporting bugs or suggesting features
- Leaving a review on the marketplace

## Roadmap

**Completed:**
- Backend module generation (JavaScript & TypeScript)
- React component generation (JavaScript & TypeScript)
- MVC and Feature-based structures
- CSS Modules support
- Smart naming conventions
- Context menu integration

**Planned Features:
**Coming Soon **

**Backend:**
- [ ] Validation middleware templates
- [ ] Authentication/Authorization templates
- [ ] Additional backend frameworks (NestJS, Fastify)
- [ ] GraphQL resolver templates

**Frontend:**
- [ ] Next.js page templates
- [ ] Redux/Context API state management templates
- [ ] API service layer generation
- [ ] React Hook Form integration
- [ ] Styled Components support

**General:**
- [ ] Custom template configurations
- [ ] Test file generation (Jest, React Testing Library)
- [ ] Environment configuration templates
- [ ] Docker & deployment configs

---for MERN developers to accelerate development workflowpers**


