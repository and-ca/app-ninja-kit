![App Icon](./resources/icon.png)

# App Ninja Kit

**App Ninja Kit** is a frameless, powerful, and flexible open-source template designed to streamline the development of modern, fast, and secure cross-platform applications. Built with **[Electron](https://www.electronjs.org/)**, **[Vite](https://electron-vite.org/)**, **[React](https://react.dev/)**, **[Redux](https://redux.js.org/introduction/examples)**, **[TypeScript](https://www.typescriptlang.org/)**, **[Tailwind](https://tailwindcss.com/)**, and featuring **secure local storage** with localization support, App Ninja Kit provides the foundation for building robust apps.

## Features

- End-to-end encrypted IPC communication for secure inter-process messaging.
- Frameless window for modern UI/UX.
- Integrated localization support.
- Double encryption for secure local storage.
- Built-in user registration and sign-in system.

## Demo

App Ninja Kit includes a pre-built registration and sign-in system.

## Recommended Development Setup

We recommend the following tools for an optimal development experience:

- [VSCode](https://code.visualstudio.com/)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://prettier.io/)

## Installation

1. Clone the repository:

```bash
git clone git@github.com:your-username/app-ninja-kit.git
cd app-ninja-kit
```

2. Install dependencies

```bash
npm install
```

3. Two files, .env.development and .env.production, will be created at the root of the project with the following environment variable, containing a HEX key:

```.env
MAIN_VITE_CRYPTO_SECRET=your-generated-hex-key
```

**Generate Key:** You can generate new HEX key using the following command:

```bash
 npm run genarateKey
```

* The development key will be generated only once.
* The production key will be generated before each production run.

4. Start development:

```bash
npm run dev
```

### Build

```bash
# For windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## Secure Session Configuration

App Ninja Kit is designed with a strong focus on security. It incorporates key security settings and encryption practices to safeguard data and communication.

### Electron Security Settings

- **Sandbox Enabled:** `sandbox: true`  
  Provides an additional security layer by isolating the renderer process, preventing it from accessing Node.js and system resources directly.

- **Context Isolation Enabled:** `contextIsolation: true`  
  Ensures that the renderer process cannot access Node.js APIs or the Electron `remote` module, reducing the risk of cross-site scripting (XSS) attacks.

- **Node Integration Disabled:** `nodeIntegration: false`  
  Prevents the renderer process from using Node.js APIs, limiting its access to potentially sensitive system resources.

- **Node Integration in Workers Disabled:** `nodeIntegrationInWorker: false`  
  Ensures that web workers do not have Node.js integration, maintaining strict separation between different execution contexts.

- **Node Integration in Subframes Disabled:** `nodeIntegrationInSubFrames: false`  
  Prevents subframes from accessing Node.js APIs, reducing the risk of attacks through embedded content.

  **Note:** These are default security measures, but users are encouraged to explore additional layers of security based on their specific application needs.
  
### Secure IPC Communication

App Ninja Kit includes end-to-end encrypted IPC communication between the main and renderer processes using a custom encryption system.

- **MainEncryption.ts** handles encryption and decryption in the main process.
- **PreloadEncryption.ts** manages secure communication in the renderer process.

This ensures that all messages passed between processes are encrypted, protecting sensitive data during IPC transmission.

### Double Encryption for App Storage

App Ninja Kit utilizes a double encryption mechanism to secure local data:

1. **Node.js Crypto:**  
   Utilizes a universal application key for initial encryption of data. This key is used with Node.js's `crypto` module to encrypt the data before it is stored.

2. **Electron Safe Storage:**  
   The encrypted data is further secured with a user-specific key using Electron Safe Storage, providing an additional layer of encryption that ties data protection to the individual user.

**Encryption Workflow:**

- **Initial Encryption:** Data is encrypted with a universal key using Node.js's `crypto` module.
- **Additional Encryption:** The encrypted data is further secured with a user-specific key using Electron Safe Storage.

This double encryption approach ensures that sensitive data remains protected from unauthorized access, both at the application level and user-specific level.

## Contributing

We welcome contributions to this project! Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) file for guidelines on how to contribute, including important legal agreements.
