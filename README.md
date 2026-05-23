# 文件自动归类工具

一个基于 Vue 3 的文件自动归类 Web 工具，支持按类型、时间以及时间+类型组合三种方式整理文件，并支持打包下载。

## ✨ 功能特点

- 📁 **按类型整理**：自动将文件分类为视频、音频、图片、文档等类别
- 📅 **按时间整理**：按文件修改日期分组展示
- 🔄 **按时间+类型整理**：日期→类型→文件的嵌套结构展示
- 📥 **多种下载方式**：支持单文件、分组、全部打包下载
- 🖥️ **纯前端实现**：所有处理在浏览器中完成，无需后端服务器
- 🎨 **优雅界面**：基于 Element Plus 的现代化 UI

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📖 使用说明

1. **上传文件**：点击或拖拽文件到上传区域
2. **选择整理模式**：
   - 按类型整理：视频/音频/图片/文档分类
   - 按时间整理：按日期分组
   - 按时间+类型整理：日期和类型的嵌套结构
3. **下载文件**：
   - 点击分类/日期标题下载该组文件
   - 点击底部「下载全部」按钮下载所有文件
4. **重置**：点击「重置」按钮清空所有文件

## 🔧 技术栈

- Vue 3 + Composition API
- TypeScript
- Vite
- Element Plus
- Pinia
- JSZip

## 📁 项目结构

```
├── src/
│   ├── components/          # 组件目录
│   │   ├── UploadArea.vue      # 上传区域组件
│   │   ├── FileList.vue        # 文件列表组件
│   │   ├── ClassificationTree.vue  # 分类树组件
│   │   ├── DateGroup.vue       # 日期分组组件
│   │   ├── DateTypeGroup.vue   # 日期+类型分组组件
│   │   └── ActionButtons.vue   # 操作按钮组件
│   ├── stores/              # 状态管理
│   │   └── fileStore.ts       # 文件状态管理
│   ├── types/               # 类型定义
│   │   └── file.ts            # 文件相关类型
│   ├── utils/               # 工具函数
│   │   ├── classifier.ts      # 文件分类工具
│   │   ├── fileUtils.ts       # 文件工具
│   │   ├── timeUtils.ts       # 时间工具
│   │   └── zipUtils.ts        # ZIP打包工具
│   ├── App.vue              # 主应用组件
│   └── main.ts              # 入口文件
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 📦 支持的文件格式

| 类别 | 支持格式 |
|------|----------|
| 视频 | mp4, mov, avi, mkv, flv, wmv |
| 音频 | mp3, wav, flac, m4a, ogg |
| 图片 | jpg, jpeg, png, gif, webp, bmp |
| 文档 | txt, pdf, doc, docx, xls, xlsx, ppt, pptx |

## 📝 License

MIT
