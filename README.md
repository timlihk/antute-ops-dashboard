# 🚀 销售与营收指挥中心
> **企业级销售数据分析平台** | 基于 SAP/Salesforce 最佳实践

一个现代化的销售数据可视化仪表盘，采用 React + Vite 构建，提供实时的销售业绩分析、团队管理和 AI 智能洞察功能。专为销售管理者和业务分析师设计，助力数据驱动的销售决策。

[![部署状态](https://img.shields.io/badge/部署-Vercel-brightgreen)](https://vercel.com)
[![技术栈](https://img.shields.io/badge/技术栈-React%2018-blue)](#技术栈)
[![许可证](https://img.shields.io/badge/许可证-MIT-green)](#许可证)

## 📊 核心功能特性

### 🎯 **统一过滤器系统**
- **多维度筛选**：时间周期（季度/月/周/年）、地区、产品线、客户分层
- **智能联动**：过滤器之间联动响应，实现精确数据钻取
- **一键清空**：快速重置所有筛选条件

### 📈 **公司级 KPI 仪表盘**
- **六大关键指标**：总营收、目标完成度、增长率、活跃商机、成交转化率
- **可视化进度条**：直观显示目标完成进度
- **实时增长指标**：环比增长率和趋势分析

### 🔄 **跨层级导航钻取**
```
公司总体 → 区域分析 → 团队表现 → 个人详情
```
- **层次化数据展示**：支持从宏观到微观的数据探索
- **点击式导航**：交互式图表支持点击钻取
- **上下文保持**：筛选条件在不同层级间保持一致

### ⚖️ **对比分析模块**
- **个人 vs 团队平均**：直观对比个人表现与团队基准
- **色彩编码差异**：绿色/红色标识超出/低于平均水平
- **多维度对比**：营收、完成度、客户满意度全方位对比
- **差值计算**：精确显示与团队平均的数值差异

### 🤖 **AI 智能洞察**
- **自动趋势分析**：基于历史数据的增长趋势识别
- **个性化建议**：针对性的业务改进行动建议
- **风险预警**：潜在业务风险和机会识别
- **置信度评分**：AI 分析结果的可信度指标

### 📊 **可视化图表**
- **区域热力图**：柱状图展示各地区营收对比
- **销售漏斗**：完整商机转化流程可视化
- **个人业绩趋势**：时间序列折线图
- **商机管道分布**：饼图展示开放/已成交商机比例

## 🛠 技术栈

### 前端框架
- **React 18.3.1** - 现代化 UI 库
- **Vite 5.4.3** - 快速构建工具
- **JavaScript (ES6+)** - 核心开发语言

### UI/样式
- **Tailwind CSS 3.4.10** - 实用优先的 CSS 框架
- **PostCSS 8.4.47** - CSS 后处理器
- **Autoprefixer** - CSS 兼容性自动处理

### 数据可视化
- **Recharts 2.12.7** - React 图表库
  - 柱状图 (BarChart)
  - 折线图 (LineChart)
  - 饼图 (PieChart)
  - 漏斗图 (FunnelChart)
  - 响应式容器 (ResponsiveContainer)

### 开发工具
- **@vitejs/plugin-react** - Vite React 插件
- **TypeScript 类型定义** - 增强开发体验

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/timlihk/antute-ops-dashboard.git
cd antute-ops-dashboard
```

2. **安装依赖**
```bash
npm install
# 或者
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或者
yarn dev
```

4. **打开浏览器**
访问 `http://localhost:5173` 查看应用

### 构建部署

```bash
# 生产环境构建
npm run build

# 本地预览构建结果
npm run preview
```

## 🌐 部署指南

### Vercel 部署（推荐）

1. **连接 GitHub**
   - 访问 [Vercel](https://vercel.com)
   - 连接此 GitHub 仓库

2. **自动部署**
   - Vercel 自动检测 Vite 项目
   - 构建命令：`npm run build`
   - 输出目录：`dist`

3. **环境变量**（如需要）
   ```env
   NODE_ENV=production
   ```

### 其他部署平台
- **Netlify**：拖拽 `dist` 文件夹
- **GitHub Pages**：使用 `gh-pages` 分支
- **服务器部署**：将 `dist` 内容上传到 web 服务器

## 📱 功能模块详解

### 1. 数据筛选系统
```javascript
// 支持的筛选维度
const filters = {
  period: ['本季度', '本月', '本周', '本年度'],
  region: ['华北', '华东', '华南', '西部', '中部'],
  product: ['硬件', '软件', '服务'],
  segment: ['企业客户', '中端客户', '中小客户']
}
```

### 2. KPI 指标体系
- **总营收**：当前周期累计销售额
- **目标完成度**：实际营收/目标营收比例
- **环比增长**：与上一周期对比增长率
- **活跃商机**：当前跟进中的销售机会数量
- **成交转化率**：已成交/总商机的转化比例

### 3. AI 分析算法
```javascript
// AI 洞察生成逻辑
const generateInsights = (data) => {
  // 趋势分析
  const trendAnalysis = analyzeTrends(data);

  // 异常检测
  const anomalies = detectAnomalies(data);

  // 建议生成
  const recommendations = generateRecommendations(trendAnalysis, anomalies);

  return { trendAnalysis, recommendations, confidence: 0.85 };
}
```

## 🔧 自定义配置

### 数据源配置
修改 `src/App.jsx` 中的数据模拟部分：

```javascript
// 公司 KPI 数据
const companyKPI = {
  revenue: 6800000,    // 总营收
  target: 8000000,     // 目标营收
  attainment: 0.85,    // 完成度
  growth: 0.12         // 增长率
};

// 销售人员数据
const repPerf = [
  {
    name: "张伟",
    region: "华北",
    revenue: 800000,
    attainment: 0.95,
    // ... 更多字段
  }
];
```

### 样式定制
Tailwind CSS 配置文件：`tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // 自定义颜色
        'brand-blue': '#60a5fa',
        'brand-purple': '#a855f7'
      }
    }
  }
}
```

## 📊 数据结构说明

### 销售人员数据模型
```typescript
interface SalesRep {
  name: string;           // 姓名
  region: string;         // 所属地区
  segment: string;        // 客户分层
  product: string;        // 主要产品线
  revenue: number;        // 销售额
  attainment: number;     // 完成度 (0-1)
  customers: number;      // 客户数量
  newContracts: number;   // 新签合同数
  satisfaction: number;   // 客户满意度
  pipeline: {
    open: number;         // 开放商机
    closed: number;       // 已成交
  };
}
```

### 区域数据模型
```typescript
interface Region {
  region: string;         // 地区名称
  value: number;          // 营收金额
  target: number;         // 目标金额
  growth: number;         // 增长率
  teams: number;          // 团队数量
}
```

## 🎨 界面展示

### 主仪表盘
- 顶部 KPI 卡片展示公司关键指标
- 统一过滤器栏支持多维度数据筛选
- 区域营收对比柱状图
- 销售漏斗转化分析

### 对比分析页面
- 个人与团队平均性能对比表格
- 色彩编码的差异指标
- 详细的数值差异展示

### AI 洞察模块
- 渐变背景的智能分析区块
- 业绩趋势和行动建议分类展示
- 置信度和更新时间显示

### 个人详情页面
- 个人 KPI 卡片
- 销售趋势折线图
- 商机管道饼图
- 近期活动和合同列表

## 🔄 更新日志

### v2.0.0 (2024-09-16)
- ✨ 新增统一过滤器系统
- ✨ 实现跨层级数据钻取
- ✨ 添加个人 vs 团队对比分析
- ✨ 集成 AI 智能洞察模块
- 🎨 优化 UI 设计和响应式布局
- 🔧 增强数据筛选和联动功能

### v1.0.0 (2024-09-16)
- 🚀 项目初始版本
- 📊 基础销售仪表盘功能
- 📈 区域和个人业绩可视化
- 🎯 销售漏斗分析

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

### 代码规范
- 使用 ESLint 和 Prettier
- 组件命名采用 PascalCase
- 函数命名采用 camelCase
- 提交信息遵循 Conventional Commits

## 📄 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面库
- [Recharts](https://recharts.org/) - 图表组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Vite](https://vitejs.dev/) - 构建工具

---

<p align="center">
  <strong>🤖 Generated with <a href="https://claude.ai/code">Claude Code</a></strong><br>
  Co-Authored-By: Claude &lt;noreply@anthropic.com&gt;
</p>