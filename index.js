/* ============================================
   MP9 — Main JavaScript
   ============================================ */

// ---- PRODUCT DATA ----
const products = {
  1: {
    id: 1,
    name: "SUROOR",
    family: "Oriental Woody",
    notes: "INSPIRED BY CREED AVANTUS",
    price: 1999,
    original: 2400,
    discount: "16% OFF",
    description: "A fragrance of power, elegance, and timeless allure — leaving a regal impression with every step.",
    img: "./images/collection2.jpeg",
    imgClass: "p1"
  },
  2: {
    id: 2,
    name: "AURUM",
    family: "Floral Fresh",
    notes: "INSPIRED BY DIOR SAUVAGE",
    price: 2099,
    original: 2500,
    discount: "16% OFF",
    description: "a bold and fresh fragrance that captures raw masculinity with a powerful blend of citrus, spice, and woody notes.",
    img: "./images/WhatsApp Image 2026-04-15 at 2.12.37 PM.jpeg",
    imgClass: "p2"
  }
};

// ---- STATE ----
let currentProduct = null;
let currentQty = 1;
let orderData = {};

// ---- PAGES ----
const pages = {
  main: document.querySelector('.main-site'),
  productDetail: document.querySelector('.product-detail-page'),
  confirm: document.querySelector('.confirm-page')
};

function showPage(name) {
  Object.values(pages).forEach(p => { if (p) p.style.display = 'none'; });
  if (pages[name]) { pages[name].style.display = 'block'; }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    if (!name || !email) return;
    formSuccess.style.display = 'block';
    contactForm.reset();
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  });
}

// ---- GO TO PRODUCT DETAIL ----
function goToProduct(id) {
  currentProduct = products[id];
  currentQty = 1;
  renderProductDetail();
  showPage('productDetail');
}

function renderProductDetail() {
  const p = currentProduct;
  const page = pages.productDetail;

  page.innerHTML = `
    <nav class="navbar scrolled" style="position:fixed;">
      <div class="nav-inner">
        <a class="logo" href="#" onclick="goHome(); return false;">
          <div class="logo-icon"><img src="./images/logo.jpeg" width="40px"></div>
          <span class="logo-name">MUJTABAPHULLARWAN9</span>
        </a>
        <ul class="nav-links" id="detail-nav-links">
          <li><a href="#" onclick="goHome(); return false;" class="nav-link">Home</a></li>
          <li><a href="#" onclick="goToSection('about'); return false;" class="nav-link">About</a></li>
          <li><a href="#" onclick="goToSection('collection'); return false;" class="nav-link">Our Collection</a></li>
          <li><a href="#" onclick="goToSection('contact'); return false;" class="nav-link">Contact</a></li>
        </ul>
        <button class="hamburger" onclick="toggleDetailNav(this)" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="product-detail-inner">
      <div>
        <div class="detail-img" style="background-image:url('${p.img}')"></div>
      </div>
      <div class="detail-info">
        <button class="back-btn" onclick="goHome()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Collection
        </button>
        <span class="section-label">${p.family}</span>
        <h1 class="detail-name">${p.name}</h1>
        <p class="detail-notes">${p.notes}</p>
        <div class="detail-price-row">
          <span class="detail-price">RS${p.price}.00</span>
          <span class="detail-original">RS${p.original}.00</span>
          <span class="detail-save">${p.discount}</span>
        </div>
        <blockquote class="detail-desc">${p.description}</blockquote>
        <div class="detail-divider"></div>

        <h3 class="order-form-title">Place Your Order</h3>
        <div class="qty-row">
          <label>Quantity</label>
          <div class="qty-controls">
            <button class="qty-btn" id="qtyMinus" onclick="changeQty(-1)">−</button>
            <div class="qty-display" id="qtyDisplay">1</div>
            <button class="qty-btn" id="qtyPlus" onclick="changeQty(1)">+</button>
          </div>
        </div>

        <form id="orderForm">
          <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="oName" placeholder="e.g. Sarah Ahmed" required />
          </div>
          <div class="form-group">
            <label>Contact Number *</label>
            <input type="tel" id="oPhone" placeholder="e.g. +92 300 1234567" required />
          </div>
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="oEmail" placeholder="sarah@example.com" required />
          </div>
          <div class="form-group">
            <label>Delivery Address *</label>
            <textarea id="oAddress" placeholder="House/Street, City, Country" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <label>Special Instructions (optional)</label>
            <textarea id="oNotes" placeholder="Gift wrapping, special message, etc." rows="2"></textarea>
          </div>

          <div class="total-row">
            <span class="total-label">Order Total</span>
            <span class="total-value" id="totalDisplay">RS${p.price}.00</span>
          </div>

          <button type="submit" class="btn btn-gold" style="width:100%; margin-top:1.5rem; font-size:0.78rem; padding:1rem;">
            Buy Now — Proceed to Confirm
          </button>
        </form>
      </div>
    </div>
  `;

  // Order form submit
  document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('oName').value.trim();
    const phone = document.getElementById('oPhone').value.trim();
    const email = document.getElementById('oEmail').value.trim();
    const address = document.getElementById('oAddress').value.trim();
    const notes = document.getElementById('oNotes').value.trim();

    if (!name || !phone || !email || !address) return;

    orderData = {
      product: currentProduct.name,
      family: currentProduct.family,
      price: `RS${currentProduct.price}.00`,
      qty: currentQty,
      total: `RS${(currentProduct.price * currentQty).toFixed(2)}`,
      name, phone, email, address,
      notes: notes || "None"
    };
    renderConfirmPage();
    showPage('confirm');
  });
}

