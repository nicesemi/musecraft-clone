import { NextResponse } from "next/server";

const opportunities = [
  { id: 1, artifactName: "三彩马", artifactId: 1, score: 9.2, signals: ["马文化热点", "家装市场蓝海"], category: "家居装饰摆件", targetAudience: "文博爱好者", scenario: "书房/客厅", channel: "电商+线下", priceRange: "¥298-898", culturalTranslation: "盛唐气象", differentiation: "高端文化摆件", culturalValue: "丝路文化IP", status: "ready" },
  { id: 2, artifactName: "唐三彩骆驼载乐俑", artifactId: 2, score: 8.9, signals: ["唐三彩IP", "桌面收纳趋势"], category: "桌面收纳系列", targetAudience: "国风家居消费者", scenario: "办公桌/书房", channel: "电商", priceRange: "¥128-398", culturalTranslation: "丝路音乐", differentiation: "实用+文化", culturalValue: "丝路文化交流", status: "ready" },
  { id: 3, artifactName: "剔红栀子花纹圆盘", artifactId: 3, score: 8.5, signals: ["非遗技艺", "香氛市场增长"], category: "高端香氛礼盒", targetAudience: "高端礼赠", scenario: "送礼/自用", channel: "电商+精品店", priceRange: "¥398-998", culturalTranslation: "明代雕漆美学", differentiation: "非遗工艺+现代香氛", culturalValue: "张成造剔红工艺", status: "ready" },
  { id: 4, artifactName: "各种釉彩大瓶", artifactId: 7, score: 7.8, signals: ["跨界联名", "咖啡文化"], category: "创意咖啡杯", targetAudience: "年轻客群", scenario: "日常使用", channel: "电商", priceRange: "¥68-168", culturalTranslation: "瓷母之美", differentiation: "趣味文化周边", culturalValue: "乾隆瓷母", status: "ready" },
  { id: 5, artifactName: "白玉衔谷穗芦雁", artifactId: 8, score: 8.3, signals: ["故宫文创", "配饰市场"], category: "东方胸针系列", targetAudience: "文创爱好者", scenario: "日常佩戴", channel: "电商+故宫文创店", priceRange: "¥198-598", culturalTranslation: "五谷丰登", differentiation: "精致东方美学", culturalValue: "吉祥祈福文化", status: "ready" },
  { id: 6, artifactName: "绿色缎绣桂花玉兔金皮球花纹八月花神衣", artifactId: 4, score: 8.1, signals: ["节庆限定", "刺绣工艺"], category: "丝巾系列", targetAudience: "亲子家庭", scenario: "节日送礼", channel: "电商", priceRange: "¥128-328", culturalTranslation: "清代刺绣美学", differentiation: "节庆限定款", culturalValue: "中秋文化", status: "ready" },
  { id: 7, artifactName: "清乾隆青花缠枝莲纹瓶", artifactId: 5, score: 8.4, signals: ["青花瓷IP", "茶文化"], category: "茶具套装", targetAudience: "文博爱好者", scenario: "茶室/客厅", channel: "电商+线下", priceRange: "¥298-698", culturalTranslation: "青花美学", differentiation: "实用茶具+青花纹样", culturalValue: "乾隆官窑青花", status: "ready" },
  { id: 8, artifactName: "清乾隆掐丝珐琅手炉", artifactId: 6, score: 7.6, signals: ["珐琅工艺", "文具市场"], category: "钢笔礼盒", targetAudience: "高端礼赠", scenario: "商务送礼", channel: "电商+精品店", priceRange: "¥498-1298", culturalTranslation: "宫廷工艺", differentiation: "珐琅文具高端线", culturalValue: "掐丝珐琅非遗", status: "ready" },
  { id: 9, artifactName: "三彩马", artifactId: 1, score: 8.7, signals: ["马文化热点", "书房经济"], category: "书房摆件", targetAudience: "文博爱好者", scenario: "书房陈列", channel: "电商", priceRange: "¥198-498", culturalTranslation: "盛唐气象", differentiation: "书房文化场景", culturalValue: "丝路文化IP", status: "ready" },
  { id: 10, artifactName: "唐三彩骆驼载乐俑", artifactId: 2, score: 8.0, signals: ["丝路文化", "文具套装"], category: "文具套装", targetAudience: "年轻客群", scenario: "办公学习", channel: "电商", priceRange: "¥68-198", culturalTranslation: "丝路主题", differentiation: "丝路办公美学", culturalValue: "丝路文化交流", status: "ready" },
  { id: 11, artifactName: "剔红栀子花纹圆盘", artifactId: 3, score: 7.9, signals: ["非遗技艺", "手账文化"], category: "手账礼盒", targetAudience: "文创爱好者", scenario: "日常记录", channel: "电商", priceRange: "¥128-298", culturalTranslation: "雕漆纹样", differentiation: "非遗+手账", culturalValue: "张成造剔红", status: "ready" },
  { id: 12, artifactName: "清乾隆青花缠枝莲纹瓶", artifactId: 5, score: 7.2, signals: ["青花瓷IP", "餐具趋势"], category: "餐具套装", targetAudience: "亲子家庭", scenario: "日常用餐", channel: "电商", priceRange: "¥198-498", culturalTranslation: "青花美学日常化", differentiation: "青花餐具", culturalValue: "乾隆官窑青花", status: "ready" },
];

export async function GET() {
  return NextResponse.json(opportunities);
}
