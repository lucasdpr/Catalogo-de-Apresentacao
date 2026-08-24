/* ============================================================
   CART.JS — estado do carrinho (em memória) e lógica de preço.
   Não mexe em DOM diretamente; quem escuta as mudanças é o ui.js.
   ============================================================ */

const Cart = (() => {
  let items = []; // { key, name, unitPrice, qty, img, addonsLabel, addonsTotal }
  const listeners = [];

  function subscribe(fn) { listeners.push(fn); }
  function notify() { listeners.forEach(fn => fn(items)); }

  function formatBRL(value) {
    return "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // gera uma chave única por combinação produto + adicionais selecionados
  function makeKey(productId, addonIds) {
    return productId + "::" + [...addonIds].sort().join(",");
  }

  function add(product, qty, addonIds = []) {
    const addons = ADDONS.filter(a => addonIds.includes(a.id));
    const addonsTotal = addons.reduce((s, a) => s + a.price, 0);
    const unitPrice = product.price + addonsTotal;
    const key = makeKey(product.id, addonIds);
    const addonsLabel = addons.map(a => "+ " + a.name).join(", ");

    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        key, productId: product.id, name: product.name, unitPrice, qty,
        img: product.img, addonsLabel, emoji: categoryEmoji(product.category),
      });
    }
    notify();
  }

  function addPromotion(promo, qty = 1) {
    const key = "promo::" + promo.id;
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        key, productId: promo.id, name: promo.name, unitPrice: promo.price, qty,
        img: promo.img, addonsLabel: "Promoção da semana", emoji: "🔥",
      });
    }
    notify();
  }

  function changeQty(key, delta) {
    const item = items.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) items = items.filter(i => i.key !== key);
    notify();
  }

  function remove(key) {
    items = items.filter(i => i.key !== key);
    notify();
  }

  function clear() {
    items = [];
    notify();
  }

  function categoryEmoji(cat) {
    return { hamburgueres: "🍔", combos: "🍔", batatas: "🍟", bebidas: "🥤", sobremesas: "🍰" }[cat] || "🍽️";
  }

  function getCount() { return items.reduce((s, i) => s + i.qty, 0); }
  function getSubtotal() { return items.reduce((s, i) => s + i.unitPrice * i.qty, 0); }
  function getTotal() { return getSubtotal(); } // sem taxa de entrega no modelo

  function buildWhatsAppMessage() {
    if (items.length === 0) return "";
    let lines = ["Olá! Gostaria de fazer esse pedido:", ""];
    items.forEach(i => {
      const lineTotal = (i.unitPrice * i.qty).toFixed(2).replace(".", ",");
      let line = `${i.emoji} ${i.name} x${i.qty} — R$${lineTotal}`;
      if (i.addonsLabel) line += ` (${i.addonsLabel})`;
      lines.push(line);
    });
    lines.push("");
    lines.push(`Total: ${formatBRL(getTotal())}`);
    return lines.join("\n");
  }

  function getWhatsAppUrl() {
    const msg = buildWhatsAppMessage();
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  return {
    subscribe, add, addPromotion, changeQty, remove, clear,
    getCount, getSubtotal, getTotal, getItems: () => items,
    formatBRL, buildWhatsAppMessage, getWhatsAppUrl,
  };
})();
