---
title: 'Local Chat System'
description: 'A local chat simulator for exams, built with TypeScript and React. Features include user login, real-time messaging, and persistent usernames across browser tabs. Follow the setup guide to clone, configure, and deploy the application.'
pubDate: 'Aug 28 2024'
cover: 'https://shueny.github.io/local-chat-simulator.jpg'
category: 'project'
---

# Local Chat System Setup Guide

## Environment Setup

### Requirements

- Ensure the following software is installed:
  - [Node.js](https://nodejs.org/) (LTS version recommended)
  - [pnpm](https://pnpm.js.org/) (optional but recommended)

### Install pnpm

```
bash
npm install -g pnpm
```

## Clone Project from GitHub

### Clone Repository

```
bash
git clone <repository-url>
cd exam-local-chat
```

## Install Dependencies

### Install Dependencies

Use pnpm to install all project dependencies:

```
bash
pnpm install
```

## Configure Environment Variables

### Create `.env` File

Create a `.env` file in the project root and add necessary environment variables, e.g.:

```
plaintext
PORT=3000
DATABASE_URL=mongodb://localhost:27017/chat
```

## Start Development Server

### Start Server

```
bash
pnpm start
```

## Test Application

### Test Functionality

- Open a browser and visit `http://localhost:3000`.
- Test user login, message sending, receiving, etc.

## Build Production Version

### Build Application

```
bash
pnpm build
```

## Deploy Application

### Deployment Options

- Choose to deploy the application to cloud services (e.g., Heroku, Vercel, AWS).
- Configure based on the platform requirements.

## Maintenance and Updates

### Regular Updates

- Check for updates to dependencies regularly and use `pnpm update` to update.

## Conclusion

By following the above steps, you should be able to successfully set up and run a local chat system. Pay attention to the notes in each step to ensure a smooth setup process.
