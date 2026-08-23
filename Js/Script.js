window.products = [
  {
    id: 1,
    name: "Premium Betta Fish",
    price: 25.0,
    category: "fish",
    img: "https://images.unsplash.com/photo-1495594059084-33752639b9c3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
  {
    id: 2,
    name: "Fantail Goldfish",
    price: 15.0,
    category: "fish",
    img: "https://media.istockphoto.com/id/531020735/photo/aquarium-native-gold-fish.jpg?s=612x612&w=0&k=20&c=xlTCgjaOffc4Ra_sQxjXB5zak2bs_UjThKjg3zV7C4Q=",
    rating: 4,
  },
  {
    id: 3,
    name: "Platinum Butterfly Koi",
    price: 120.0,
    category: "fish",
    img: "https://i.pinimg.com/1200x/41/35/47/4135476a3e426d699761a1419016aba2.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Symphysodon Discus",
    price: 85.0,
    category: "fish",
    img: "https://i.pinimg.com/1200x/f7/43/71/f743710e49d04d0cfe78cf57c3909172.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "Purple Tang (Marine)",
    price: 65.0,
    category: "fish",
    img: "https://i.pinimg.com/736x/28/ad/ce/28adced75b0f6e1368e36ba110b5b5c4.jpg",
    rating: 5,
  },
  {
    id: 6,
    name: "Rimless Planted Tank",
    price: 85.0,
    category: "tanks",
    img: "https://i.pinimg.com/1200x/19/06/86/190686c3cd719c95741aaf4ba3bcbab7.jpg",
    rating: 5,
  },
  {
    id: 7,
    name: "Live Coral Frag",
    price: 22.0,
    category: "tanks",
    img: "https://i.pinimg.com/1200x/55/e1/a2/55e1a290c77acb307e82db3782806d20.jpg",
    rating: 4,
  },
  {
    id: 8,
    name: "Aquarium Starter Kit",
    price: 45.0,
    category: "tanks",
    img: "https://m.media-amazon.com/images/I/81aTC1IV+6L.jpg",
    rating: 4,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Render Products ---
  const productList = document.getElementById("product-list");

  function renderProducts(filter = "all") {
    if (!productList) return;
    productList.innerHTML = "";
    const filtered =
      filter === "all"
        ? window.products
        : window.products.filter((p) => p.category === filter);

    filtered.forEach((product) => {
      const stars = Array(product.rating)
        .fill('<i class="fa-solid fa-star"></i>')
        .join("");
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
                <img src="${product.img}" alt="${product.name}" loading="lazy">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="stars">${stars}</div>
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
      productList.appendChild(card);
    });
  }
  renderProducts();

  // --- 2. Filter Functionality ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      renderProducts(e.target.dataset.filter);
    });
  });

  // --- 3. Mobile Menu Toggle ---
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () =>
      navLinks.classList.toggle("active"),
    );
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // --- 4. Sticky Navbar & Back to Top ---
  const header = document.getElementById("navbar");
  const backToTopBtn = document.getElementById("back-to-top");

  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(() => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
        if (backToTopBtn) backToTopBtn.style.display = "flex";
      } else {
        header.classList.remove("scrolled");
        if (backToTopBtn) backToTopBtn.style.display = "none";
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  // --- 5. Scroll Animations ---
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

  // --- 6. Countdown Timer ---
  const daysEl = document.getElementById("days");
  if (daysEl) {
    const targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timerInterval);
        return;
      }
      daysEl.innerText = String(
        Math.floor(distance / (1000 * 60 * 60 * 24)),
      ).padStart(2, "0");
      document.getElementById("hours").innerText = String(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      ).padStart(2, "0");
      document.getElementById("minutes").innerText = String(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      ).padStart(2, "0");
      document.getElementById("seconds").innerText = String(
        Math.floor((distance % (1000 * 60)) / 1000),
      ).padStart(2, "0");
    }, 1000);
  }

  // --- 7. Modals (Video & Lightbox) ---
  const videoModal = document.getElementById("video-modal");
  const playBtn = document.getElementById("play-video");
  const iframe = document.getElementById("youtube-frame");
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      videoModal.style.display = "flex";
      iframe.src = "https://www.youtube.com/embed/6lZ3CookYNg?autoplay=1";
    });
  }

  document.querySelectorAll(".gallery-img").forEach((img) => {
    img.addEventListener("click", (e) => {
      lightbox.style.display = "flex";
      lightboxImg.src = e.target.src;
    });
  });

  const closeVideoBtn = document.getElementById("close-video");
  if (closeVideoBtn)
    closeVideoBtn.addEventListener("click", () => {
      videoModal.style.display = "none";
      iframe.src = "";
    });

  const closeLightboxBtn = document.getElementById("close-lightbox-btn");
  if (closeLightboxBtn)
    closeLightboxBtn.addEventListener(
      "click",
      () => (lightbox.style.display = "none"),
    );

  window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.style.display = "none";
      iframe.src = "";
    }
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  // --- 8. Newsletter Validation ---
  const form = document.getElementById("newsletter-form");
  if (form) {
    const emailInput = document.getElementById("email-input");
    const msgDiv = document.getElementById("form-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailPattern.test(email)) {
        msgDiv.textContent = "Thank you for subscribing!";
        msgDiv.className = "success-msg";
        form.reset();
      } else {
        msgDiv.textContent = "Please enter a valid email address.";
        msgDiv.className = "error-msg";
      }
    });
  }
  // --- Activate "Read More" Blog Buttons ---
  const blogModal = document.getElementById("blog-modal");
  const closeBlogBtn = document.getElementById("close-blog-btn");
  const readMoreBtns = document.querySelectorAll(".read-more");

  const modalImg = document.getElementById("blog-modal-img");
  const modalTitle = document.getElementById("blog-modal-title");
  const modalDate = document.getElementById("blog-modal-date");

  // 1. Listen for clicks on any "Read More" button
  if (readMoreBtns.length > 0) {
    readMoreBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Find the specific blog card we just clicked inside of
        const article = e.target.closest(".blog-card");

        const imgSrc = article.querySelector("img").src;
        const title = article.querySelector("h3").innerText;
        const date = article.querySelector("small").innerText;

        modalImg.src = imgSrc;
        modalTitle.innerText = title;
        modalDate.innerText = date;

        blogModal.style.display = "flex";
      });
    });
  }

  if (closeBlogBtn) {
    closeBlogBtn.addEventListener("click", () => {
      blogModal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === blogModal) {
      blogModal.style.display = "none";
    }
  });
});