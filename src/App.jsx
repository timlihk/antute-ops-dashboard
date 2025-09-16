import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from "recharts";

// 模拟公司 KPI
const companyKPI = {
  revenue: 6800000,
  target: 8000000,
  attainment: 0.85,
  growth: 0.12,
  activeDeals: 45,
  closedDeals: 28
};

// 模拟区域数据
const regionHeatmap = [
  { region: "华北", value: 1200000, target: 1400000, growth: 0.08, teams: 3 },
  { region: "华东", value: 1500000, target: 1600000, growth: 0.12, teams: 4 },
  { region: "华南", value: 1000000, target: 1200000, growth: 0.15, teams: 2 },
  { region: "西部", value: 800000, target: 1000000, growth: 0.05, teams: 2 },
  { region: "中部", value: 950000, target: 1100000, growth: 0.10, teams: 2 },
];

// 模拟团队平均数据
const teamAverage = {
  revenue: 520000,
  attainment: 0.78,
  customers: 25,
  satisfaction: 76
};

const repPerf = [
  { name: "张伟", region: "华北", segment: "企业客户", revenue: 800000, attainment: 0.95, customers: 35, newContracts: 12, pipeline: { open: 10, closed: 5 }, satisfaction: 82, product: "硬件" },
  { name: "李敏", region: "华东", segment: "中端客户", revenue: 600000, attainment: 0.88, customers: 28, newContracts: 9, pipeline: { open: 8, closed: 3 }, satisfaction: 75, product: "软件" },
  { name: "王强", region: "华南", segment: "中小客户", revenue: 500000, attainment: 0.82, customers: 22, newContracts: 7, pipeline: { open: 6, closed: 4 }, satisfaction: 79, product: "服务" },
  { name: "刘芳", region: "西部", segment: "企业客户", revenue: 400000, attainment: 0.75, customers: 20, newContracts: 6, pipeline: { open: 5, closed: 2 }, satisfaction: 70, product: "硬件" },
  { name: "陈杰", region: "中部", segment: "中端客户", revenue: 450000, attainment: 0.8, customers: 24, newContracts: 8, pipeline: { open: 7, closed: 3 }, satisfaction: 77, product: "软件" },
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
  const [selectedProduct, setSelectedProduct] = useState("全部产品线");
  const [selectedPeriod, setSelectedPeriod] = useState("本季度");
  const [activeRep, setActiveRep] = useState(null);
  const [viewLevel, setViewLevel] = useState("company"); // company, region, team, individual

  let filteredReps = repPerf;
  if (selectedRegion !== "全部地区") {
    filteredReps = filteredReps.filter(r => r.region === selectedRegion);
  }
  if (selectedSegment !== "全部分层") {
    filteredReps = filteredReps.filter(r => r.segment === selectedSegment);
  }
  if (selectedProduct !== "全部产品线") {
    filteredReps = filteredReps.filter(r => r.product === selectedProduct);
  }

  const activeRepData = repPerf.find(r => r.name === activeRep);

  return (
    <div className="p-6 text-white bg-neutral-950 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">销售与营收指挥中心</h1>

      {/* 统一过滤器栏 */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <select value={selectedPeriod} onChange={(e)=>setSelectedPeriod(e.target.value)} className="p-2 bg-neutral-900 border border-neutral-700 rounded">
          <option value="本季度">本季度</option>
          <option value="本月">本月</option>
          <option value="本周">本周</option>
          <option value="本年度">本年度</option>
        </select>
        <select value={selectedRegion} onChange={(e)=>setSelectedRegion(e.target.value)} className="p-2 bg-neutral-900 border border-neutral-700 rounded">
          <option value="全部地区">全部地区</option>
          {Array.from(new Set(repPerf.map(r=>r.region))).map(reg => (
            <option key={reg} value={reg}>{reg}</option>
          ))}
        </select>
        <select value={selectedProduct} onChange={(e)=>setSelectedProduct(e.target.value)} className="p-2 bg-neutral-900 border border-neutral-700 rounded">
          <option value="全部产品线">全部产品线</option>
          <option value="硬件">硬件</option>
          <option value="软件">软件</option>
          <option value="服务">服务</option>
        </select>
        <select value={selectedSegment} onChange={(e)=>setSelectedSegment(e.target.value)} className="p-2 bg-neutral-900 border border-neutral-700 rounded">
          <option value="全部分层">全部分层</option>
          {Array.from(new Set(repPerf.map(r=>r.segment))).map(seg => (
            <option key={seg} value={seg}>{seg}</option>
          ))}
        </select>
        <button onClick={()=>{setSelectedRegion("全部地区"); setSelectedSegment("全部分层"); setSelectedProduct("全部产品线"); setActiveRep(null);}}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
          清空筛选
        </button>
      </div>

      {/* 公司 KPI 卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-neutral-800 p-4 rounded">
          <div className="text-neutral-400 text-sm">公司总营收</div>
          <div className="text-xl font-semibold">{formatCurrency(companyKPI.revenue)}</div>
          <div className="text-green-400 text-xs">+{Math.round(companyKPI.growth*100)}%</div>
        </div>
        <div className="bg-neutral-800 p-4 rounded">
          <div className="text-neutral-400 text-sm">目标营收</div>
          <div className="text-xl font-semibold">{formatCurrency(companyKPI.target)}</div>
        </div>
        <div className="bg-neutral-800 p-4 rounded">
          <div className="text-neutral-400 text-sm">完成度</div>
          <div className="text-xl font-semibold">{Math.round(companyKPI.attainment*100)}%</div>
          <div className="w-full bg-neutral-700 rounded-full h-2 mt-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: `${companyKPI.attainment*100}%`}}></div>
          </div>
        </div>
        <div className="bg-neutral-800 p-4 rounded">
          <div className="text-neutral-400 text-sm">活跃商机</div>
          <div className="text-xl font-semibold">{companyKPI.activeDeals}</div>
        </div>
        <div className="bg-neutral-800 p-4 rounded">
          <div className="text-neutral-400 text-sm">已成交</div>
          <div className="text-xl font-semibold">{companyKPI.closedDeals}</div>
        </div>
        <div className="bg-neutral-800 p-4 rounded">
          <div className="text-neutral-400 text-sm">转化率</div>
          <div className="text-xl font-semibold">{Math.round((companyKPI.closedDeals/(companyKPI.activeDeals+companyKPI.closedDeals))*100)}%</div>
        </div>
      </div>

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

      {/* 个人 vs 团队平均对比分析 */}
      <div className="bg-neutral-900 p-4 rounded mb-6">
        <h2 className="mb-4 font-semibold">个人 vs 团队平均对比分析</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-neutral-800">
                <th className="pb-2">销售人员</th>
                <th className="pb-2">个人营收</th>
                <th className="pb-2">团队平均</th>
                <th className="pb-2">差异</th>
                <th className="pb-2">个人完成度</th>
                <th className="pb-2">团队平均</th>
                <th className="pb-2">客户满意度</th>
                <th className="pb-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredReps.map(r => {
                const revenueDiff = r.revenue - teamAverage.revenue;
                const attainmentDiff = r.attainment - teamAverage.attainment;
                const satisfactionDiff = r.satisfaction - teamAverage.satisfaction;

                return (
                  <tr key={r.name} className="border-b border-neutral-900 hover:bg-neutral-800/40">
                    <td className="py-2">{r.name}</td>
                    <td className="py-2">{formatCurrency(r.revenue)}</td>
                    <td className="py-2 text-neutral-400">{formatCurrency(teamAverage.revenue)}</td>
                    <td className={`py-2 ${revenueDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {revenueDiff >= 0 ? '+' : ''}{formatCurrency(revenueDiff)}
                    </td>
                    <td className="py-2">{Math.round(r.attainment*100)}%</td>
                    <td className="py-2 text-neutral-400">{Math.round(teamAverage.attainment*100)}%</td>
                    <td className={`py-2 ${satisfactionDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {r.satisfaction}% ({satisfactionDiff >= 0 ? '+' : ''}{satisfactionDiff})
                    </td>
                    <td className="py-2">
                      <button
                        onClick={()=>setActiveRep(r.name)}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs">
                        详情
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI 洞察区块 */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-4 rounded mb-6 border border-purple-500/20">
        <h2 className="mb-3 font-semibold flex items-center">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">🤖 AI 洞察</span>
          <span className="ml-2 text-xs bg-purple-600 px-2 py-1 rounded">智能分析</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2 text-purple-300">业绩趋势</h3>
            <ul className="list-disc ml-4 text-sm space-y-1 text-neutral-300">
              <li>华东区营收环比增长 <span className="text-green-400 font-semibold">12%</span>，主要来自软件产品线推动</li>
              <li>张伟的季度完成度比团队平均高出 <span className="text-blue-400 font-semibold">17%</span>，表现优异</li>
              <li>硬件产品线本月签约率提升 <span className="text-green-400 font-semibold">23%</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 text-blue-300">行动建议</h3>
            <ul className="list-disc ml-4 text-sm space-y-1 text-neutral-300">
              <li>建议将张伟的成功经验在华北区团队内推广</li>
              <li>西部区需要额外支持，建议加强客户关系管理培训</li>
              <li>本周有 <span className="text-yellow-400 font-semibold">3 个</span> 关键合同进入最终谈判阶段，需重点跟进</li>
            </ul>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-purple-500/20">
          <p className="text-xs text-neutral-400">
            💡 基于历史数据和当前趋势的智能分析，更新于 {selectedPeriod} • 置信度: 85%
          </p>
        </div>
      </div>

      {/* 传统销售人员排行榜 */}
      <div className="bg-neutral-900 p-4 rounded mb-6">
        <h2 className="mb-2 font-semibold">销售人员排行榜（点击查看个人主页）</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-neutral-800">
              <th>销售人员</th>
              <th>地区</th>
              <th>产品线</th>
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
                <td>{r.product}</td>
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
