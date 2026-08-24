/* ============================================================
   UI.JS — tudo que toca no DOM: render do catálogo, modal de
   produto, drawer do carrinho, filtros, carrossel, FAQ, galeria,
   tema claro/escuro, nav e botões flutuantes.
   ============================================================ */

/* ---------- 1. tema claro/escuro (persistido) ---------- */
const themeBtn = document.getElementById("themeToggle");
const root = document.documentElement;
function setTheme(t) {
  root.setAttribute("data-theme", t);
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  localStorage.setItem("brasa-theme", t);
}
setTheme(localStorage.getItem("brasa-theme") || "light");
themeBtn.addEventListener("click", () => setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

/* ---------- 2. nav sólida ao rolar + menu mobile ---------- */
const navEl = document.getElementById("nav");
window.addEventListener("scroll", () => navEl.classList.toggle("scrolled", window.scrollY > 40));
const mobileMenu = document.getElementById("mobileMenu");
document.getElementById("burgerBtn").addEventListener("click", () => mobileMenu.classList.add("open"));
document.getElementById("mobileClose").addEventListener("click", () => mobileMenu.classList.remove("open"));
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

/* ---------- 3. reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ---------- 4. render do catálogo (grid + filtros) ---------- */
const menuGrid = document.getElementById("menuGrid");
let activeCategory = "todos";

function renderCatalog() {
  const list = activeCategory === "todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  menuGrid.innerHTML = list.map(p => `
    <div class="product-card reveal in" data-id="${p.id}">
      <div class="product-photo" data-open="${p.id}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-body">
        <h3 data-open="${p.id}">${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-foot">
          <span class="product-price">${Cart.formatBRL(p.price)}</span>
          <button class="add-btn" data-quickadd="${p.id}">+ Adicionar</button>
        </div>
      </div>
    </div>
  `).join("");
}
renderCatalog();

document.getElementById("menuTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".menu-tab");
  if (!btn) return;
  document.querySelectorAll(".menu-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.cat;
  renderCatalog();
});

// clique no card: abrir modal ou adicionar direto
menuGrid.addEventListener("click", (e) => {
  const quick = e.target.closest("[data-quickadd]");
  if (quick) {
    const product = PRODUCTS.find(p => p.id === quick.dataset.quickadd);
    Cart.add(product, 1, []);
    quick.textContent = "Adicionado ✓";
    quick.classList.add("pop");
    setTimeout(() => { quick.textContent = "+ Adicionar"; quick.classList.remove("pop"); }, 900);
    return;
  }
  const open = e.target.closest("[data-open]");
  if (open) openProductModal(open.dataset.open);
});

/* ---------- 5. modal do produto ---------- */
const modalOverlay = document.getElementById("modalOverlay");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalIngredients = document.getElementById("modalIngredients");
const modalAddons = document.getElementById("modalAddons");
const modalQtyVal = document.getElementById("modalQtyVal");
const modalTotal = document.getElementById("modalTotal");
const modalAddBtn = document.getElementById("modalAddBtn");

let modalProduct = null;
let modalQty = 1;

function openProductModal(id) {
  modalProduct = PRODUCTS.find(p => p.id === id);
  modalQty = 1;
  modalImg.src = modalProduct.img;
  modalImg.alt = modalProduct.name;
  modalName.textContent = modalProduct.name;
  modalDesc.textContent = modalProduct.desc;
  modalIngredients.innerHTML = `<b>Ingredientes</b>${modalProduct.ingredients}`;

  if (CATEGORIES_WITH_ADDONS.includes(modalProduct.category)) {
    modalAddons.style.display = "block";
    modalAddons.innerHTML = "<b>Adicionais</b>" + ADDONS.map(a => `
      <div class="addon-row">
        <label><input type="checkbox" value="${a.id}" class="addon-check"> ${a.name}</label>
        <span class="addon-price">+ ${Cart.formatBRL(a.price)}</span>
      </div>
    `).join("");
  } else {
    modalAddons.style.display = "none";
    modalAddons.innerHTML = "";
  }

  updateModalTotal();
  modalOverlay.classList.add("open");
}

function updateModalTotal() {
  modalQtyVal.textContent = modalQty;
  const addonIds = [...modalAddons.querySelectorAll(".addon-check:checked")].map(c => c.value);
  const addonsTotal = ADDONS.filter(a => addonIds.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total = (modalProduct.price + addonsTotal) * modalQty;
  modalTotal.textContent = Cart.formatBRL(total);
}

document.getElementById("modalQtyMinus").addEventListener("click", () => { if (modalQty > 1) { modalQty--; updateModalTotal(); } });
document.getElementById("modalQtyPlus").addEventListener("click", () => { modalQty++; updateModalTotal(); });
modalAddons.addEventListener("change", updateModalTotal);

modalAddBtn.addEventListener("click", () => {
  const addonIds = [...modalAddons.querySelectorAll(".addon-check:checked")].map(c => c.value);
  Cart.add(modalProduct, modalQty, addonIds);
  modalOverlay.classList.remove("open");
  openCart();
});

document.getElementById("modalClose").addEventListener("click", () => modalOverlay.classList.remove("open"));
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove("open"); });

/* ---------- 6. promoções ---------- */
const promoGrid = document.getElementById("promoGrid");
promoGrid.innerHTML = PROMOTIONS.map(pr => `
  <div class="promo-card reveal in">
    <div class="promo-photo"><span class="promo-save">${pr.save}</span><img src="${pr.img}" alt="${pr.name}" loading="lazy"></div>
    <div class="promo-body">
      <h3>${pr.name}</h3>
      <p>${pr.desc}</p>
      <div class="promo-price-row">
        <span class="promo-old">${Cart.formatBRL(pr.oldPrice)}</span>
        <span class="promo-new">${Cart.formatBRL(pr.price)}</span>
      </div>
      <button class="promo-add" data-promo="${pr.id}">Adicionar promoção</button>
    </div>
  </div>
`).join("");
promoGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-promo]");
  if (!btn) return;
  const promo = PROMOTIONS.find(p => p.id === btn.dataset.promo);
  Cart.addPromotion(promo, 1);
  btn.textContent = "Adicionado ✓";
  setTimeout(() => btn.textContent = "Adicionar promoção", 900);
  openCart();
});

/* ---------- 7. galeria + lightbox ---------- */
const galleryGrid = document.getElementById("galleryGrid");
galleryGrid.innerHTML = GALLERY.map(g => `
  <div class="gallery-item" data-full="${g.img}"><img src="${g.img}" alt="${g.alt}" loading="lazy"></div>
`).join("");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
galleryGrid.addEventListener("click", (e) => {
  const item = e.target.closest(".gallery-item");
  if (!item) return;
  lightboxImg.src = item.dataset.full;
  lightbox.classList.add("open");
});
document.getElementById("lightboxClose").addEventListener("click", () => lightbox.classList.remove("open"));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("open"); });
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  lightbox.classList.remove("open");
  modalOverlay.classList.remove("open");
  closeCart();
});

/* ---------- 8. instagram ---------- */
document.getElementById("instaGrid").innerHTML = INSTAGRAM.map(src => `
  <div class="insta-item"><img src="${src}" alt="Post Instagram" loading="lazy"></div>
`).join("");

/* ---------- 9. contadores animados ---------- */
const counters = document.querySelectorAll(".counter b");
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const isDecimal = el.dataset.decimal, isPlain = el.dataset.plain;
    let start = null;
    const duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const val = target * progress;
      el.textContent = isPlain ? Math.floor(val) : isDecimal ? (val / 10).toFixed(1) : Math.floor(val).toLocaleString("pt-BR") + "+";
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isPlain ? target : isDecimal ? (target / 10).toFixed(1) : target.toLocaleString("pt-BR") + "+";
    }
    requestAnimationFrame(step);
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => counterIO.observe(c));

/* ---------- 10. carrossel de avaliações ---------- */
const slidesWrap = document.getElementById("reviewSlides");
const slides = slidesWrap.children;
const dotsWrap = document.getElementById("reviewDots");
let current = 0;
for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("button");
  dot.className = "review-dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
}
function goTo(i) {
  current = i;
  slidesWrap.style.transform = `translateX(-${i * 100}%)`;
  [...dotsWrap.children].forEach((d, idx) => d.classList.toggle("active", idx === i));
}
let autoplay = setInterval(() => goTo((current + 1) % slides.length), 5000);
const carouselEl = document.querySelector(".review-carousel");
carouselEl.addEventListener("mouseenter", () => clearInterval(autoplay));
carouselEl.addEventListener("mouseleave", () => autoplay = setInterval(() => goTo((current + 1) % slides.length), 5000));

/* ---------- 11. FAQ accordion ---------- */
document.querySelectorAll(".faq-item").forEach(item => {
  const q = item.querySelector(".faq-q"), a = item.querySelector(".faq-a");
  q.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-a").style.maxHeight = null; });
    if (!isOpen) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
  });
});

/* ============================================================
   12. CARRINHO — drawer, botões flutuantes, barra mobile
   ============================================================ */
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsEl = document.getElementById("cartItems");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartTotalEl = document.getElementById("cartTotal");
const sendWhatsAppBtn = document.getElementById("sendWhatsApp");
const mobileBar = document.getElementById("mobileBar");
const mobileBarTotal = document.getElementById("mobileBarTotal");
const mobileBarCount = document.getElementById("mobileBarCount");

function openCart() { cartOverlay.classList.add("open"); cartDrawer.classList.add("open"); }
function closeCart() { cartOverlay.classList.remove("open"); cartDrawer.classList.remove("open"); }

document.getElementById("navCartBtn").addEventListener("click", openCart);
document.getElementById("floatCartBtn").addEventListener("click", openCart);
document.getElementById("mobileBarBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function renderCartUI(items) {
  const count = Cart.getCount();
  const subtotal = Cart.getSubtotal();
  const total = Cart.getTotal();

  ["cartCountNav", "cartCountFloat"].forEach(id => document.getElementById(id).textContent = count);

  if (items.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty">Seu carrinho está vazio.<br>Adicione algo do cardápio! 🍔</div>`;
  } else {
    cartItemsEl.innerHTML = items.map(i => `
      <div class="cart-item" data-key="${i.key}">
        <img src="${i.img}" alt="${i.name}">
        <div class="ci-info">
          <h4>${i.name}</h4>
          ${i.addonsLabel ? `<span class="ci-addons">${i.addonsLabel}</span>` : ""}
          <div class="ci-qty">
            <button data-qty="-1">−</button><span>${i.qty}</span><button data-qty="1">+</button>
          </div>
        </div>
        <div>
          <div class="ci-price">${Cart.formatBRL(i.unitPrice * i.qty)}</div>
          <button class="ci-remove" data-remove="1">remover</button>
        </div>
      </div>
    `).join("");
  }

  cartSubtotalEl.textContent = Cart.formatBRL(subtotal);
  cartTotalEl.textContent = Cart.formatBRL(total);
  sendWhatsAppBtn.disabled = items.length === 0;

  // barra mobile
  mobileBarTotal.textContent = Cart.formatBRL(total);
  mobileBarCount.textContent = count + (count === 1 ? " item" : " itens");
  mobileBar.classList.toggle("show", count > 0);
}

cartItemsEl.addEventListener("click", (e) => {
  const item = e.target.closest(".cart-item");
  if (!item) return;
  const key = item.dataset.key;
  const qtyBtn = e.target.closest("[data-qty]");
  if (qtyBtn) Cart.changeQty(key, parseInt(qtyBtn.dataset.qty, 10));
  if (e.target.closest("[data-remove]")) Cart.remove(key);
});

sendWhatsAppBtn.addEventListener("click", () => {
  if (sendWhatsAppBtn.disabled || Cart.getItems().length === 0) return;
  window.open(Cart.getWhatsAppUrl(), "_blank", "noopener");
});

Cart.subscribe(renderCartUI);
renderCartUI(Cart.getItems());
