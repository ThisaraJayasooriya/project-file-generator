# MERN Project File Generator

A powerful VS Code extension that accelerates MERN stack development by automatically generating complete project modules with proper file structure, naming conventions, and boilerplate code for both frontend and backend components.

## ✨ Features

### 🚀 Quick Module Generation
Generate complete MERN stack modules with a single command:

**Backend Modules:**
- **Controllers**: CRUD operation handlers with comprehensive error handling
- **Routes**: Express router setup with RESTful endpoints
- **Models**: Mongoose schema templates with TypeScript interfaces

**Frontend Components:**
- **React Components**: Functional components with TypeScript/JavaScript
- **CSS Modules**: Scoped styling with `.module.css` files
- **Type Safety**: Props interfaces for TypeScript projects

### 🏗️ Multiple Project Structures
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

### 🎯 Smart Naming Conventions
Automatically applies proper case conventions:
- **kebab-case** for file names and URLs
- **PascalCase** for model/class names
- **camelCase** for variables and functions

### 📝 Pre-configured Templates
Generated files include:
- ✅ Standard CRUD operations (Create, Read, Update, Delete, List)
- ✅ Error handling and status codes
- ✅ Mongoose schema boilerplate
- ✅ Express router configuration
- ✅ ES6 module syntax

## 📦 Installation

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

## 🛠️ Usage

### Creating Backend Modules

1. Open your MERN project workspace in VS Code
2. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type and select **"Create Backend Module"**
4. Choose language (JavaScript or TypeScript)
5. Select project structure (MVC or Feature-based)
6. Enter module name (e.g., "user", "product", "order")
7. Files are generated automatically! ✨

### Creating React Components

1. Open your React/MERN project workspace
2. Open Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`
3. Type and select **"Create React Component"**
4. Choose language (JavaScript or TypeScript)
5. Enter component name (e.g., "UserCard", "ProductList")
6. Component files are generated in `src/components/` ✨

**Tip:** You can also right-click any folder in the Explorer and select "Create Backend Module" or "Create React Component" from the context menu!

## 📋 Requirements

- Visual Studio Code v1.109.0 or higher
- Node.js project with `src/` directory structure
- For backend: Express.js and Mongoose (optional)
- For React: React 16.8+ (for functional components)

No additional setup required! The extension works out of the box.

## 🎨 Example Output

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
```

**React Component** (`UserCard.tsx`):
```typescript
import styles from './UserCard.module.css';

interface UserCardProps {
	// TODO: define props
}

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

## 💡 Why Use This Extension?

- ⚡ **Save Time**: Generate complete modules in seconds, not minutes
- 📐 **Consistent Structure**: Maintain uniform code structure across your project
- 🎯 **Best Practices**: Follow MERN stack conventions automatically
- 🔧 **Flexible**: Choose between MVC or feature-based architectures
- 🌐 **TypeScript Ready**: Full TypeScript support for type-safe development
- 🎨 **Modern React**: Uses functional components and CSS modules

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📄 License

This extension is licensed under the [MIT License](LICENSE).

## ⭐ Support

If you find this extension helpful, please consider:
- ⭐ Starring the project
- 📢 Sharing it with other developers
- 🐛 Reporting bugs or suggesting features
- 💬 Leaving a review on the marketplace

## 🎯 Roadmap

**Completed ✅**
- [x] Backend module generation (JavaScript & TypeScript)
- [x] React component generation (JavaScript & TypeScript)
- [x] MVC and Feature-based structures
- [x] CSS Modules support
- [x] Smart naming conventions

**Coming Soon 🚀**

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

---

**Made with ❤️ for MERN developers**

**Enjoy faster development! 🚀**
