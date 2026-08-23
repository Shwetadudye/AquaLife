document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart from LocalStorage
  let cart = JSON.parse(localStorage.getItem("aquaCart")) || [];

  // DOM Elements
  const cartCountEl = document.getElementById("cart-count");
  const cartIconBtn = document.getElementById("open-cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotalEl = document.getElementById("cart-total");
  const productList = document.getElementById("product-list");

  // Auth & Checkout DOM Elements
  const checkoutBtn = document.getElementById("checkout-btn");
  const authOverlay = document.getElementById("auth-overlay");
  const loginView = document.getElementById("login-view");
  const signupView = document.getElementById("signup-view");

  const checkoutOverlay = document.getElementById("checkout-overlay");
  const closeCheckoutBtn = document.getElementById("close-checkout-btn");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutSummaryList = document.getElementById("checkout-summary-list");
  const checkoutFinalTotal = document.getElementById("checkout-final-total");

  // 1.Cart Badge
  function updateCartCount() {
    if (cartCountEl) {
      cartCountEl.textContent = cart.length;
    }
    localStorage.setItem("aquaCart", JSON.stringify(cart));
  }
  updateCartCount();

  // 2. Show Success Notification
  function showToast(message) {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = message;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
    }
  }

  // 3. Listen for "Add to Cart" Clicks from Main Page
  if (productList) {
    productList.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const id = e.target.dataset.id;
        cart.push(id);
        updateCartCount();
        showToast("Item added to cart successfully!");
      }
    });
  }

  // 4. Open Cart Modal
  if (cartIconBtn) {
    cartIconBtn.addEventListener("click", () => {
      if (cartModal) {
        cartModal.style.display = "flex";
        renderCartItems();
      }
    });
  }

  // 5. Close Cart Modal
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      if (cartModal) cartModal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.style.display = "none";
    if (e.target === checkoutOverlay) checkoutOverlay.style.display = "none";
  });

  // 6. Render Grouped Items Inside the Cart
  function renderCartItems() {
    if (!cartItemsList) return;

    cartItemsList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsList.innerHTML =
        '<li style="color: #666;">Your cart is empty.</li>';
      if (cartTotalEl) cartTotalEl.textContent = "0.00";
      return;
    }

    const itemCounts = {};
    cart.forEach((id) => {
      itemCounts[id] = (itemCounts[id] || 0) + 1;
    });

    Object.keys(itemCounts).forEach((cartId) => {
      const quantity = itemCounts[cartId];
      const product = window.products.find((p) => p.id == cartId);

      if (product) {
        const itemTotal = product.price * quantity;
        total += itemTotal;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "10px 0";
        li.style.borderBottom = "1px solid #e0e0e0";
        li.style.color = "#333";

        li.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="display: flex; gap: 8px;">
                            <button class="remove-item-btn" data-id="${cartId}" aria-label="Remove one item" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 1.1rem; transition: transform 0.2s;">
                                <i class="fa-solid fa-circle-minus"></i>
                            </button>
                            <button class="add-item-btn" data-id="${cartId}" aria-label="Add one item" style="background: none; border: none; color: #28a745; cursor: pointer; font-size: 1.1rem; transition: transform 0.2s;">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                        </div>
                        <span>
                            ${product.name} 
                            <span style="background: #e0e0e0; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-left: 5px; font-weight: bold; color: #0A192F;">
                                x${quantity}
                            </span>
                        </span>
                    </div>
                    <strong>$${itemTotal.toFixed(2)}</strong>
                `;
        cartItemsList.appendChild(li);
      }
    });

    if (cartTotalEl) {
      cartTotalEl.textContent = total.toFixed(2);
    }
  }

  // 7. Listen for Both "Add" and "Remove" Clicks inside the Cart Modal
  if (cartItemsList) {
    cartItemsList.addEventListener("click", (e) => {
      const removeBtn = e.target.closest(".remove-item-btn");
      const addBtn = e.target.closest(".add-item-btn");

      // Logic for Subtracting
      if (removeBtn) {
        const idToRemove = removeBtn.dataset.id;
        const index = cart.indexOf(idToRemove);

        if (index > -1) {
          cart.splice(index, 1);
          updateCartCount();
          renderCartItems();
        }
      }

      // Logic for Adding
      if (addBtn) {
        const idToAdd = addBtn.dataset.id;
        cart.push(idToAdd);
        updateCartCount();
        renderCartItems();
      }
    });
  }

  // 8.Checkout Button Logic
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty! Add some items first.");
        return;
      }

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (isLoggedIn) {
        cartModal.style.display = "none";

        if (checkoutSummaryList && checkoutFinalTotal) {
          checkoutSummaryList.innerHTML = "";
          let finalTotal = 0;

          const itemCounts = {};
          cart.forEach((id) => (itemCounts[id] = (itemCounts[id] || 0) + 1));

          Object.keys(itemCounts).forEach((cartId) => {
            const quantity = itemCounts[cartId];
            const product = window.products.find((p) => p.id == cartId);

            if (product) {
              const itemTotal = product.price * quantity;
              finalTotal += itemTotal;

              const li = document.createElement("li");
              li.style.display = "flex";
              li.style.justifyContent = "space-between";
              li.style.marginBottom = "5px";
              li.style.color = "#555";
              li.innerHTML = `<span>${product.name} (x${quantity})</span> <strong>$${itemTotal.toFixed(2)}</strong>`;
              checkoutSummaryList.appendChild(li);
            }
          });

          checkoutFinalTotal.textContent = finalTotal.toFixed(2);
        }

        if (checkoutOverlay) checkoutOverlay.style.display = "flex";
      } else {
        alert("Please log in or create an account to proceed to checkout.");
        cartModal.style.display = "none";

        if (authOverlay && loginView && signupView) {
          authOverlay.style.display = "flex";
          loginView.style.display = "block";
          signupView.style.display = "none";
        }
      }
    });
  }

  // 9. Handle Checkout Drawer Close
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener("click", () => {
      if (checkoutOverlay) checkoutOverlay.style.display = "none";
    });
  }

  // 10. Handle Final Payment Submission
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const customerName = document.getElementById("checkout-name").value;

      alert(`Payment successful! Thank you for your order, ${customerName}.`);

      // Empty the cart, reset visuals, close drawer
      cart = [];
      updateCartCount();
      renderCartItems();
      checkoutForm.reset();
      if (checkoutOverlay) checkoutOverlay.style.display = "none";
    });
  }
});