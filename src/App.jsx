import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from "recharts";

// 模拟数据
const regionHeatmap = [
  { region: "华北", value: 1200000 },
  { region: "华东", value: 1500000 },
  { region: "华南", value: 1000000 },
  { region: "西部", value: 800000 },
  { region: "中部", value: 950000 },
];

const repPerf = [
  { name: "张伟", region: "华北", segment: "企业客户", revenue: 800000, attainment: 0.95, customers: 35, newContracts: 12, pipeline: { open: 10, closed: 5 }, satisfaction: 82 },
  { name: "李敏", region: "华东", segment: "中端客户", revenue: 600000, attainment: 0.88, customers: 28, newContracts: 9, pipeline: { open: 8, closed: 3 }, satisfaction: 75 },
  { name: "王强", region: "华南", segment: "中小客户", revenue: 500000, attainment: 0.82, customers: 22, newContracts: 7, pipeline: { open: 6, closed: 4 }, satisfaction: 79 },
  { name: "刘芳", region: "西部", segment: "企业客户", revenue: 400000, attainment: 0.75, customers: 20, newContracts: 6, pipeline: { open: 5, closed: 2 }, satisfaction: 70 },
  { name: "陈杰", region: "中部", segment: "中端客户", revenue: 450000, attainment: 0.8, customers: 24, newContracts: 8, pipeline: { open: 7, closed: 3 }, satisfaction: 77 },
];

// 模拟销售人员主页数据
const repDetails = {
  "张伟": {
    activities: ["拜访客户A", "签订合同B", "跟进商机C"],
    contracts: ["合同 #1001 - ￥200,000", "合同 #1002 - ￥300,000"],
    trend: [
      { month: "一月", value: 50000 },
      { month: "二月", value: 80000 },
      { month: "三月", value: 120000 },
      { month: "四月", value: 200000 },
    ],
    accounts: ["客户A", "客户B", "客户C"]
  },
  "李敏": {
    activities: ["电话沟通客户D", "提交方案E"],
    contracts: ["合同 #2001 - ￥150,000"],
    trend: [
      { month: "一月", value: 40000 },
      { month: "二月", value: 60000 },
      { month: "三月", value: 90000 },
      { month: "四月", value: 160000 },
    ],
    accounts: ["客户D", "客户E"]
  }
};

const COLORS = ["#60a5fa", "#34d399"];

const funnelData = [
  { name: "潜在客户", value: 1200 },
  { name: "合格商机", value: 700 },
  { name: "提交方案", value: 380 },
  { name: "成交订单", value: 160 },
];

