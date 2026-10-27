// Shopping Cart State
let cart = [];

function addToCart(itemName, price) {
  const existing = cart.find(item => item.name === itemName);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: itemName, price: price, qty: 1 });
  }
  updateCartUI();
  toggleCartModal(true);
}

function removeFromCart(itemName) {
  cart = cart.filter(item => item.name !== itemName);
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById('cart-items-container');
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');
  
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  countEl.innerText = totalItems;
  totalEl.innerText = `R${totalPrice}`;
  
  if (cart.length === 0) {
    container.innerHTML = `<p style="font-size: 0.75rem; color: var(--color-text-muted); text-align: center; padding: 2rem 0; font-weight: 300;">Your bag is currently empty.</p>`;
    return;
  }
  
  container.innerHTML = cart.map(item => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-radius: 0.5rem; background-color: rgba(100, 41, 59, 1); border: 1px solid rgba(51, 65, 85, 1); font-size: 0.75rem;">
                    <div>
                        <h4 style="font-weight: 600; color: #fef08a;">${item.name}</h4>
                        <span style="color: var(--color-text-muted);">R${item.price} x ${item.qty}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span style="font-family: var(--font-serif); font-weight: 700; color: #fde047;">R${item.price * item.qty}</span>
                        <button onclick="removeFromCart('${item.name}')" style="background: none; border: none; color: #f43f5e; cursor: pointer;">
                            <i class="fa-solid fa-trash" style="font-size: 0.75rem;"></i>
                        </button>
                    </div>
                </div>
            `).join('');
}

function toggleCartModal(forceOpen = false) {
  const modal = document.getElementById('cart-modal');
  if (forceOpen) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.toggle('hidden');
  }
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert('Your shopping bag is empty!');
    return;
  }
  
  let message = "Hello Mystic Haven! I would like to order the following products:\n\n";
  cart.forEach(item => {
    message += `• ${item.name} (Qty: ${item.qty}) - R${item.price * item.qty}\n`;
  });
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  message += `\nTotal Amount: R${total} (Including SA Delivery)\n\nMR MT Marais\n2373636138\nSavings account\nCapitec bank\n\nPlease note if you do send the payment please make the description spiritual services`;
  
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/27840530859?text=${encoded}`, '_self');
}

// Tab Switching Functionality
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(`tab-${tabName}`).classList.remove('hidden');
  document.getElementById(`tab-btn-${tabName}`).classList.add('active');
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

// Calendar Service Change Handler
function updateCalendarView() {
  const select = document.getElementById('booking-service-select');
  const text = select.options[select.selectedIndex].text;
  document.getElementById('selected-service-title').innerText = text;
}

// Contact Form Submission Handler
function handleFormSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('form-success-msg');
  msg.style.display = 'block';
  document.getElementById('contact-form').reset();
  setTimeout(() => {
    msg.style.display = 'none';
  }, 6000);
}