/* ============================================================
   CONFIG.JS — ÚNICO arquivo que precisa mudar pra reaproveitar
   este site com outro cliente (lanchonete/hamburgueria).

   Troque os valores abaixo, troque as imagens em /img mantendo
   os mesmos nomes de arquivo (ou ajuste js/data.js pro cardápio
   do novo cliente), e o site inteiro se atualiza sozinho.
   ============================================================ */

const BRAND = {
  // ---- identidade ----
  // Esta é a demo de vendas — mantém "Brasa da Vila" (nome fictício, mas completo e
  // convincente) pra mostrar pro prospect. SÓ troque esses valores quando for gerar
  // a cópia de entrega de um cliente real — nunca mostre "Sua Hamburgueria" /
  // "Sua Cidade" pro dono do negócio, isso parece WIP, não personalizável.
  name: "Brasa da Vila",
  tagline: "Hambúrguer Artesanal em Volta Redonda",
  metaDescription: "Catálogo digital Brasa da Vila. Monte seu pedido e envie direto pelo WhatsApp.",

  // ---- contato ----
  whatsapp: "5524999597969",          // só dígitos, com DDI+DDD (usado nos links wa.me)
  whatsappDisplay: "(24) 99959-7969", // como aparece escrito na seção de localização

  // ---- endereço / atendimento ----
  address: "Av. Exemplo, 123 — Bairro, Volta Redonda - RJ",
  mainCity: "Volta Redonda",
  state: "RJ",
  serviceAreas: "Volta Redonda, Barra Mansa e Resende",
  hoursShort: "Ter a Dom, 18h às 00h",
  hoursLines: "Ter–Sex 18h–00h<br>Sáb–Dom 18h–01h<br>Segunda: fechado",
  mapsQuery: "Volta Redonda, RJ", // troque pela cidade real do cliente — um endereço genérico deixa o mapa zoomado no mundo inteiro

  // ---- redes sociais ----
  instagramHandle: "@brasadavila",
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
