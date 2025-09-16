# 销售与营收指挥中心（Vite + React + Tailwind + Recharts）

## 本地运行
```bash
npm install
npm run dev
```

## 构建
```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages
1. 将此项目推到 GitHub 仓库。
2. 编辑 `vite.config.ts`/`vite.config.js`，取消注释并将 `base` 改为 `/<你的仓库名>/`：
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',
   })
   ```
3. 执行：
   ```bash
   npm run deploy
   ```
4. 访问 `https://<你的用户名>.github.io/<你的仓库名>/`。

> 也可用 Vercel/Netlify 一键部署。
