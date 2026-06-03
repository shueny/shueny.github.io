---
title: '本地聊天系統'
description: '一個用於考試的本地聊天模擬器，使用 TypeScript 和 React 構建。功能包括用戶登入、即時訊息傳遞，以及跨瀏覽器標籤頁的持久化用戶名。按照設置指南來克隆、配置和部署應用程式。'
pubDate: 'Aug 28 2024'
cover: 'https://shueny.github.io/local-chat-simulator.jpg'
category: 'project'
lang: 'zh'
draft: false
---

# 本地聊天系統設置指南

**為什麼要做這件事？** 在開發和測試即時通訊功能時，我發現市面上缺乏一個簡單、可本地部署的聊天系統模擬器。無論是用於面試技術展示、教學演示，還是快速原型開發，都需要一個能夠在本地環境中運行的完整聊天系統。這個 Local Chat System 的建立動機源於實際需求：我需要一個能夠展示即時通訊核心功能（用戶登入、訊息發送、跨標籤頁狀態同步）的完整範例，同時又要足夠輕量，能夠快速部署和測試。更重要的是，這個專案展示了如何使用 TypeScript 和 React 構建一個具有良好型別安全性和用戶體驗的現代化應用，這對於想要學習即時通訊開發的開發者來說，是一個極佳的實戰範例。

## 環境設置

### 需求

- 確保已安裝以下軟體：
  - [Node.js](https://nodejs.org/)（建議使用 LTS 版本）
  - [pnpm](https://pnpm.js.org/)（可選但建議使用）

### 安裝 pnpm

```bash
npm install -g pnpm
```

## 從 GitHub 克隆專案

### 克隆儲存庫

```bash
git clone <repository-url>
cd exam-local-chat
```

## 安裝依賴

### 安裝依賴

使用 pnpm 安裝所有專案依賴：

```bash
pnpm install
```

## 配置環境變數

### 創建 `.env` 檔案

在專案根目錄創建一個 `.env` 檔案並添加必要的環境變數，例如：

```plaintext
PORT=3000
DATABASE_URL=mongodb://localhost:27017/chat
```

## 啟動開發伺服器

### 啟動伺服器

```bash
pnpm start
```

## 測試應用程式

### 測試功能

- 打開瀏覽器並訪問 `http://localhost:3000`。
- 測試用戶登入、訊息發送、接收等功能。

## 建置生產版本

### 建置應用程式

```bash
pnpm build
```

## 部署應用程式

### 部署選項

- 選擇將應用程式部署到雲端服務（例如，Heroku、Vercel、AWS）。
- 根據平台要求進行配置。

## 維護和更新

### 定期更新

- 定期檢查依賴項的更新，使用 `pnpm update` 進行更新。

## 結論

按照上述步驟，您應該能夠成功設置和運行本地聊天系統。請注意每個步驟中的注意事項，以確保設置過程順利進行。

