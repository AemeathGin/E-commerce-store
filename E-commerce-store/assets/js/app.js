/* 展示站共用逻辑：导航、商品渲染、详情页、筛选 */

(function () {
  "use strict";

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeExternalUrl(url) {
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.href;
      }
    } catch (e) {
      /* 无效链接返回空 */
    }
    return "";
  }

  function applySiteInfo() {
    $$("[data-brand]").forEach((el) => {
      el.textContent = SITE.brand;
    });
    $$("[data-tagline]").forEach((el) => {
      el.textContent = SITE.tagline;
    });
    $$("[data-subtitle]").forEach((el) => {
      el.textContent = SITE.subtitle;
    });
    $$("[data-email]").forEach((el) => {
      el.textContent = SITE.contactEmail;
      el.setAttribute("href", "mailto:" + SITE.contactEmail);
    });
    $$("[data-company]").forEach((el) => {
      el.textContent = SITE.companyName;
    });
  }

  function initNav() {
    const toggle = $(".nav-toggle");
    const links = $(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
      });
      links.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
          links.classList.remove("open");
        }
      });
    }
    const page = document.body.getAttribute("data-page") || "";
    const link = $('.nav-links a[href="' + page + '"]');
    if (link) {
      link.classList.add("active");
    }
  }

  function productCard(product) {
    const image = product.image
      ? '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" loading="lazy">'
      : '<span class="thumb-placeholder">图片待补充</span>';

    return (
      '<a class="product-card" href="product.html?id=' + encodeURIComponent(product.id) + '">' +
      '<div class="thumb">' + image + "</div>" +
      '<div class="meta">' +
      '<div class="name">' + escapeHtml(product.name) + "</div>" +
      '<div class="price">' + escapeHtml(product.price) + "</div>" +
      '<span class="tag">' + escapeHtml(product.category) + "</span>" +
      "</div></a>"
    );
  }

  function renderFeatured() {
    const container = $("#featured-products");
    if (!container) return;
    const featured = products.filter(function (p) {
      return p.featured;
    });
    container.innerHTML = featured.length
      ? featured.map(productCard).join("")
      : '<p class="empty-state">暂无商品，请在 data.js 中添加。</p>';
  }

  function renderAll() {
    const grid = $("#all-products");
    const filters = $("#filters");
    if (!grid) return;

    const categories = ["All"];
    products.forEach(function (p) {
      if (p.category && categories.indexOf(p.category) === -1) {
        categories.push(p.category);
      }
    });

    function draw(category) {
      const list =
        category === "All"
          ? products
          : products.filter(function (p) {
              return p.category === category;
            });
      grid.innerHTML = list.length
        ? list.map(productCard).join("")
        : '<p class="empty-state">该分类暂无商品。</p>';
    }

    if (filters) {
      filters.innerHTML = categories
        .map(function (cat, index) {
          return (
            '<button class="filter-btn' +
            (index === 0 ? " active" : "") +
            '" data-category="' +
            escapeHtml(cat) +
            '">' +
            escapeHtml(cat) +
            "</button>"
          );
        })
        .join("");

      filters.addEventListener("click", function (event) {
        const btn = event.target.closest(".filter-btn");
        if (!btn) return;
        $$(".filter-btn", filters).forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        draw(btn.getAttribute("data-category"));
      });
    }

    draw("All");
  }

  function renderDetail() {
    const root = $("#detail-root");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = products.find(function (p) {
      return p.id === id;
    });

    if (!product) {
      root.innerHTML =
        '<div class="empty-state"><h1>商品不存在</h1><p>返回 <a href="products.html" style="color:var(--accent)">商品列表</a> 看看其他商品。</p></div>';
      document.title = "商品不存在 — " + SITE.brand;
      return;
    }

    document.title = product.name + " — " + SITE.brand;
    const descriptionMeta = $('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", product.summary || SITE.description);
    }

    const image = product.image
      ? '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '">'
      : '<span class="thumb-placeholder">图片待补充</span>';

    const features = (product.features || [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");

    const buyUrl = safeExternalUrl(product.buyUrl);
    const buyButton = buyUrl
      ? '<a class="btn btn-primary btn-lg" href="' +
        escapeHtml(buyUrl) +
        '" target="_blank" rel="noopener noreferrer nofollow">去平台购买</a>'
      : '<button class="btn btn-lg" disabled>购买链接待配置</button>';

    root.innerHTML =
      '<div class="container">' +
      '<div class="detail-wrap">' +
      '<div class="detail-gallery"><div class="main-image">' + image + "</div></div>" +
      '<div class="detail-info">' +
      '<p class="eyebrow">' + escapeHtml(product.category) + "</p>" +
      "<h1>" + escapeHtml(product.name) + "</h1>" +
      '<p class="price">' + escapeHtml(product.price) + "</p>" +
      '<p class="desc">' + escapeHtml(product.description) + "</p>" +
      '<ul class="features">' + features + "</ul>" +
      '<div class="buy-box">' +
      '<p class="note">本站为展示站点，交易与发货由合作平台完成。点击按钮前往平台购买。</p>' +
      buyButton +
      '<a class="btn" href="mailto:' +
      escapeHtml(SITE.contactEmail) +
      '?subject=' +
      encodeURIComponent("咨询：" + product.name) +
      '">咨询该商品</a>' +
      "</div>" +
      "</div></div></div>";

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.summary,
      image: product.image || undefined,
      brand: { "@type": "Brand", name: SITE.brand },
      offers: {
        "@type": "Offer",
        priceCurrency: SITE.currency,
        price: String(product.price).replace(/[^0-9.]/g, "")
      }
    });
    document.head.appendChild(script);
  }

  function initYear() {
    $$("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applySiteInfo();
    initNav();
    initYear();
    renderFeatured();
    renderAll();
    renderDetail();
  });
})();
