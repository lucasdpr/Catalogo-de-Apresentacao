/* ============================================================
   CONFIG.JS — ÚNICO arquivo que precisa mudar pra reaproveitar
   este site com outro cliente (lanchonete/hamburgueria).

   Troque os valores abaixo, troque as imagens em /img mantendo
   os mesmos nomes de arquivo (ou ajuste js/data.js pro cardápio
   do novo cliente), e o site inteiro se atualiza sozinho.
   ============================================================ */

const BRAND = {
  // ---- identidade ----
  name: "Sua Hamburgueria",
  tagline: "Hambúrguer Artesanal na Sua Cidade",
  metaDescription: "Catálogo digital da sua hamburgueria. Monte seu pedido e envie direto pelo WhatsApp.",

  // ---- contato ----
  whatsapp: "5524999597969",          // só dígitos, com DDI+DDD (usado nos links wa.me)
  whatsappDisplay: "(24) 99959-7969", // como aparece escrito na seção de localização

  // ---- endereço / atendimento ----
  address: "Av. Exemplo, 123 — Bairro, Sua Cidade - UF",
  mainCity: "Sua Cidade",
  state: "UF",
  serviceAreas: "Sua Cidade e região",
  hoursShort: "Ter a Dom, 18h às 00h",
  hoursLines: "Ter–Sex 18h–00h<br>Sáb–Dom 18h–01h<br>Segunda: fechado",
  mapsQuery: "Brasil", // texto de busca usado no embed do Google Maps

  // ---- redes sociais ----
  instagramHandle: "@sua.hamburgueria",
  instagramUrl: "https://instagram.com",

  // ---- prova social ----
  foundedYear: 2015,
  googleRating: "4.9",
  googleReviewCount: "780+",

  // ---- controle de seções ----
  // false = some a seção de venda do site-modelo (use false ao entregar pro cliente final;
  // deixe true só na sua demo de vendas)
  showSellCta: true,

  // ---- tema (opcional — deixe null pra manter as cores padrão) ----
  colors: null, // ex: { copper: "#2F7A4C", copperDeep: "#215A38", copperLight: "#4FA870" }
};
