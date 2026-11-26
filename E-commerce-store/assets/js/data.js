/* ============================================================
   商品数据 —— 你只需要改这个文件
   ============================================================

   怎么加商品：
   1. 复制下面 {...} 一整块，粘贴到 products 数组里
   2. 改掉 id / name / price / category / image / buyUrl 等字段
   3. id 必须唯一，且只能用英文、数字、横线（例如 "aura-lamp-01"）

   字段说明：
   - id        商品唯一编号，也是详情页网址的参数
   - name      商品名称
   - price     显示价格，纯文本，例如 "$49" 或 "¥299"
   - category  分类名，用来生成筛选按钮
   - image     图片路径。把图片放到 assets/images/ 目录，这里写 "assets/images/xxx.jpg"
               也可以直接填完整网址 https://...
               留空字符串 "" 则显示占位图
   - summary   一句话简介（列表页用）
   - description  详细描述（详情页用，支持普通文字）
   - features  卖点数组，每条一行
   - buyUrl    点击"去平台购买"跳转的链接（抖音、coupon 等）
   - featured  true 表示在首页"精选"区展示

   注意：本站只做展示引流，不收款。所有成交都在 buyUrl 指向的平台完成。
   ============================================================ */

const SITE = {
  brand: "AURA",
  tagline: "为日常而生的精选好物",
  subtitle: "少一点选择，多一点值得",
  description: "AURA 精选生活好物，设计与品质并重。探索我们的产品系列。",
  contactEmail: "hello@example.com",
  companyName: "AURA",
  companyAddress: "Hangzhou, China",
  currency: "USD"
};

const products = [
  {
    id: "aura-lamp-01",
    name: "Arc Table Lamp",
    price: "$89",
    category: "Home",
    image: "",
    summary: "一盏安静的灯，刚好照亮你需要的地方。",
    description:
      "Arc 台灯以极简线条融入日常空间。柔和的漫射光适合阅读与放松，触控调光让亮度随手变化。无论是书桌、床头还是客厅角落，它都能自然融入。",
    features: [
      "三档触控调光，暖白光 2700K–4000K",
      "铝合金灯体，哑光表面处理",
      "USB-C 供电，兼容常见充电器",
      "光线柔和，无频闪"
    ],
    buyUrl: "https://www.douyin.com/",
    featured: true
  },
  {
    id: "aura-bottle-02",
    name: "Everyday Bottle",
    price: "$39",
    category: "Travel",
    image: "",
    summary: "轻量随行，温度刚好。",
    description:
      " Everyday Bottle 采用双层真空不锈钢，长时间保持饮品温度。简洁的瓶身设计适合通勤、旅行与户外，单手开合更方便。",
    features: [
      "双层真空，保温 12 小时 / 保冷 24 小时",
      "500ml 容量，轻量便携",
      "食品级 304 不锈钢",
      "防漏杯盖"
    ],
    buyUrl: "https://www.douyin.com/",
    featured: true
  },
  {
    id: "aura-bag-03",
    name: "Weekender Tote",
    price: "$129",
    category: "Travel",
    image: "",
    summary: "装下周末，也装下日常。",
    description:
      "一只兼顾容量与质感的手提袋。耐用的织物与利落的剪裁，让它既能陪你短途出行，也能装下每天必备的东西。",
    features: [
      "加厚帆布，耐磨耐用",
      "内置拉链口袋",
      "可机洗",
      "容量 20L"
    ],
    buyUrl: "https://www.douyin.com/",
    featured: true
  },
  {
    id: "aura-speaker-04",
    name: "Pocket Speaker",
    price: "$69",
    category: "Audio",
    image: "",
    summary: "小小一只，声音很足。",
    description:
      "Pocket Speaker 把清晰的音质装进口袋。无论是家里、户外还是旅途中，都能提供均衡的声音表现。",
    features: [
      "360° 环绕音效",
      "IPX5 防水",
      "蓝牙 5.3，连接稳定",
      "续航约 10 小时"
    ],
    buyUrl: "https://www.douyin.com/",
    featured: false
  },
  {
    id: "aura-notebook-05",
    name: "Field Notebook",
    price: "$19",
    category: "Stationery",
    image: "",
    summary: "把想法留下来。",
    description:
      "一本顺手的手账。纸张适中，钢笔书写不透墨，平摊设计让记录更自在。",
    features: [
      "A5 尺寸，96 页",
      "100gsm 米白纸张",
      "可完全平摊",
      "布面精装"
    ],
    buyUrl: "https://www.douyin.com/",
    featured: false
  },
  {
    id: "aura-mug-06",
    name: "Morning Mug",
    price: "$29",
    category: "Home",
    image: "",
    summary: "一天从一杯好咖啡开始。",
    description:
      "简洁的陶瓷马克杯，握感舒适，釉面温润。适合每天的咖啡或茶。",
    features: [
      "350ml 容量",
      "高温陶瓷，可微波",
      "哑光釉面",
      " dishwasher safe"
    ],
    buyUrl: "https://www.douyin.com/",
    featured: false
  }
];
