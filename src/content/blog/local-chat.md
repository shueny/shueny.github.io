---
title: 'Local Chat System'
description: 'A local chat simulator for exams, built with TypeScript and React. Features include user login, real-time messaging, and persistent usernames across browser tabs. Follow the setup guide to clone, configure, and deploy the application.'
pubDate: 'Aug 28 2024'
cover: 'https://shueny.github.io/local-chat-simulator.jpg'
category: 'project'
---

# Local Chat System Setup Guide

**為什麼要做這件事？** 在開發和測試即時通訊功能時，我發現市面上缺乏一個簡單、可本地部署的聊天系統模擬器。無論是用於面試技術展示、教學演示，還是快速原型開發，都需要一個能夠在本地環境中運行的完整聊天系統。這個 Local Chat System 的建立動機源於實際需求：我需要一個能夠展示即時通訊核心功能（用戶登入、訊息發送、跨標籤頁狀態同步）的完整範例，同時又要足夠輕量，能夠快速部署和測試。更重要的是，這個專案展示了如何使用 TypeScript 和 React 構建一個具有良好型別安全性和用戶體驗的現代化應用，這對於想要學習即時通訊開發的開發者來說，是一個極佳的實戰範例。

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
