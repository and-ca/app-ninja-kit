# Security Policy

## Overview

At **App Ninja Kit**, security is a top priority. We are committed to protecting user data and ensuring the safety of our application. This policy outlines the security practices we follow and how to report potential security vulnerabilities.

## Supported Versions

We support the latest release of the project and encourage all users to upgrade to the latest version to ensure they have the most secure experience.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Features

- **Sandboxing**: All renderer processes are fully sandboxed for enhanced security.
- **Context Isolation**: Ensures that scripts running in the renderer cannot access Electron internals or preload scripts.
- **Secure Local Storage**: We use double encryption (Node.js Crypto + Electron Safe Storage) to protect sensitive information stored locally.

## Reporting a Vulnerability

If you discover a security vulnerability, please [open an issue](https://github.com/and-ca/app-ninja-kit/issues) on our GitHub repository. Please mark the issue as "Security" and include as much information as possible to help us understand the problem.

### What we need:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability

We encourage community members to participate in fixing the issue. If you'd like to help resolve it, feel free to submit a pull request with a proposed fix or mitigation. Collaboration is key to keeping the project secure.

## Disclosure Policy

We believe in responsible disclosure. Once a vulnerability is fixed, we will publicly acknowledge the reporter’s contribution unless they prefer to remain anonymous.
