import type { Artifact, MarketSignal, Opportunity, Proposal, DashboardData, TrendItem, ExpertStatus } from "@/types";

export const artifacts: Artifact[] = [
  { id: 1, name: "三彩马", dynasty: "唐", description: "唐代三彩釉陶马，造型雄健，釉色绚丽，体现了盛唐气象。", imageUrl: "/artifacts/sancaima.jpg", createdAt: "2026-01-15" },
  { id: 2, name: "唐三彩骆驼载乐俑", dynasty: "唐", description: "骆驼背上载有乐舞俑，展现丝绸之路文化交流盛况。", imageUrl: "/artifacts/luotuo.jpg", createdAt: "2026-01-16" },
  { id: 3, name: "剔红栀子花纹圆盘", dynasty: "明", description: "张成造剔红精品，栀子花纹饰精美繁复，雕工精湛。", imageUrl: "/artifacts/tihong.jpg", createdAt: "2026-02-01" },
  { id: 4, name: "绿色缎绣桂花玉兔金皮球花纹八月花神衣", dynasty: "清", description: "清代戏衣精品，绣工细腻，色彩典雅。", imageUrl: "/artifacts/huashenyi.jpg", createdAt: "2026-02-10" },
  { id: 5, name: "清乾隆青花缠枝莲纹瓶", dynasty: "清", description: "乾隆官窑青花瓷，缠枝莲纹繁而不乱，青花发色纯正。", imageUrl: "/artifacts/qinghua.jpg", createdAt: "2026-02-15" },
  { id: 6, name: "清乾隆掐丝珐琅手炉", dynasty: "清", description: "铜胎掐丝珐琅，纹饰华丽，工艺考究。", imageUrl: "/artifacts/shouolu.jpg", createdAt: "2026-03-01" },
  { id: 7, name: "各种釉彩大瓶", dynasty: "清", description: "乾隆时期瓷母，集多种釉彩工艺于一身，世所罕见。", imageUrl: "/artifacts/cimu.jpg", createdAt: "2026-03-05" },
  { id: 8, name: "白玉衔谷穗芦雁", dynasty: "清", description: "白玉圆雕芦雁衔穗，寓意五谷丰登，雕工灵动。", imageUrl: "/artifacts/baiyu.jpg", createdAt: "2026-03-10" },
];

export const marketSignals: MarketSignal[] = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  title: [
    "故宫文创年营收破15亿，博物馆IP商业化进入快车道",
    "国潮3.0：从符号消费到文化认同的深度转型",
    "2024年中国文创产业市场规模突破万亿",
    "Z世代成文创消费主力军，占比超60%",
    "\"马文化\"主题展引发观展热潮",
    "唐三彩数字藏品上线秒罄，传统文化IP价值凸显",
    "非遗技艺传承人数量持续下降，数字化保护迫在眉睫",
    "博物馆跨界联名成新趋势，故宫×泡泡玛特引爆市场",
  ][i % 8] + (i >= 8 ? `（续${Math.floor(i / 8) + 1}）` : ""),
  source: ["新华网", "百度", "搜狐", "51design", "中国网", "新京报", "工人网", "中新网", "温州博物馆"][i % 9],
  url: `https://example.com/signal/${i + 1}`,
  tags: [
    ["故宫文创", "市场趋势"],
    ["国潮", "消费洞察"],
    ["文创产业", "市场规模"],
    ["Z世代", "用户研究"],
    ["马文化", "文化热点"],
    ["唐三彩", "数字藏品"],
    ["非遗", "文化保护"],
    ["跨界联名", "商业模式"],
    ["故宫文创", "IP运营"],
    ["国潮", "设计趋势"],
    ["文创", "市场分析"],
    ["青花瓷", "文化IP"],
    ["吉祥祈福", "消费心理"],
    ["自定义需求", "用户调研"],
  ][i % 14],
  summary: `市场信号摘要：${["故宫文创产品持续热销，线上线下渠道全面开花", "国潮消费从浅层符号转向深度文化认同", "文创产业成为新经济增长点", "年轻消费者对传统文化产品接受度大幅提升"][i % 4]}`,
  createdAt: `2026-06-${String((i % 17) + 1).padStart(2, "0")}`,
}));

