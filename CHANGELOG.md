# Change Log

All notable changes to the "MERN Project File Generator" extension will be documented in this file.

## [1.0.1] - 2026-02-12

### Changed
- Updated README documentation to be more professional and user-friendly
- Removed informal emojis from documentation
- Enhanced usage instructions with clearer step-by-step guidance
- Added prominent documentation for right-click context menu functionality
- Reorganized README sections for better readability and navigation
- Improved explanation of both Command Palette and context menu usage methods

## [1.0.0] - 2026-02-11

### Added
- Initial release: Generate backend module files (controllers, routes, models) for MERN projects
- React component generation with functional components and CSS modules
- Support for both JavaScript and TypeScript for backend and frontend
- Support for MVC and feature-based folder structures
- Smart case conversion for file and class names (PascalCase, camelCase, kebab-case)
- Input validation for module names
- Right-click context menu in Explorer for creating modules
- Professional extension icon and documentation

### Features
- **Backend Module Generation:**
  - MVC structure (controllers/routes/models in separate folders)
  - Feature-based structure (all files in module folder)
  - JavaScript and TypeScript support with proper typing
  - RESTful CRUD operations boilerplate (Create, Read, Update, Delete, List)
  - Mongoose models with TypeScript interfaces
  - Express routers with proper imports
  - Error handling in all controller methods

- **React Component Generation:**
  - Functional components with TypeScript/JavaScript support
  - CSS Modules for scoped styling
  - Props interface for TypeScript components
  - Clean component folder structure in src/components

### Developer Experience
- Automatic file creation in proper directory structure
- Duplicate file detection
- Clear success/warning messages
- Works with existing MERN projects
- Compatible with Create React App, Vite, Next.js

## [Unreleased]
- Dependency checking for React projects
- CSS module type declarations
- Service layer templates
- Middleware templates
- Custom configuration settings
- Test file generation (Jest, React Testing Library)
