# AURA 展示引流站

一个面向海外市场的极简产品展示站。阶段一用途：展示商品，把客户引导到第三方平台（抖音、coupon 等）成交。本站不收款、不处理订单。

## 本地预览

直接双击 `index.html` 即可查看。若用本地服务器（推荐）：

```bash
cd store
python -m http.server 8000
```

然后打开 `http://localhost:8000`。

## 部署到 Cloudflare（免费）

1. 把 `store` 目录上传到 GitHub 仓库。
2. 登录 Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git。
3. 选择仓库，构建设置：
   - Build command: 留空
   - Build output directory: `store`
4. 部署完成后获得 `*.pages.dev` 地址，可在 Cloudflare 绑定自定义域名（自动 HTTPS）。
5. 在 Cloudflare 该站点开启 WAF 规则与速率限制（免费档已包含基础规则）。

## 你平时需要改什么

**只改 `assets/js/data.js` 这一个文件。**

- `SITE` 对象：品牌名、标语、联系邮箱、公司名 —— 改成你的真实信息。
- `products` 数组：每个商品一块，复制粘贴即可新增。
  - `image`: 填 `assets/images/xxx.jpg`（把图片放进 `assets/images/` 目录），或填完整网址。留空显示占位图。
  - `buyUrl`: 填抖音、coupon 等平台的商品链接。
  - `featured: true` 的商品会出现在首页"精选系列"。
- `id` 必须唯一，只用英文、数字、横线。

## 上线前必做的三件事

1. 把 `data.js` 里的 `hello@example.com`、公司名、地址换成真实信息（Stripe 审核时要求与营业执照一致，阶段二会用到）。
2. 把 `robots.txt` 和 `sitemap.xml` 里的 `https://example.com` 换成你的真实域名。
3. 每个商品的 `buyUrl` 换成真实平台链接。没配好的商品按钮会显示"购买链接待配置"。

## 关于安全

- 纯静态站点，无后端、无数据库、无用户输入接口，攻击面很小。
- 所有外链带 `rel="noopener noreferrer nofollow"`。
- 无追踪 Cookie，无第三方脚本。
- HTTPS 由 Cloudflare 自动提供。

## 阶段二再做

购物车、站内支付、订单系统、库存、物流、税务。等这站跑通、有真实成交后再加。
