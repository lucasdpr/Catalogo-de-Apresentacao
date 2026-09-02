/* ============================================================
   BRAND.JS — aplica o objeto BRAND (js/config.js) em todo o site.
   Não tem nada de negócio específico aqui: pra trocar de cliente,
   edite js/config.js. Este arquivo não deve precisar de edição.
   ============================================================ */

(function () {
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  const setAttr = (id, attr, val) => { const el = document.getElementById(id); if (el) el.setAttribute(attr, val); };

  // ---- <title> e <meta description> ----
  document.title = `${BRAND.name} — ${BRAND.tagline}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", BRAND.metaDescription);

  // ---- nome da marca (nav + footer) ----
  set("brandNameNav", BRAND.name);
  set("brandNameFooter", BRAND.name);
  set("diffBrandName", `a ${BRAND.name}?`);

  // ---- links de WhatsApp fixos (nav, menu mobile, botão flutuante) ----
  document.querySelectorAll(".wa-link").forEach(a => {
    a.href = `https://wa.me/${BRAND.whatsapp}`;
  });

  // ---- badges e prova social ----
  set("badgeRating", `${BRAND.googleRating.replace(".", ",")}★ no Google`);
  set("badgeFounded", `Desde ${BRAND.foundedYear}`);
  set("heroRating", BRAND.googleRating);
  set("heroReviewCount", `${BRAND.googleReviewCount} avaliações`);
  set("googleBadgeRating", BRAND.googleRating);
  set("googleBadgeCount", `${BRAND.googleReviewCount} avaliações`);

  // contador animado "Nota no Google" e "Desde quando" (data-target usado em ui.js)
  document.querySelectorAll(".counter b[data-decimal]").forEach(el => {
    el.setAttribute("data-target", String(Math.round(parseFloat(BRAND.googleRating) * 10)));
  });
  document.querySelectorAll(".counter b[data-plain]").forEach(el => {
    el.setAttribute("data-target", String(BRAND.foundedYear));
  });

  // ---- localização / contato ----
  set("localAddress", BRAND.address);
  set("localHours", BRAND.hoursLines);
  set("localWhats", BRAND.whatsappDisplay);
  set("localInsta", BRAND.instagramHandle);
  set("serviceAreasText", BRAND.serviceAreas);
  set("faqServiceAreas", BRAND.serviceAreas);
  set("sellCtaAreas", BRAND.serviceAreas);
  set("footerCityHours", `${BRAND.mainCity} · ${BRAND.state} — ${BRAND.hoursShort}`);
  set("instaHeading", BRAND.instagramHandle);

  const instaLink = document.querySelector('a[href="https://instagram.com"]');
  if (instaLink) instaLink.href = BRAND.instagramUrl;

  setAttr("mapsIframe", "src", `https://www.google.com/maps?q=${BRAND.mapsQuery}&output=embed`);

  const aboutImg = document.getElementById("aboutImgAlt");
  if (aboutImg) aboutImg.alt = `Cozinha ${BRAND.name}`;

  // ---- seção de venda do site-modelo: só aparece em modo demo ----
  const sellCta = document.getElementById("sellCtaSection");
  if (sellCta && !BRAND.showSellCta) sellCta.remove();

  // ---- cores (opcional) ----
  if (BRAND.colors) {
    const root = document.documentElement;
    Object.entries(BRAND.colors).forEach(([key, val]) => root.style.setProperty(`--${key}`, val));
  }
})();
