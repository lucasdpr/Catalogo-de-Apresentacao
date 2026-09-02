/* ============================================================
   DATA.JS — dados do cardápio, adicionais e promoções.
   Para trocar produtos, preços ou fotos, edite só este arquivo.
   As fotos ficam na pasta /img — troque os arquivos mantendo o
   mesmo nome, ou aponte "img" para um novo caminho.
   ============================================================ */

const WHATSAPP_NUMBER = BRAND.whatsapp; // vem de js/config.js — número que recebe os pedidos

const ADDONS = [
  { id: "bacon",     name: "Bacon",              price: 5 },
  { id: "cheddar",   name: "Cheddar",            price: 4 },
  { id: "catupiry",  name: "Catupiry",           price: 5 },
  { id: "ovo",       name: "Ovo",                price: 3 },
  { id: "cebola",    name: "Cebola caramelizada",price: 4 },
];

// categorias que mostram adicionais no modal do produto
const CATEGORIES_WITH_ADDONS = ["hamburgueres", "combos", "batatas"];

const PRODUCTS = [
  // ---------------- HAMBÚRGUERES ----------------
  {
    id: "x-vila", category: "hamburgueres", name: "X-Clássico",
    price: 22, img: "img/x-vila.jpg",
    desc: "Pão brioche, carne 150g, queijo prato, alface, tomate e molho da casa.",
    ingredients: "Pão brioche, carne bovina 150g, queijo prato, alface, tomate, molho da casa.",
  },
  {
    id: "x-bacon", category: "hamburgueres", name: "X-Bacon",
    price: 26, img: "img/x-bacon.jpg",
    desc: "Carne 150g, bacon crocante, queijo prato e maionese da casa.",
    ingredients: "Pão brioche, carne bovina 150g, bacon crocante, queijo prato, maionese da casa.",
  },
  {
    id: "duplo-brasa", category: "hamburgueres", name: "X-Duplo na Chapa",
    price: 29, img: "img/duplo-brasa.jpg",
    desc: "Duas carnes grelhadas, bacon crocante, cheddar e cebola caramelizada.",
    ingredients: "Pão brioche, 2x carne bovina 120g, bacon, cheddar, cebola caramelizada.",
  },
  {
    id: "frango-defumado", category: "hamburgueres", name: "Frango Defumado",
    price: 24, img: "img/frango-defumado.jpg",
    desc: "Filé grelhado lentamente, catupiry e molho barbecue artesanal.",
    ingredients: "Pão brioche, filé de frango defumado, catupiry, molho barbecue da casa.",
  },
  {
    id: "veggie", category: "hamburgueres", name: "Veggie da Casa",
    price: 23, img: "img/veggie.jpg",
    desc: "Hambúrguer de grão-de-bico, queijo coalho grelhado e rúcula.",
    ingredients: "Pão brioche, hambúrguer de grão-de-bico, queijo coalho grelhado, rúcula, maionese de ervas.",
  },

  // ---------------- COMBOS ----------------
  {
    id: "combo-solo", category: "combos", name: "Combo Solo",
    price: 32, oldPrice: 38, img: "img/combo-solo.jpg",
    desc: "1 lanche à escolha + batata rústica + refrigerante gelado.",
    ingredients: "Escolha o lanche na entrega/observação · batata rústica · refrigerante lata.",
  },
  {
    id: "combo-duplo", category: "combos", name: "Combo Duplo",
    price: 54, oldPrice: 68, img: "img/combo-duplo.jpg",
    desc: "2x X-Clássico + batata grande + 2 refrigerantes gelados.",
    ingredients: "2x X-Clássico · batata rústica grande · 2x refrigerante lata.",
  },
  {
    id: "combo-familia", category: "combos", name: "Combo Família",
    price: 112, oldPrice: 140, img: "img/combo-familia.jpg",
    desc: "4 lanches à escolha + 2 batatas grandes + 4 refrigerantes gelados.",
    ingredients: "4x lanche à escolha · 2x batata rústica grande · 4x refrigerante lata.",
  },

  // ---------------- BATATAS ----------------
  {
    id: "batata-rustica", category: "batatas", name: "Batata Rústica",
    price: 16, img: "img/batata-rustica.jpg",
    desc: "Corte grosso, tempero da casa e molho verde artesanal.",
    ingredients: "Batata rústica, tempero da casa, molho verde.",
  },
  {
    id: "batata-cheddar", category: "batatas", name: "Batata Cheddar & Bacon",
    price: 24, img: "img/batata-cheddar.jpg",
    desc: "Porção generosa coberta com cheddar cremoso e bacon crocante.",
    ingredients: "Batata rústica, cheddar cremoso, bacon crocante.",
  },
  {
    id: "batata-palha", category: "batatas", name: "Batata Palha da Casa",
    price: 14, img: "img/batata-palha.jpg",
    desc: "Fininha e crocante, feita na hora.",
    ingredients: "Batata palha frita na hora, sal.",
  },

  // ---------------- BEBIDAS ----------------
  {
    id: "refri", category: "bebidas", name: "Refrigerante Lata 350ml",
    price: 6, img: "img/refri.jpg",
    desc: "Linha completa de refrigerantes gelados.",
    ingredients: "Escolha o sabor na observação do pedido.",
  },
  {
    id: "suco", category: "bebidas", name: "Suco Natural 500ml",
    price: 10, img: "img/suco.jpg",
    desc: "Feito na hora, sabores variados conforme a fruta do dia.",
    ingredients: "Fruta da estação, água ou leite, sem conservantes.",
  },
  {
    id: "milkshake", category: "bebidas", name: "Milkshake Artesanal",
    price: 15, img: "img/milkshake.jpg",
    desc: "Cremoso, feito com sorvete da casa. Chocolate, morango ou baunilha.",
    ingredients: "Sorvete artesanal, leite, calda a escolher, chantilly.",
  },

  // ---------------- SOBREMESAS ----------------
  {
    id: "brownie", category: "sobremesas", name: "Brownie com Sorvete",
    price: 14, img: "img/brownie.jpg",
    desc: "Brownie quentinho com bola de sorvete de creme e calda de chocolate.",
    ingredients: "Brownie de chocolate, sorvete de creme, calda de chocolate.",
  },
  {
    id: "petit-gateau", category: "sobremesas", name: "Petit Gâteau",
    price: 16, img: "img/petit-gateau.jpg",
    desc: "Massa de chocolate com recheio cremoso, servido quente.",
    ingredients: "Massa de chocolate, recheio cremoso, sorvete de creme.",
  },
];

