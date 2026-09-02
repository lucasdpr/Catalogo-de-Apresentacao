# Checklist antes de entregar pra um cliente real

Este repositório hoje é a **demo de vendas** (nome "Brasa da Vila", fictício mas
completo — é isso que você mostra pro dono da lanchonete). Antes de publicar
uma cópia como site de um cliente de verdade, resolva os itens abaixo. Nenhum
é opcional — os dois primeiros são risco legal, não só estética.

## 1. Depoimentos — OBRIGATÓRIO trocar ou remover
A seção "Avaliações" (`index.html`, `#avaliacoes`) tem depoimentos fictícios
("Renata M.", "Diego F.", "Carla S.") e uma nota de "4.9 · 780+ avaliações no
Google" inventada. Isso é aceitável numa demo apresentada como exemplo — é
**proibido** publicar isso como se fosse avaliação real de cliente no site
de alguém (propaganda enganosa, Art. 37 do CDC). Antes de entregar:
- Peça pro cliente 3-5 prints/textos de avaliações reais (Google, Instagram), ou
- Apague a seção inteira até ele ter avaliações de verdade.

## 2. Fotos — trocar por fotos reais do cliente
Todas as fotos em `/img` são de banco de imagem/stock, não do estabelecimento
real. Cardápio, ambiente e fotos de cliente precisam ser do negócio de
verdade antes de publicar — ver lista de arquivos esperados em `js/data.js`.

## 3. `js/config.js` — dados do negócio
Troque `name`, `tagline`, `whatsapp`, `address`, `mainCity`, `serviceAreas`,
`hoursLines`, `mapsQuery`, `instagramHandle`, `foundedYear` e a nota do Google
pelos dados reais do cliente. Só isso já atualiza o site inteiro (nav,
footer, badges, WhatsApp, mapa).

## 4. `js/data.js` — cardápio real
Substitua `PRODUCTS`, `PROMOTIONS` e `ADDONS` pelo cardápio e preços reais.

## 5. Desligar a seção de venda do site-modelo
Em `js/config.js`, mude `showSellCta: true` para `false`. Essa seção existe só
pra você vender o serviço — não deve aparecer no site do cliente final.

## 6. Hospedagem / domínio
Não entregue no link do GitHub Pages (`lucasdpr.github.io/...`) como produto
final — é gratuito pra testar, mas não passa credibilidade. Registre um
domínio pro cliente (ou peça que ele já tenha um) e aponte pra um hosting
próprio antes da entrega oficial.