function formatCurrency(n) {
  return n.toLocaleString("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 });
}

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState("全部地区");
  const [selectedSegment, setSelectedSegment] = useState("全部分层");
  const [activeRep, setActiveRep] = useState(null);

  let filteredReps = repPerf;
  if (selectedRegion !== "全部地区") {
    filteredReps = filteredReps.filter(r => r.region === selectedRegion);
  }
  if (selectedSegment !== "全部分层") {
    filteredReps = filteredReps.filter(r => r.segment === selectedSegment);
  }

  const activeRepData = repPerf.find(r => r.name === activeRep);

  return (
    <div className="p-6 text-white bg-neutral-950 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">销售与营收指挥中心</h1>

      {/* 地区对比图 */}
      <div className="bg-neutral-900 p-4 rounded mb-6">
        <h2 className="mb-2 font-semibold">分地区对比图（点击柱状图可筛选）</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionHeatmap} onClick={(state)=>{
            if(state && state.activeLabel){
              setSelectedRegion(state.activeLabel);
            }
          }}>
            <XAxis dataKey="region" stroke="#a3a3a3" />
            <YAxis stroke="#a3a3a3" tickFormatter={(v)=>"￥"+(v/10000).toFixed(0)+"万"} />
            <Tooltip formatter={(v)=>formatCurrency(v)} contentStyle={{ background: "#0a0a0a", border: "1px solid #262626" }} />
            <Bar dataKey="value" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 总体商机漏斗 */}
      <div className="bg-neutral-900 p-4 rounded mb-6">
        <h2 className="mb-2 font-semibold">总体商机管道漏斗</h2>
        <ResponsiveContainer width="100%" height={300}>
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={funnelData} isAnimationActive>
              <LabelList position="right" fill="#fff" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      {/* 筛选条件 */}
      <div className="flex items-center gap-3 mb-3">
        <button onClick={()=>{setSelectedRegion("全部地区"); setSelectedSegment("全部分层"); setActiveRep(null);}} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded">
          清空筛选
        </button>
        <div className="text-sm text-neutral-300">当前筛选条件：<span className="font-semibold text-white">{selectedRegion}</span> / <span className="font-semibold text-white">{selectedSegment}</span></div>
      </div>

      <div className="flex gap-3 mb-3">
        <select value={selectedRegion} onChange={(e)=>setSelectedRegion(e.target.value)} className="p-2 bg-neutral-900 border border-neutral-700">
          <option value="全部地区">全部地区</option>
          {Array.from(new Set(repPerf.map(r=>r.region))).map(reg => (
            <option key={reg} value={reg}>{reg}</option>
          ))}
        </select>

        <select value={selectedSegment} onChange={(e)=>setSelectedSegment(e.target.value)} className="p-2 bg-neutral-900 border border-neutral-700">
          <option value="全部分层">全部分层</option>
          {Array.from(new Set(repPerf.map(r=>r.segment))).map(seg => (
            <option key={seg} value={seg}>{seg}</option>
          ))}
        </select>
      </div>

      {/* 销售人员排行榜 */}
      <div className="bg-neutral-900 p-4 rounded mb-6">
        <h2 className="mb-2 font-semibold">销售人员排行榜（点击查看个人主页）</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-neutral-800">
              <th>销售人员</th>
              <th>地区</th>
              <th>客户分层</th>
              <th>销售额</th>
              <th>达成率</th>
            </tr>
          </thead>
          <tbody>
            {filteredReps.map(r => (
              <tr key={r.name} className="border-b border-neutral-900 hover:bg-neutral-800/40 cursor-pointer" onClick={()=>setActiveRep(r.name)}>
                <td>{r.name}</td>
                <td>{r.region}</td>
                <td>{r.segment}</td>
                <td>{formatCurrency(r.revenue)}</td>
                <td>{Math.round(r.attainment*100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 销售人员主页 */}
      {activeRep && (
        <div className="bg-neutral-900 p-4 rounded">
          <h2 className="mb-4 font-semibold">{activeRep} 的个人主页</h2>

          {/* KPI 卡片 */}
          {activeRepData && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-neutral-800 p-3 rounded">
                <div className="text-neutral-400 text-sm">季度目标完成度</div>
                <div className="text-xl font-semibold">{Math.round(activeRepData.attainment*100)}%</div>
              </div>
              <div className="bg-neutral-800 p-3 rounded">
                <div className="text-neutral-400 text-sm">客户数</div>
                <div className="text-xl font-semibold">{activeRepData.customers}</div>
              </div>
              <div className="bg-neutral-800 p-3 rounded">
                <div className="text-neutral-400 text-sm">新签合同数</div>
                <div className="text-xl font-semibold">{activeRepData.newContracts}</div>
              </div>
              <div className="bg-neutral-800 p-3 rounded">
                <div className="text-neutral-400 text-sm">客户满意度</div>
                <div className="text-xl font-semibold">{activeRepData.satisfaction}%</div>
              </div>
            </div>
          )}

          {/* 销售趋势 */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">销售趋势</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={repDetails[activeRep]?.trend || []}>
                <XAxis dataKey="month" stroke="#a3a3a3" />
                <YAxis stroke="#a3a3a3" tickFormatter={(v)=>"￥"+(v/1000).toFixed(0)+"k"} />
                <Tooltip formatter={(v)=>formatCurrency(v)} contentStyle={{ background: "#0a0a0a", border: "1px solid #262626" }} />
                <Line type="monotone" dataKey="value" stroke="#60a5fa" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 商机管道 */}
          {activeRepData && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">商机管道</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={[{name: "开放商机", value: activeRepData.pipeline.open}, {name: "已成交", value: activeRepData.pipeline.closed}]} dataKey="value" outerRadius={80} label>
                    {COLORS.map((c,i)=>(<Cell key={i} fill={c}/>))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* 活动 */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">近期活动</h3>
            <ul className="list-disc ml-6 text-sm space-y-1">
              {repDetails[activeRep]?.activities?.map((a,i)=>(<li key={i}>{a}</li>)) || <li>暂无数据</li>}
            </ul>
          </div>

          {/* 合同 */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">合同列表</h3>
            <ul className="list-disc ml-6 text-sm space-y-1">
              {repDetails[activeRep]?.contracts?.map((c,i)=>(<li key={i}>{c}</li>)) || <li>暂无合同</li>}
            </ul>
          </div>

          {/* 客户分布 */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">主要客户</h3>
            <ul className="list-disc ml-6 text-sm space-y-1">
              {repDetails[activeRep]?.accounts?.map((acc,i)=>(<li key={i}>{acc}</li>)) || <li>暂无客户</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