const PROMOTIONS = [
  {
    id: "promo-bacon", name: "X-Bacon + Batata + Refri",
    price: 31.90, oldPrice: 42, img: "img/x-bacon.jpg",
    desc: "X-Bacon, batata rústica e um refrigerante gelado.",
    save: "ECONOMIZE R$ 10,10",
  },
  {
    id: "promo-duplo", name: "X-Duplo na Chapa + Batata Cheddar",
    price: 45.90, oldPrice: 58, img: "img/duplo-brasa.jpg",
    desc: "X-Duplo na Chapa acompanhado de batata com cheddar e bacon.",
    save: "ECONOMIZE R$ 12,10",
  },
];

const GALLERY = [
  { img: "img/hero-burger.jpg", alt: "Hambúrguer artesanal" },
  { img: "img/x-bacon.jpg", alt: "X-Bacon" },
  { img: "img/duplo-brasa.jpg", alt: "X-Duplo na Chapa" },
  { img: "img/chapa.jpg", alt: "Direto da chapa" },
  { img: "img/ambiente.jpg", alt: "Ambiente" },
  { img: "img/cliente.jpg", alt: "Cliente satisfeito" },
];

const INSTAGRAM = ["img/instagram1.jpg","img/instagram2.jpg","img/instagram3.jpg","img/instagram4.jpg","img/instagram5.jpg","img/instagram6.jpg"];
