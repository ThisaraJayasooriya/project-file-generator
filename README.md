# Project File Generator

A VS Code extension that accelerates MERN stack development by automatically generating complete project modules with proper file structure, naming conventions, and boilerplate code for both frontend and backend components.

## ✨ Features

### 🚀 Quick Module Generation
Generate complete MERN stack modules with a single command, including:

**Backend:**
- **Controllers**: CRUD operation handlers with error handling
- **Routes**: Express router setup with RESTful endpoints
- **Models**: Mongoose schema templates with timestamps

**Frontend:** (Coming Soon)
- **Components**: React components with TypeScript support
- **Pages**: Next.js page templates
- **Services**: API integration utilities

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

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install project-file-generator`
4. Press Enter

## 🛠️ Usage

1. Open your MERN project workspace in VS Code
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type and select **"Create Backend Module"**
4. Choose your project structure (MVC or Feature-based)
5. Enter the module name (e.g., "user", "product", "host")
6. Files are generated automatically in the appropriate directories

## 📋 Requirements

- Visual Studio Code v1.109.0 or higher
- Node.js project with `src/` directory structure
- MERN stack project (MongoDB, Express, React, Node.js)

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This extension is available under the MIT License.

## 🔗 Links

- [GitHub Repository](https://github.com/yourusername/project-file-generator)
- [Report Issues](https://github.com/yourusername/project-file-generator/issues)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## 🎯 Roadmap

**Backend:**
- [ ] TypeScript support for backend modules
- [ ] Validation middleware templates
- [ ] Authentication/Authorization templates
- [ ] Additional backend frameworks (NestJS, Fastify)

**Frontend:**
- [ ] React component generation
- [ ] Next.js page templates
- [ ] Redux/Context API state management templates
- [ ] API service layer generation
- [ ] React Hook Form integration

**General:**
- [ ] Custom template configurations
- [ ] Test file generation (Jest, React Testing Library)
- [ ] Environment configuration templates
- [ ] Docker & deployment configs

---

**Enjoy faster MERN development! 🚀**