function makeSections(artifactName: string): Proposal["sections"] {
  return [
    { title: "核心机会摘要", content: `基于"${artifactName}"的文创开发机会评估。该藏品具有极高的文化辨识度和市场潜力，建议优先推进产品化落地。综合商业价值评分 8.7/10，用户接受度评分 8.5/10。`, subSections: [{ title: "量化研判", content: "商业价值 8.7/10 | 用户接受度 8.5/10" }] },
    { title: "馆藏与文化基因", content: `${artifactName}承载了深厚的中华文化基因。通过对文物色彩、纹饰、造型的系统分析，提取核心视觉元素和文化符号，为产品设计提供坚实的美学基础。`, subSections: [{ title: "色彩分析", content: "提取主色调、辅助色及色彩配比方案" }, { title: "文化故事", content: "梳理文物背后的历史故事与文化内涵" }] },
    { title: "市场洞察", content: "当前国潮文创市场持续升温，家居装饰品类年增长率达25%。竞品分析显示，高端文化摆件市场存在明显缺口。", subSections: [{ title: "竞品对位", content: "竞品A：侧重年轻化但文化深度不足\n竞品B：品质尚可但价格偏高\n竞品C：文化IP丰富但设计感欠缺" }] },
    { title: "产品概念", content: `以${artifactName}为灵感，打造兼具文化底蕴与现代审美的家居装饰系列。目标用户为25-45岁文博爱好者及国风家居消费者。`, subSections: [{ title: "目标用户画像", content: "文博爱好者（占比40%）、国风家居消费者（占比35%）、礼品采购者（占比25%）" }] },
    { title: "产品设计·四图", content: "主视觉：展示产品核心形态与色彩搭配\n细节工艺：突出材质质感与工艺细节\n包装开箱：呈现开箱体验与包装设计\n生活场景：展示产品在实际家居环境中的效果", subSections: [{ title: "SKU规划", content: "标准版、典藏版、礼盒套装三档配置" }] },
    { title: "视觉方向", content: "主色调采用宫廷朱红+鎏金配色，辅以青蓝点缀。字体选用兼具传统韵味与现代感的定制字体方案。", subSections: [{ title: "材质工艺", content: "陶瓷/铜质主体，局部鎏金/描金工艺" }] },
    { title: "定价与成本", content: "建议零售价：标准版 ¥298 / 典藏版 ¥598 / 礼盒套装 ¥898\n综合毛利率：62%\nBOM物料清单：主材 ¥45 / 工艺加工 ¥38 / 包装 ¥22 / 品控 ¥8 / 履约 ¥15", subSections: [{ title: "定价逻辑", content: "基于成本加成+竞品对标+品牌溢价的综合定价模型" }] },
    { title: "电商方案", content: "详情页以文化叙事为主线，突出文物故事与产品设计的关联。小红书种草侧重开箱体验与生活场景展示。短视频脚本45秒：前15秒文化溯源→中15秒产品展示→后15秒场景呈现。", subSections: [{ title: "小红书文案", content: "当千年文物走进你的书房 | 故宫同款美学，触手可及" }] },
    { title: "供应链", content: "物料选型：主体选用景德镇高白泥陶瓷，表面采用手工描金工艺。生产周期50天，含打样确认15天+量产25天+质检包装10天。", subSections: [{ title: "风险矩阵", content: "物料风险：低 | 质量风险：中 | 物流风险：低" }] },
    { title: "IP合规", content: "合规结论：基于故宫博物院开放资源进行二次创作，符合IP授权规范。需在包装上标注'故宫文化授权'标识。", subSections: [{ title: "授权来源", content: "故宫博物院开放资源库 + 自主设计创作" }] },
    { title: "执行计划", content: "D1-D7：设计定稿与打样确认\nD8-D20：模具开发与首批量产\nD21-D35：批量生产与质检\nD36-D45：渠道铺货与预热\nD46-D50：正式上架与营销推广", subSections: [{ title: "渠道计划", content: "线上：故宫天猫旗舰店、京东自营\n线下：故宫文创店、博物馆商店" }] },
  ];
}

const defaultExperts: ExpertStatus[] = [
  { name: "文化研究员", role: "culture", status: "standby" },
  { name: "市场分析师", role: "market", status: "standby" },
  { name: "用户研究员", role: "user", status: "standby" },
  { name: "视觉设计师", role: "design", status: "standby" },
  { name: "电商运营", role: "ecommerce", status: "standby" },
  { name: "财务分析师", role: "finance", status: "standby" },
  { name: "供应链专家", role: "supplychain", status: "standby" },
  { name: "IP合规官", role: "ip", status: "standby" },
];

