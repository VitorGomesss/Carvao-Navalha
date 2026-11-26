/* ============================================================================
   CARVÃO & NAVALHA — MÓDULO JAVASCRIPT PRINCIPAL
   Estrutura modular para fácil manutenção de serviços, produtos, equipe e agenda.
   ============================================================================ */

(() => {
  'use strict';

  /* ==========================================================================
     1. CONFIGURAÇÕES GERAIS (EDITE AQUI DADOS DE CONTATO E HORÁRIOS)
     ========================================================================== */
  const SHOP_CONFIG = {
    name: 'Carvão & Navalha',
    whatsappNumber: '5511999999999', // Formato internacional: 55 + DDD + Número (somente dígitos)
    whatsappDisplay: '(11) 99999-9999',
    address: 'Av. Paulista, 1450 - São Paulo, SP',
    hours: {
      weekday: { startHour: 9, endHour: 19, endMinute: 30, label: 'Seg–Sex: 09h às 20h' },
      saturday: { startHour: 9, endHour: 17, endMinute: 30, label: 'Sáb: 09h às 18h' },
    },
  };

  /* ==========================================================================
     2. CATÁLOGO DE SERVIÇOS (GRID DE 6 CARDS + ETAPA 1 DO MODAL)
     ========================================================================== */
  const SERVICES_DATA = [
    {
      id: 'corte-signature',
      name: 'Corte Masculino Signature',
      duration: '45 min',
      price: 55.0,
      description: 'Consultoria de visagismo, corte na tesoura e máquina com acabamento navalhado, lavagem especial e finalização premium.',
      featured: false,
    },
    {
      id: 'barba-terapia',
      name: 'Barba Terapia Tradicional',
      duration: '35 min',
      price: 45.0,
      description: 'Modelagem na navalha com ritual de toalha quente, aromaterapia, esfoliação suave, balm hidratante e óleo essencial.',
      featured: false,
    },
    {
      id: 'combo-carvao-navalha',
      name: 'Combo Carvão & Navalha',
      duration: '1h 15min',
      price: 90.0,
      description: 'Nossa experiência completa: Corte Masculino Signature + Barba Terapia Tradicional com economia exclusiva.',
      featured: true,
      badge: 'Mais Pedido',
    },
    {
      id: 'acabamento-pezinho',
      name: 'Acabamento & Pezinho',
      duration: '15 min',
      price: 25.0,
      description: 'Manutenção precisa dos contornos de nuca, costeletas e alinhamento rápido das linhas da barba na navalha.',
      featured: false,
    },
    {
      id: 'hidratacao-selagem',
      name: 'Hidratação & Selagem Capilar',
      duration: '40 min',
      price: 70.0,
      description: 'Tratamento profundo com ativos nutritivos que devolvem maciez, brilho natural e controle de frizz aos fios.',
      featured: false,
    },
    {
      id: 'corte-pai-filho',
      name: 'Corte Pai & Filho',
      duration: '1h 20min',
      price: 95.0,
      description: 'Momento especial lado a lado: dois cortes completos com o mesmo cuidado, estilo e atendimento acolhedor.',
      featured: false,
    },
  ];

  /* ==========================================================================
     3. VITRINE DE PRODUTOS (ARRAY LIMPO E COMENTADO PARA FÁCIL EDIÇÃO)
     --------------------------------------------------------------------------
     COMO EDITAR UM PRODUTO:
     - name: Nome comercial exibido no card e no carrinho
     - category: "Fixação" | "Barba" | "Banho" | "Kits"
     - volume: Peso ou volume exibido no selo do card (ex.: "85g", "30ml")
     - price: Número decimal em reais (ex.: 49.90 => exibido como "R$ 49,90")
     - description: Descrição curta de 1 a 2 linhas
     - image: Caminho da imagem 1:1 (deixe '' vazio para exibir placeholder automático)
     ========================================================================== */
  const PRODUCTS_DATA = [
    // [PRODUTO 1] — Fixação | 85g | R$ 49,90
    {
      id: 'produto-1',
      name: 'Pomada Modeladora Matte',
      category: 'Fixação',
      volume: '85g',
      price: 49.9,
      description: 'Alta fixação com acabamento seco natural e textura leve, ideal para cortes estruturados sem aspecto oleoso.',
      image: 'assets/images/product-pomada-matte.jpg',
    },

    // [PRODUTO 2] — Fixação | 85g | R$ 49,90
    {
      id: 'produto-2',
      name: 'Cera Modeladora Efeito Brilho',
      category: 'Fixação',
      volume: '85g',
      price: 49.9,
      description: 'Modelagem flexível com brilho clássico sofisticado, fácil remoção no banho e fragrância amadeirada suave.',
      image: 'assets/images/product-cera-brilho.jpg',
    },

    // [PRODUTO 3] — Barba | 30ml | R$ 54,90
    {
      id: 'produto-3',
      name: 'Óleo para Barba Cedro & Âmbar',
      category: 'Barba',
      volume: '30ml',
      price: 54.9,
      description: 'Blend nutritivo com óleos vegetais nobres que hidrata os fios, evita ressecamento e perfuma com notas de cedro.',
      image: 'assets/images/product-oleo-barba.jpg',
    },

    // [PRODUTO 4] — Barba | 100ml | R$ 44,90
    {
      id: 'produto-4',
      name: 'Balm Hidratante para Barba',
      category: 'Barba',
      volume: '100ml',
      price: 44.9,
      description: 'Alinha fios rebeldes, acalma a pele após o barbear e entrega toque aveludado durante todo o dia.',
      image: 'assets/images/product-balm-barba.jpg',
    },

    // [PRODUTO 5] — Banho | 250ml | R$ 39,90
    {
      id: 'produto-5',
      name: 'Shampoo 3 em 1 Carvão Ativado',
      category: 'Banho',
      volume: '250ml',
      price: 39.9,
      description: 'Limpeza detox refrescante para cabelo, barba e corpo com carvão ativado e extrato de hortelã.',
      image: 'assets/images/product-shampoo.jpg',
    },

    // [PRODUTO 6] — Kits | 3 itens | R$ 129,90
    {
      id: 'produto-6',
      name: 'Kit Ritual Carvão & Navalha',
      category: 'Kits',
      volume: '3 itens',
      price: 129.9,
      description: 'Caixa presenteável exclusiva reunindo Pomada Matte 85g, Óleo para Barba 30ml e Shampoo Carvão Ativado 250ml.',
      image: 'assets/images/product-kit.jpg',
    },
  ];

  /* ==========================================================================
     4. EQUIPE DE BARBEIROS (3 CARDS + ETAPA 2 DO MODAL)
     ========================================================================== */
  const TEAM_DATA = [
    {
      id: 'lucas-andrade',
      name: 'Lucas Andrade',
      role: 'Master Barber & Fundador',
      experience: '10 anos',
      bio: 'Referência em cortes clássicos na tesoura, visagismo executivo e acabamento impecável na navalha.',
      image: 'assets/images/barber-lucas.jpg',
    },
    {
      id: 'rafael-costa',
      name: 'Rafael Costa',
      role: 'Especialista em Barba Terapia',
      experience: '7 anos',
      bio: 'Mestre no ritual de toalha quente, aromaterapia e desenho simétrico para barbas cheias ou curtas.',
      image: 'assets/images/barber-rafael.jpg',
    },
    {
      id: 'matheus-silva',
      name: 'Matheus Silva',
      role: 'Barber Stylist',
      experience: '5 anos',
      bio: 'Especialista em degradês modernos, texturização e estilos contemporâneos adaptados à sua rotina.',
      image: 'assets/images/barber-matheus.jpg',
    },
  ];

  /* ==========================================================================
     5. ESTADO DA APLICAÇÃO
     ========================================================================== */
  const STORAGE_CART_KEY = 'carvao_navalha_cart_v1';

  const appState = {
    activeCategory: 'Todos',
    cart: loadCartFromStorage(),
    booking: {
      step: 1,
      serviceId: null,
      barberId: null,
      dateISO: null,
      time: null,
      clientName: '',
      clientPhone: '',
      clientNotes: '',
    },
  };

  /* ==========================================================================
     6. UTILITÁRIOS (MOEDA, WHATSAPP, DATAS E MÁSCARA DE TELEFONE)
     ========================================================================== */
  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function loadCartFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(appState.cart));
    } catch {
      // Silencioso caso o navegador bloqueie storage
    }
  }

  function formatDateISO(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function parseISODateLocal(isoString) {
    const [y, m, d] = isoString.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function formatReadableDate(isoString) {
    if (!isoString) return '—';
    const d = parseISODateLocal(isoString);
    return d.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function getUpcomingOpenDays(count = 10) {
    const days = [];
    const cursor = new Date();
    cursor.setHours(12, 0, 0, 0);

    // Se já passou das 19h hoje, começa oferecendo a partir de amanhã
    if (new Date().getHours() >= 19) {
      cursor.setDate(cursor.getDate() + 1);
    }

    while (days.length < count) {
      if (cursor.getDay() !== 0) {
        // Ignora domingos (fechado)
        days.push({
          iso: formatDateISO(cursor),
          weekdayShort: cursor
            .toLocaleDateString('pt-BR', { weekday: 'short' })
            .replace('.', ''),
          dayMonth: cursor.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          }),
          isSaturday: cursor.getDay() === 6,
        });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  }

  function generateTimeSlotsForDate(isoString) {
    const dateObj = parseISODateLocal(isoString);
    const isSaturday = dateObj.getDay() === 6;
    const config = isSaturday ? SHOP_CONFIG.hours.saturday : SHOP_CONFIG.hours.weekday;

    const slots = [];
    let hour = config.startHour;
    let minute = 0;

    while (
      hour < config.endHour ||
      (hour === config.endHour && minute <= config.endMinute)
    ) {
      slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }

    return { slots, label: config.label };
  }

  function formatPhoneBR(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : '';
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function createProductPlaceholderMarkup(title) {
    return `
      <div class="product-placeholder" aria-label="Imagem ilustrativa de ${title}">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="7" y="4" width="10" height="16" rx="2"></rect>
          <path d="M9 4V2h6v2"></path>
          <line x1="7" y1="10" x2="17" y2="10"></line>
        </svg>
        <span>Carvão &amp; Navalha</span>
      </div>
    `;
  }

  /* ==========================================================================
     7. RENDERIZAÇÃO DAS SEÇÕES DINÂMICAS
     ========================================================================== */
  function renderServices() {
    const container = document.getElementById('services-grid');
    if (!container) return;

    container.innerHTML = SERVICES_DATA.map(
      (service) => `
      <article class="service-card reveal ${service.featured ? 'is-featured' : ''}">
        <div>
          <div class="service-card-top">
            <span class="service-duration">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${service.duration}
            </span>
            ${service.badge ? `<span class="service-badge">${service.badge}</span>` : ''}
          </div>
          <h3 class="service-title">${service.name}</h3>
          <p class="service-desc">${service.description}</p>
        </div>

        <div class="service-card-footer">
          <div class="service-price-wrap">
            <span class="service-price-label">Investimento</span>
            <strong class="service-price">${formatCurrency(service.price)}</strong>
          </div>
          <button
            type="button"
            class="btn ${service.featured ? 'btn-primary' : 'btn-outline'} btn-sm"
            data-book-service="${service.id}"
          >
            Agendar
          </button>
        </div>
      </article>
    `
    ).join('');
  }

  function renderProducts(category = 'Todos') {
    const container = document.getElementById('products-grid');
    if (!container) return;

    const filtered =
      category === 'Todos'
        ? PRODUCTS_DATA
        : PRODUCTS_DATA.filter((item) => item.category === category);

    container.innerHTML = filtered
      .map((product) => {
        const directMsg = `Olá! Gostaria de saber mais sobre o produto *${product.name}* (${product.volume} — ${formatCurrency(product.price)}) da loja Carvão & Navalha.`;
        const mediaContent = product.image
          ? `<img src="${product.image}" alt="${product.name} — ${product.volume}" class="product-img" loading="lazy">`
          : createProductPlaceholderMarkup(product.name);

        return `
        <article class="product-card">
          <div class="product-media">
            ${mediaContent}
            <div class="product-badges">
              <span class="product-tag">${product.category}</span>
              <span class="product-volume">${product.volume}</span>
            </div>
          </div>

          <div class="product-body">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.description}</p>

            <div class="product-price-row">
              <strong class="product-price">${formatCurrency(product.price)}</strong>
              <span class="product-installment">Pronta entrega</span>
            </div>

            <div class="product-actions">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                data-add-to-cart="${product.id}"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="12" y1="11" x2="12" y2="17"></line>
                  <line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>
                <span>Adicionar ao Carrinho</span>
              </button>

              <a
                href="${buildWhatsAppUrl(directMsg)}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline btn-sm btn-product-wa"
                aria-label="Comprar ${product.name} pelo WhatsApp"
                title="Pedir direto no WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .15 5.34.15 11.91c0 2.1.55 4.15 1.59 5.95L0 24l6.31-1.65a11.89 11.89 0 0 0 5.74 1.46h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.17-3.44-8.42zM12.06 21.8h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.88-9.9 9.88zm5.43-7.41c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/></svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </article>
      `;
      })
      .join('');

    // Fallback automático caso alguma imagem não seja encontrada
    container.querySelectorAll('.product-img').forEach((img) => {
      img.addEventListener('error', () => {
        const media = img.closest('.product-media');
        if (!media) return;
        const badges = media.querySelector('.product-badges');
        media.innerHTML = createProductPlaceholderMarkup(img.alt || 'Produto');
        if (badges) media.appendChild(badges);
      });
    });
  }

  function renderTeam() {
    const container = document.getElementById('team-grid');
    if (!container) return;

    container.innerHTML = TEAM_DATA.map(
      (barber) => `
      <article class="team-card reveal">
        <div class="team-photo-wrap">
          <img src="${barber.image}" alt="${barber.name} — ${barber.role}" class="team-photo" loading="lazy">
          <div class="team-photo-fade" aria-hidden="true"></div>
          <span class="team-exp-pill">${barber.experience} de experiência</span>
        </div>

        <div class="team-info">
          <h3 class="team-name">${barber.name}</h3>
          <span class="team-role">${barber.role}</span>
          <p class="team-bio">${barber.bio}</p>
          <button
            type="button"
            class="btn btn-outline btn-full"
            data-book-barber="${barber.id}"
          >
            Agendar com este barbeiro
          </button>
        </div>
      </article>
    `
    ).join('');
  }

  /* ==========================================================================
     8. CARRINHO DE COMPRAS (DRAWER LATERAL + WHATSAPP)
     ========================================================================== */
  const cartDrawer = document.getElementById('cart-drawer');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartCountBadge = document.getElementById('cart-count-badge');
  const drawerItemsCount = document.getElementById('drawer-items-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDrawerFooter = document.getElementById('cart-drawer-footer');
  const checkoutWhatsAppBtn = document.getElementById('checkout-whatsapp-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');

  function getCartStats() {
    let totalItems = 0;
    let subtotal = 0;
    for (const entry of appState.cart) {
      const product = PRODUCTS_DATA.find((p) => p.id === entry.productId);
      if (!product) continue;
      totalItems += entry.qty;
      subtotal += product.price * entry.qty;
    }
    return { totalItems, subtotal };
  }

  function addToCart(productId, triggerButton = null) {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!product) return;

    const existing = appState.cart.find((item) => item.productId === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      appState.cart.push({ productId, qty: 1 });
    }

    saveCartToStorage();
    renderCart();
    bumpCartBadge();

    if (triggerButton) {
      const span = triggerButton.querySelector('span');
      if (span) {
        const originalText = span.textContent;
        span.textContent = 'Adicionado ✓';
        triggerButton.disabled = true;
        setTimeout(() => {
          span.textContent = originalText;
          triggerButton.disabled = false;
        }, 900);
      }
    }

    showToast(`${product.name} adicionado ao carrinho.`, 'Ver carrinho', openCartDrawer);
  }

  function updateCartItemQty(productId, delta) {
    const index = appState.cart.findIndex((item) => item.productId === productId);
    if (index === -1) return;

    appState.cart[index].qty += delta;
    if (appState.cart[index].qty <= 0) {
      appState.cart.splice(index, 1);
    }

    saveCartToStorage();
    renderCart();
  }

  function removeCartItem(productId) {
    appState.cart = appState.cart.filter((item) => item.productId !== productId);
    saveCartToStorage();
    renderCart();
  }

  function clearCart() {
    appState.cart = [];
    saveCartToStorage();
    renderCart();
  }

  function bumpCartBadge() {
    if (!cartCountBadge) return;
    cartCountBadge.classList.remove('is-bumped');
    void cartCountBadge.offsetWidth;
    cartCountBadge.classList.add('is-bumped');
    setTimeout(() => cartCountBadge.classList.remove('is-bumped'), 260);
  }

  function renderCart() {
    const { totalItems, subtotal } = getCartStats();

    if (cartCountBadge) {
      cartCountBadge.textContent = String(totalItems);
      cartCountBadge.classList.toggle('is-empty', totalItems === 0);
    }

    if (drawerItemsCount) {
      drawerItemsCount.textContent = totalItems === 1 ? '1 item' : `${totalItems} itens`;
    }

    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = formatCurrency(subtotal);
    }

    if (!cartItemsContainer || !cartDrawerFooter) return;

    if (totalItems === 0) {
      cartDrawerFooter.classList.add('is-hidden');
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h3>Seu carrinho está vazio</h3>
          <p>Explore nossa linha de pomadas, óleos para barba, shampoos e kits exclusivos.</p>
          <a href="#produtos" class="btn btn-outline btn-sm" id="empty-cart-explore-btn">Explorar Produtos</a>
        </div>
      `;

      const exploreBtn = document.getElementById('empty-cart-explore-btn');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', closeCartDrawer);
      }
      return;
    }

    cartDrawerFooter.classList.remove('is-hidden');

    const listMarkup = appState.cart
      .map((entry) => {
        const product = PRODUCTS_DATA.find((p) => p.id === entry.productId);
        if (!product) return '';
        const lineTotal = product.price * entry.qty;
        const thumbMarkup = product.image
          ? `<img src="${product.image}" alt="${product.name}">`
          : `<div class="product-placeholder"><span>C&amp;N</span></div>`;

        return `
        <li class="cart-item">
          <div class="cart-item-thumb">${thumbMarkup}</div>
          <div class="cart-item-info">
            <div class="cart-item-top">
              <div>
                <h3 class="cart-item-name">${product.name}</h3>
                <span class="cart-item-meta">${product.category} • ${product.volume} • ${formatCurrency(product.price)} un.</span>
              </div>
              <button
                type="button"
                class="cart-remove-btn"
                data-cart-remove="${product.id}"
                aria-label="Remover ${product.name} do carrinho"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
              </button>
            </div>

            <div class="cart-item-bottom">
              <div class="qty-control" aria-label="Quantidade de ${product.name}">
                <button type="button" class="qty-btn" data-cart-dec="${product.id}" aria-label="Diminuir quantidade">−</button>
                <span class="qty-value">${entry.qty}</span>
                <button type="button" class="qty-btn" data-cart-inc="${product.id}" aria-label="Aumentar quantidade">+</button>
              </div>
              <strong class="cart-item-price">${formatCurrency(lineTotal)}</strong>
            </div>
          </div>
        </li>
      `;
      })
      .join('');

    cartItemsContainer.innerHTML = `<ul class="cart-list">${listMarkup}</ul>`;
  }

  function openCartDrawer() {
    if (!cartDrawer) return;
    closeMobileMenu();
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    openCartBtn?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    closeCartBtn?.focus();
  }

  function closeCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    openCartBtn?.setAttribute('aria-expanded', 'false');
    if (!bookingModal?.classList.contains('is-open')) {
      document.body.classList.remove('no-scroll');
    }
  }

  function checkoutCartViaWhatsApp() {
    const { totalItems, subtotal } = getCartStats();
    if (totalItems === 0) return;

    const lines = [
      `Olá, *${SHOP_CONFIG.name}*! Gostaria de finalizar o pedido abaixo:`,
      '',
    ];

    appState.cart.forEach((entry) => {
      const product = PRODUCTS_DATA.find((p) => p.id === entry.productId);
      if (!product) return;
      lines.push(
        `• ${entry.qty}x *${product.name}* (${product.volume}) — ${formatCurrency(product.price * entry.qty)}`
      );
    });

    lines.push('');
    lines.push(`*Subtotal:* ${formatCurrency(subtotal)}`);
    lines.push('Gostaria de combinar a retirada na Av. Paulista ou entrega.');

    window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  }

  /* ==========================================================================
     9. MODAL DE AGENDAMENTO (4 ETAPAS)
     ========================================================================== */
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingBtn = document.getElementById('close-booking-btn');
  const bookingServicesList = document.getElementById('booking-services-list');
  const bookingBarbersList = document.getElementById('booking-barbers-list');
  const bookingDateChips = document.getElementById('booking-date-chips');
  const bookingDateInput = document.getElementById('booking-date-input');
  const bookingDateError = document.getElementById('booking-date-error');
  const bookingTimeSlots = document.getElementById('booking-time-slots');
  const bookingHoursHint = document.getElementById('booking-hours-hint');
  const bookingSummaryCard = document.getElementById('booking-summary-card');
  const bookingPreselectBanner = document.getElementById('booking-preselect-banner');
  const bookingPrevBtn = document.getElementById('booking-prev-btn');
  const bookingNextBtn = document.getElementById('booking-next-btn');
  const bookingConfirmBtn = document.getElementById('booking-confirm-btn');
  const bookingStepHint = document.getElementById('booking-step-hint');
  const bookingFormError = document.getElementById('booking-form-error');
  const clientNameInput = document.getElementById('client-name');
  const clientPhoneInput = document.getElementById('client-phone');
  const clientNotesInput = document.getElementById('client-notes');

  const BARBER_OPTIONS = [
    ...TEAM_DATA,
    {
      id: 'sem-preferencia',
      name: 'Sem Preferência',
      role: 'Primeiro profissional disponível',
      experience: 'Mesmo padrão de excelência',
      image: null,
    },
  ];

  function openBookingModal({ serviceId = null, barberId = null } = {}) {
    if (!bookingModal) return;
    closeMobileMenu();
    closeCartDrawer();

    // Reseta seleções relevantes mantendo UX fluida
    appState.booking.serviceId = serviceId;
    appState.booking.barberId = barberId;

    const upcomingDays = getUpcomingOpenDays(10);
    if (!appState.booking.dateISO) {
      appState.booking.dateISO = upcomingDays[0].iso;
    }
    appState.booking.time = null;

    // Se usuário clicou em um serviço específico, já avança para etapa 2 (Barbeiro)
    appState.booking.step = serviceId ? 2 : 1;

    renderBookingStepContent();
    updateBookingStepUI();

    bookingModal.classList.add('is-open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    closeBookingBtn?.focus();
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('is-open');
    bookingModal.setAttribute('aria-hidden', 'true');
    if (!cartDrawer?.classList.contains('is-open')) {
      document.body.classList.remove('no-scroll');
    }
  }

  function renderBookingStepContent() {
    // Etapa 1: Serviços
    if (bookingServicesList) {
      bookingServicesList.innerHTML = SERVICES_DATA.map(
        (service) => `
        <button
          type="button"
          class="option-card ${appState.booking.serviceId === service.id ? 'is-selected' : ''}"
          data-select-service="${service.id}"
        >
          <span class="option-card-title">${service.name}</span>
          <span class="option-card-meta">
            <span class="option-duration">${service.duration}</span>
            <span class="option-price">${formatCurrency(service.price)}</span>
          </span>
        </button>
      `
      ).join('');
    }

    // Etapa 2: Barbeiros
    if (bookingBarbersList) {
      bookingBarbersList.innerHTML = BARBER_OPTIONS.map((barber) => {
        const avatarMarkup = barber.image
          ? `<img src="${barber.image}" alt="${barber.name}" class="barber-mini-avatar">`
          : `<span class="barber-mini-icon" aria-hidden="true">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                 <circle cx="12" cy="12" r="10"></circle>
                 <polyline points="12 6 12 12 16 14"></polyline>
               </svg>
             </span>`;

        return `
        <button
          type="button"
          class="barber-option-card ${appState.booking.barberId === barber.id ? 'is-selected' : ''}"
          data-select-barber="${barber.id}"
        >
          ${avatarMarkup}
          <span>
            <strong class="barber-opt-name">${barber.name}</strong>
            <span class="barber-opt-role">${barber.role}</span>
            <span class="barber-opt-exp">${barber.experience}</span>
          </span>
        </button>
      `;
      }).join('');
    }

    // Etapa 3: Datas & Horários
    renderBookingDateAndTime();

    // Etapa 4: Resumo Visual
    renderBookingSummary();
  }

  function renderBookingDateAndTime() {
    const upcomingDays = getUpcomingOpenDays(8);
    if (!appState.booking.dateISO) {
      appState.booking.dateISO = upcomingDays[0].iso;
    }

    if (bookingDateInput) {
      bookingDateInput.min = upcomingDays[0].iso;
      bookingDateInput.value = appState.booking.dateISO;
    }

    if (bookingDateChips) {
      bookingDateChips.innerHTML = upcomingDays
        .map(
          (day) => `
        <button
          type="button"
          class="date-chip ${appState.booking.dateISO === day.iso ? 'is-selected' : ''}"
          data-select-date="${day.iso}"
        >
          <span class="date-chip-day">${day.weekdayShort}</span>
          <span class="date-chip-num">${day.dayMonth}</span>
        </button>
      `
        )
        .join('');
    }

    const { slots, label } = generateTimeSlotsForDate(appState.booking.dateISO);
    if (bookingHoursHint) {
      bookingHoursHint.textContent = label;
    }

    if (appState.booking.time && !slots.includes(appState.booking.time)) {
      appState.booking.time = null;
    }

    if (bookingTimeSlots) {
      bookingTimeSlots.innerHTML = slots
        .map(
          (slot) => `
        <button
          type="button"
          class="time-slot-btn ${appState.booking.time === slot ? 'is-selected' : ''}"
          data-select-time="${slot}"
        >
          ${slot}
        </button>
      `
        )
        .join('');
    }
  }

  function renderBookingSummary() {
    if (!bookingSummaryCard) return;

    const service = SERVICES_DATA.find((s) => s.id === appState.booking.serviceId);
    const barber = BARBER_OPTIONS.find((b) => b.id === appState.booking.barberId);

    bookingSummaryCard.innerHTML = `
      <div class="summary-grid">
        <div>
          <span class="summary-item-label">Serviço</span>
          <span class="summary-item-value">${service ? service.name : '—'}</span>
        </div>
        <div>
          <span class="summary-item-label">Profissional</span>
          <span class="summary-item-value">${barber ? barber.name : '—'}</span>
        </div>
        <div>
          <span class="summary-item-label">Data e Horário</span>
          <span class="summary-item-value">${formatReadableDate(appState.booking.dateISO)} às ${appState.booking.time || '—'}</span>
        </div>
        <div>
          <span class="summary-item-label">Duração &amp; Valor</span>
          <span class="summary-item-value is-gold">${service ? `${service.duration} • ${formatCurrency(service.price)}` : '—'}</span>
        </div>
      </div>
    `;
  }

  function updatePreselectBanner() {
    if (!bookingPreselectBanner) return;

    const service = SERVICES_DATA.find((s) => s.id === appState.booking.serviceId);
    const barber = BARBER_OPTIONS.find((b) => b.id === appState.booking.barberId);

    if (appState.booking.step === 1 && barber) {
      bookingPreselectBanner.innerHTML = `Barbeiro pré-selecionado: <strong>${barber.name}</strong>. Escolha o serviço abaixo para continuar.`;
      bookingPreselectBanner.hidden = false;
    } else if (appState.booking.step === 2 && service) {
      bookingPreselectBanner.innerHTML = `Serviço selecionado: <strong>${service.name}</strong> (${service.duration} • ${formatCurrency(service.price)}).`;
      bookingPreselectBanner.hidden = false;
    } else {
      bookingPreselectBanner.hidden = true;
    }
  }

  function isStepComplete(stepNumber) {
    if (stepNumber === 1) return Boolean(appState.booking.serviceId);
    if (stepNumber === 2) return Boolean(appState.booking.barberId);
    if (stepNumber === 3) return Boolean(appState.booking.dateISO && appState.booking.time);
    return false;
  }

  function updateBookingStepUI() {
    const current = appState.booking.step;

    // Alterna visibilidade das seções
    document.querySelectorAll('.booking-step').forEach((section) => {
      const stepNum = Number(section.getAttribute('data-step'));
      section.classList.toggle('is-active', stepNum === current);
    });

    // Atualiza indicador de passos
    document.querySelectorAll('.step-indicator').forEach((item) => {
      const stepNum = Number(item.getAttribute('data-step-indicator'));
      item.classList.toggle('is-active', stepNum === current);
      item.classList.toggle('is-done', stepNum < current || (stepNum !== current && isStepComplete(stepNum)));
    });

    updatePreselectBanner();

    if (bookingStepHint) {
      bookingStepHint.textContent = `Passo ${current} de 4`;
    }

    if (bookingPrevBtn) {
      bookingPrevBtn.hidden = current === 1;
    }

    if (bookingNextBtn) {
      bookingNextBtn.hidden = current === 4;
      bookingNextBtn.disabled = !isStepComplete(current);
      bookingNextBtn.style.opacity = bookingNextBtn.disabled ? '0.45' : '1';
      bookingNextBtn.style.cursor = bookingNextBtn.disabled ? 'not-allowed' : 'pointer';
    }

    if (bookingConfirmBtn) {
      bookingConfirmBtn.hidden = current !== 4;
    }

    if (bookingFormError) {
      bookingFormError.hidden = true;
    }

    if (current === 4) {
      renderBookingSummary();
    }
  }

  function goToBookingStep(targetStep) {
    if (targetStep < 1 || targetStep > 4) return;

    // Valida etapas anteriores antes de avançar
    if (targetStep > appState.booking.step) {
      for (let s = 1; s < targetStep; s += 1) {
        if (!isStepComplete(s)) {
          appState.booking.step = s;
          updateBookingStepUI();
          return;
        }
      }
    }

    appState.booking.step = targetStep;
    updateBookingStepUI();
  }

  function confirmBookingViaWhatsApp() {
    const name = clientNameInput?.value.trim() || '';
    const phone = clientPhoneInput?.value.trim() || '';
    const notes = clientNotesInput?.value.trim() || '';

    const phoneDigits = phone.replace(/\D/g, '');
    if (name.length < 2) {
      if (bookingFormError) {
        bookingFormError.textContent = 'Por favor, informe seu nome completo.';
        bookingFormError.hidden = false;
      }
      clientNameInput?.focus();
      return;
    }

    if (phoneDigits.length < 10) {
      if (bookingFormError) {
        bookingFormError.textContent = 'Informe um número de telefone/WhatsApp válido com DDD.';
        bookingFormError.hidden = false;
      }
      clientPhoneInput?.focus();
      return;
    }

    const service = SERVICES_DATA.find((s) => s.id === appState.booking.serviceId);
    const barber = BARBER_OPTIONS.find((b) => b.id === appState.booking.barberId);
    if (!service || !barber || !appState.booking.dateISO || !appState.booking.time) return;

    const messageLines = [
      `Olá, *${SHOP_CONFIG.name}*! Gostaria de confirmar meu agendamento:`,
      '',
      `*Serviço:* ${service.name} (${service.duration} — ${formatCurrency(service.price)})`,
      `*Barbeiro:* ${barber.name}`,
      `*Data:* ${formatReadableDate(appState.booking.dateISO)}`,
      `*Horário:* ${appState.booking.time}`,
      '',
      `*Cliente:* ${name}`,
      `*Telefone:* ${phone}`,
    ];

    if (notes) {
      messageLines.push(`*Observações:* ${notes}`);
    }

    messageLines.push('', 'Aguardo a confirmação. Obrigado!');

    window.open(buildWhatsAppUrl(messageLines.join('\n')), '_blank', 'noopener,noreferrer');
    showToast('Agendamento preparado no WhatsApp!', null, null);
    closeBookingModal();
  }

  /* ==========================================================================
     10. LIGHTBOX DA GALERIA & TOASTS
     ========================================================================== */
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Foto da barbearia Carvão & Navalha';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    closeLightboxBtn?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function showToast(message, actionLabel, actionCallback) {
    const region = document.getElementById('toast-region');
    if (!region) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;

    if (actionLabel && typeof actionCallback === 'function') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'toast-action';
      btn.textContent = actionLabel;
      btn.addEventListener('click', () => {
        actionCallback();
        toast.remove();
      });
      toast.appendChild(btn);
    }

    region.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'opacity 200ms ease, transform 200ms ease';
      setTimeout(() => toast.remove(), 220);
    }, 3400);
  }

  /* ==========================================================================
     11. HEADER, MENU MOBILE, SCROLL SPY & REVEAL
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  function toggleMobileMenu() {
    const isOpen = mobileNav?.classList.toggle('is-open');
    mobileMenuToggle?.setAttribute('aria-expanded', String(Boolean(isOpen)));
    mobileNav?.setAttribute('aria-hidden', String(!isOpen));
  }

  function closeMobileMenu() {
    mobileNav?.classList.remove('is-open');
    mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    mobileNav?.setAttribute('aria-hidden', 'true');
  }

  function initScrollBehaviors() {
    const handleScroll = () => {
      siteHeader?.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Scroll Spy nos links do header
    const navLinks = Array.from(document.querySelectorAll('.main-nav .nav-link'));
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = `#${entry.target.id}`;
            navLinks.forEach((link) => {
              link.classList.toggle('is-active', link.getAttribute('href') === id);
            });
          });
        },
        { rootMargin: '-35% 0px -55% 0px' }
      );
      sections.forEach((sec) => spyObserver.observe(sec));
    }

    // Animação Reveal suave
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }

  /* ==========================================================================
     12. EVENT LISTENERS GLOBAIS & INICIALIZAÇÃO
     ========================================================================== */
  function bindEvents() {
    // Menu Mobile
    mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Abas de Filtro da Loja
    document.getElementById('product-filter-tabs')?.addEventListener('click', (event) => {
      const tab = event.target.closest('.filter-tab');
      if (!tab) return;

      const category = tab.getAttribute('data-category') || 'Todos';
      appState.activeCategory = category;

      document.querySelectorAll('.filter-tab').forEach((btn) => {
        const active = btn === tab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });

      renderProducts(category);
    });

    // Delegação global para botões dinâmicos (Serviços, Produtos, Equipe, Agendar)
    document.addEventListener('click', (event) => {
      const genericBookingBtn = event.target.closest('[data-open-booking]');
      if (genericBookingBtn) {
        openBookingModal();
        return;
      }

      const bookServiceBtn = event.target.closest('[data-book-service]');
      if (bookServiceBtn) {
        openBookingModal({ serviceId: bookServiceBtn.getAttribute('data-book-service') });
        return;
      }

      const bookBarberBtn = event.target.closest('[data-book-barber]');
      if (bookBarberBtn) {
        openBookingModal({ barberId: bookBarberBtn.getAttribute('data-book-barber') });
        return;
      }

      const addCartBtn = event.target.closest('[data-add-to-cart]');
      if (addCartBtn) {
        addToCart(addCartBtn.getAttribute('data-add-to-cart'), addCartBtn);
        return;
      }

      const bentoItem = event.target.closest('[data-lightbox-src]');
      if (bentoItem) {
        openLightbox(
          bentoItem.getAttribute('data-lightbox-src'),
          bentoItem.getAttribute('data-lightbox-caption')
        );
      }
    });

    // Carrinho Drawer
    openCartBtn?.addEventListener('click', openCartDrawer);
    closeCartBtn?.addEventListener('click', closeCartDrawer);
    checkoutWhatsAppBtn?.addEventListener('click', checkoutCartViaWhatsApp);
    clearCartBtn?.addEventListener('click', clearCart);

    cartDrawer?.addEventListener('click', (event) => {
      if (event.target === cartDrawer) {
        closeCartDrawer();
        return;
      }
      const incBtn = event.target.closest('[data-cart-inc]');
      if (incBtn) {
        updateCartItemQty(incBtn.getAttribute('data-cart-inc'), 1);
        return;
      }
      const decBtn = event.target.closest('[data-cart-dec]');
      if (decBtn) {
        updateCartItemQty(decBtn.getAttribute('data-cart-dec'), -1);
        return;
      }
      const remBtn = event.target.closest('[data-cart-remove]');
      if (remBtn) {
        removeCartItem(remBtn.getAttribute('data-cart-remove'));
      }
    });

    // Modal de Agendamento
    closeBookingBtn?.addEventListener('click', closeBookingModal);
    bookingModal?.addEventListener('click', (event) => {
      if (event.target === bookingModal) {
        closeBookingModal();
        return;
      }

      const gotoStepBtn = event.target.closest('[data-goto-step]');
      if (gotoStepBtn) {
        goToBookingStep(Number(gotoStepBtn.getAttribute('data-goto-step')));
        return;
      }

      const selectServiceBtn = event.target.closest('[data-select-service]');
      if (selectServiceBtn) {
        appState.booking.serviceId = selectServiceBtn.getAttribute('data-select-service');
        renderBookingStepContent();
        updateBookingStepUI();
        return;
      }

      const selectBarberBtn = event.target.closest('[data-select-barber]');
      if (selectBarberBtn) {
        appState.booking.barberId = selectBarberBtn.getAttribute('data-select-barber');
        renderBookingStepContent();
        updateBookingStepUI();
        return;
      }

      const selectDateBtn = event.target.closest('[data-select-date]');
      if (selectDateBtn) {
        appState.booking.dateISO = selectDateBtn.getAttribute('data-select-date');
        if (bookingDateError) bookingDateError.hidden = true;
        renderBookingDateAndTime();
        updateBookingStepUI();
        return;
      }

      const selectTimeBtn = event.target.closest('[data-select-time]');
      if (selectTimeBtn) {
        appState.booking.time = selectTimeBtn.getAttribute('data-select-time');
        renderBookingDateAndTime();
        updateBookingStepUI();
      }
    });

    // Input de data customizada (bloqueia domingos)
    bookingDateInput?.addEventListener('change', (event) => {
      const chosen = event.target.value;
      if (!chosen) return;

      const parsed = parseISODateLocal(chosen);
      if (parsed.getDay() === 0) {
        if (bookingDateError) {
          bookingDateError.textContent = 'Aos domingos estamos fechados. Escolha uma data entre segunda e sábado.';
          bookingDateError.hidden = false;
        }
        event.target.value = appState.booking.dateISO || '';
        return;
      }

      if (bookingDateError) bookingDateError.hidden = true;
      appState.booking.dateISO = chosen;
      appState.booking.time = null;
      renderBookingDateAndTime();
      updateBookingStepUI();
    });

    bookingPrevBtn?.addEventListener('click', () => goToBookingStep(appState.booking.step - 1));
    bookingNextBtn?.addEventListener('click', () => goToBookingStep(appState.booking.step + 1));
    bookingConfirmBtn?.addEventListener('click', confirmBookingViaWhatsApp);

    // Máscara de telefone brasileiro
    clientPhoneInput?.addEventListener('input', (event) => {
      event.target.value = formatPhoneBR(event.target.value);
    });

    // Lightbox
    closeLightboxBtn?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    // Fechar overlays com tecla ESC
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (lightbox?.classList.contains('is-open')) {
        closeLightbox();
      } else if (bookingModal?.classList.contains('is-open')) {
        closeBookingModal();
      } else if (cartDrawer?.classList.contains('is-open')) {
        closeCartDrawer();
      } else if (mobileNav?.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  function syncContactLinks() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const footerWa = document.getElementById('footer-whatsapp-link');
    if (footerWa) {
      footerWa.textContent = SHOP_CONFIG.whatsappDisplay;
      footerWa.href = buildWhatsAppUrl(
        `Olá, ${SHOP_CONFIG.name}! Gostaria de tirar uma dúvida.`
      );
    }

    const floatWa = document.getElementById('whatsapp-float');
    if (floatWa) {
      floatWa.href = buildWhatsAppUrl(
        `Olá, ${SHOP_CONFIG.name}! Vim pelo site e gostaria de mais informações.`
      );
    }
  }

  function init() {
    renderServices();
    renderProducts(appState.activeCategory);
    renderTeam();
    renderCart();
    syncContactLinks();
    bindEvents();
    initScrollBehaviors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