function toggleDetailNav(btn) {
  btn.classList.toggle('active');
  document.getElementById('detail-nav-links').classList.toggle('open');
}

function changeQty(delta) {
  currentQty = Math.max(1, Math.min(10, currentQty + delta));
  const display = document.getElementById('qtyDisplay');
  const total = document.getElementById('totalDisplay');
  if (display) display.textContent = currentQty;
  if (total) total.textContent = `RS${(currentProduct.price * currentQty).toFixed(2)}`;
}

// ---- CONFIRM PAGE ----
function renderConfirmPage() {
  const d = orderData;
  pages.confirm.innerHTML = `
    <nav class="navbar scrolled" style="position:fixed;">
      <div class="nav-inner">
        <a class="logo" href="#" onclick="goHome(); return false;">
          <div class="logo-icon"><img src="./images/logo.jpeg" width="40px"></div>
          <span class="logo-name">MUJTABAPHULLARWAN9</span>
        </a>
      </div>
    </nav>
    <div class="confirm-inner">
      <div class="confirm-card">
        <div class="confirm-icon"><img src="./images/logo.jpeg" width="40px" class="ronded"></div>
        <h2 class="confirm-title">Order Summary</h2>
        <p class="confirm-sub">Please review your order details before confirming via WhatsApp.</p>

        <div class="order-summary">
          <h4>Order Details</h4>
          <div class="order-row"><span class="key">Fragrance</span><span class="val">${d.product}</span></div>
          <div class="order-row"><span class="key">Collection</span><span class="val">${d.family}</span></div>
          <div class="order-row"><span class="key">Unit Price</span><span class="val">${d.price}</span></div>
          <div class="order-row"><span class="key">Quantity</span><span class="val">${d.qty}</span></div>
          <div class="order-row"><span class="key">Order Total</span><span class="val">${d.total}</span></div>
        </div>

        <div class="order-summary">
          <h4>Customer Details</h4>
          <div class="order-row"><span class="key">Name</span><span class="val">${d.name}</span></div>
          <div class="order-row"><span class="key">Phone</span><span class="val">${d.phone}</span></div>
          <div class="order-row"><span class="key">Email</span><span class="val">${d.email}</span></div>
          <div class="order-row"><span class="key">Address</span><span class="val">${d.address}</span></div>
          <div class="order-row"><span class="key">Notes</span><span class="val">${d.notes}</span></div>
        </div>

        <button class="whatsapp-btn" onclick="openWhatsApp()">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.552 4.103 1.516 5.83L.037 23.27a.75.75 0 0 0 .916.931l5.57-1.456A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.575-.502-5.059-1.374l-.361-.215-3.742.979.999-3.645-.235-.375A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Confirm Order on WhatsApp
        </button>
        <button class="btn btn-outline" style="width:100%; margin-top:0.5rem;" onclick="goHome()">
          Continue Shopping
        </button>
      </div>
    </div>
  `;
}

function openWhatsApp() {
  const d = orderData;
  const waNumber = "923001718949"; // Replace with your WhatsApp number (no + or spaces)
  const message =
    `🌟 *New Order —MP9 Luxury Parfums* 🌟\n\n` +
    `*📦 Order Details*\n` +
    `Fragrance: ${d.product}\n` +
    `Collection: ${d.family}\n` +
    `Unit Price: ${d.price}\n` +
    `Quantity: ${d.qty}\n` +
    `*Total: ${d.total}*\n\n` +
    `*👤 Customer Details*\n` +
    `Name: ${d.name}\n` +
    `Phone: ${d.phone}\n` +
    `Email: ${d.email}\n` +
    `Address: ${d.address}\n` +
    `Notes: ${d.notes}\n\n` +
    `Please confirm my order. Thank you! ✨`;

  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ---- NAVIGATION ----
function goHome() {
  showPage('main');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToSection(id) {
  showPage('main');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// ---- INIT ----
window.addEventListener('load', () => {
  showPage('main');
});

// Smooth parallax on hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero) {
    const scrolled = window.pageYOffset;
    hero.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
  }
});