export const proposals: Proposal[] = [
  { id: 47, title: "盛唐三彩马文化 × 家居装饰摆件", type: "system", status: "completed", coverImage: "/artifacts/sancaima.jpg", version: "v3.2", updatedAt: "2026-06-18", createdAt: "2026-06-10", sections: makeSections("三彩马"), experts: defaultExperts, score: 9.2 },
  { id: 48, title: "唐三彩骆驼载乐俑 × 桌面收纳系列", type: "system", status: "completed", coverImage: "/artifacts/luotuo.jpg", version: "v2.8", updatedAt: "2026-06-17", createdAt: "2026-06-09", sections: makeSections("唐三彩骆驼载乐俑"), experts: defaultExperts, score: 8.9 },
  { id: 49, title: "剔红栀子花纹 × 高端香氛礼盒", type: "system", status: "in_progress", coverImage: "/artifacts/tihong.jpg", version: "v1.5", updatedAt: "2026-06-18", createdAt: "2026-06-12", sections: makeSections("剔红栀子花纹圆盘"), experts: defaultExperts, score: 8.5 },
  { id: 50, title: "各种釉彩大瓶 × 创意咖啡杯", type: "custom", status: "draft", coverImage: "/artifacts/cimu.jpg", version: "v1.0", updatedAt: "2026-06-16", createdAt: "2026-06-15", sections: makeSections("各种釉彩大瓶"), experts: defaultExperts, score: 7.8 },
  { id: 51, title: "白玉衔谷穗芦雁 × 东方胸针系列", type: "system", status: "completed", coverImage: "/artifacts/baiyu.jpg", version: "v2.1", updatedAt: "2026-06-15", createdAt: "2026-06-08", sections: makeSections("白玉衔谷穗芦雁"), experts: defaultExperts, score: 8.3 },
  { id: 52, title: "端午节限定 · 龙舟文化潮玩盲盒", type: "custom", status: "in_progress", coverImage: "/artifacts/qinghua.jpg", version: "v1.2", updatedAt: "2026-06-14", createdAt: "2026-06-05", sections: makeSections("清乾隆青花缠枝莲纹瓶"), experts: defaultExperts, score: 7.5 },
  { id: 53, title: "父亲节文创 · 掐丝珐琅钢笔礼盒", type: "custom", status: "draft", coverImage: "/artifacts/shouolu.jpg", version: "v1.0", updatedAt: "2026-06-13", createdAt: "2026-06-13", sections: makeSections("清乾隆掐丝珐琅手炉"), experts: defaultExperts, score: 7.2 },
];

export const dashboardData: DashboardData = {
  top3: [proposals[0], proposals[1], proposals[3]],
  systemMetrics: { top3Count: 3, collaborating: 7, connected: 12, observing: 48 },
};

export const trendItems: TrendItem[] = [
  { id: 1, title: "三彩马 × 家居装饰", summary: "唐三彩经典IP，家装市场蓝海", score: 9.2, proposalId: 47 },
  { id: 2, title: "骆驼载乐俑 × 桌面收纳", summary: "丝路文化+实用功能", score: 8.9, proposalId: 48 },
  { id: 3, title: "三彩马 × 书房摆件", summary: "盛唐气象融入现代书房", score: 8.7, proposalId: 47 },
  { id: 4, title: "骆驼载乐俑 × 音箱设计", summary: "音乐文化与数码融合", score: 8.6, proposalId: 48 },
  { id: 5, title: "剔红栀子花 × 香氛", summary: "明代雕漆美学现代演绎", score: 8.5, proposalId: 49 },
  { id: 6, title: "花神衣 × 丝巾系列", summary: "清代刺绣工艺时尚转化", score: 8.3, proposalId: 0 },
  { id: 7, title: "青花缠枝莲 × 餐具套装", summary: "青花美学日常化", score: 8.2, proposalId: 0 },
  { id: 8, title: "骆驼载乐俑 × 文具套装", summary: "丝路主题办公美学", score: 8.0, proposalId: 48 },
  { id: 9, title: "掐丝珐琅 × 手账礼盒", summary: "宫廷工艺年轻化", score: 7.9, proposalId: 53 },
  { id: 10, title: "青花缠枝莲 × 茶具套装", summary: "青花美学茶文化", score: 7.8, proposalId: 0 },
];
