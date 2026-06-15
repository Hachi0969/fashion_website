/* C:\Users\Hachi\.gemini\antigravity\scratch\courrant-homepage\script.js */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- State Variables ---
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".indicator-dot");
    const slideIntervalTime = 6000; // 6 seconds for each slide
    let slideInterval;
    let cartCount = 0;
    
    // Dynamic Slide Content (Editorial text for each look)
    const editorialContent = [
        {
            subtitle: "COURRANT / EXCLUSIVE CAPSULE",
            title: "DENIM & LEATHER<br>AUTUMN WINTER 2026"
        },
        {
            subtitle: "COURRANT / EDITORIAL S02",
            title: "OFFICE DECONSTRUCTED<br>FALL COLLECTION"
        },
        {
            subtitle: "COURRANT / OBJECTS & BAGS",
            title: "SCULPTED SILHOUETTES<br>ACCESSORIES EDITION"
        }
    ];

    // --- Carousel Slider Logic ---
    const subtitleEl = document.getElementById("hero-subtitle-text");
    const titleEl = document.getElementById("hero-title-text");

    function goToSlide(index) {
        if (!slides.length) return;
        
        // Clear active classes
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        // Update index
        currentSlide = (index + slides.length) % slides.length;
        
        // Add active classes
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");

        // Animate out editorial text, change, and animate in
        subtitleEl.style.opacity = 0;
        titleEl.style.opacity = 0;
        
        setTimeout(() => {
            subtitleEl.innerHTML = editorialContent[currentSlide].subtitle;
            titleEl.innerHTML = editorialContent[currentSlide].title;
            subtitleEl.style.opacity = 1;
            titleEl.style.opacity = 1;
        }, 300);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startSlideShow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    // Attach click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToSlide(index);
            startSlideShow(); // Reset timer on manual navigation
        });
    });

    // Initialize carousel slideshow
    startSlideShow();

    // --- Header Scrolled State ---
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- Smooth Scroll Down Indicator ---
    const scrollArrow = document.getElementById("scroll-arrow");
    if (scrollArrow) {
        scrollArrow.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSection = document.querySelector("#editorial-section");
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }

    // --- Fullscreen Navigation Overlay ---
    const menuToggleBtn = document.getElementById("menu-toggle-btn");
    const menuCloseBtn = document.getElementById("menu-close-btn");
    const menuOverlay = document.getElementById("menu-overlay");
    const menuLinks = document.querySelectorAll(".menu-nav-link");

    function openMenu() {
        menuOverlay.classList.add("open");
        document.body.style.overflow = "hidden"; // Lock scroll when menu is open
    }

    function closeMenu() {
        menuOverlay.classList.remove("open");
        document.body.style.overflow = ""; // Restore scroll
    }

    menuToggleBtn.addEventListener("click", openMenu);
    menuCloseBtn.addEventListener("click", closeMenu);

    // Close menu when navigation link is clicked
    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const pageName = link.textContent;
            showToast(`Navigating to ${pageName}...`);
            closeMenu();
        });
    });

    // --- Fullscreen Search Overlay ---
    const searchBtn = document.getElementById("search-btn");
    const searchCloseBtn = document.getElementById("search-close-btn");
    const searchOverlay = document.getElementById("search-overlay");
    const searchInput = document.getElementById("search-input");

    function openSearch() {
        searchOverlay.classList.add("open");
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }

    function closeSearch() {
        searchOverlay.classList.remove("open");
        searchInput.value = "";
    }

    searchBtn.addEventListener("click", openSearch);
    searchCloseBtn.addEventListener("click", closeSearch);

    // Allow escape key to close overlays
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
            closeSearch();
        }
    });

    // Handle search submission
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && searchInput.value.trim() !== "") {
            const query = searchInput.value;
            closeSearch();
            showToast(`SEARCHING FOR: "${query}"`);
        }
    });

    // --- Newsletter Subscription Form ---
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector(".newsletter-input");
            showToast("THANK YOU FOR SUBSCRIBING TO COURRANT.");
            emailInput.value = "";
            emailInput.blur();
        });
    }

    // --- Shopping Cart Simulator ---
    const heroCtaBtn = document.getElementById("hero-cta-btn");
    const cartCountEl = document.getElementById("cart-count");
    const cartBtn = document.getElementById("cart-btn");

    function animateCartBadge() {
        cartCountEl.style.transform = "scale(1.4)";
        setTimeout(() => {
            cartCountEl.style.transform = "scale(1)";
        }, 300);
    }

    heroCtaBtn.addEventListener("click", () => {
        cartCount++;
        cartCountEl.textContent = cartCount;
        animateCartBadge();
        showToast("ITEM ADDED TO SHOPPING BAG.");
    });

    cartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showToast(`YOUR CART CONTAINS ${cartCount} ITEM(S).`);
    });

    // Catalog quick-add buttons
    const quickAddBtns = document.querySelectorAll(".quick-add-btn");
    quickAddBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const productName = btn.getAttribute("data-product");
            cartCount++;
            cartCountEl.textContent = cartCount;
            animateCartBadge();
            showToast(`${productName.toUpperCase()} ADDED TO BAG.`);
        });
    });

    // --- General Interactive Elements ---
    const collectionsLink = document.getElementById("collections-nav-link");
    const loginLink = document.getElementById("login-nav-link");
    const privacyLink = document.getElementById("privacy-link");
    const brandLogo = document.getElementById("brand-logo");
    const editorialLink = document.getElementById("editorial-link");

    collectionsLink.addEventListener("click", (e) => {
        e.preventDefault();
        openMenu();
    });

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("CUSTOMER PORTAL UNAVAILABLE (STATIC DEMO).");
    });

    privacyLink.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("PRIVACY POLICY ACCESSED.");
    });

    brandLogo.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        goToSlide(0);
        showToast("COURRANT HOMEPAGE RESET.");
    });

    if (editorialLink) {
        editorialLink.addEventListener("click", (e) => {
            e.preventDefault();
            showToast("OPENING AUTUMN WINTER 2026 LOOKBOOK...");
        });
    }

    // --- Global Custom Toast Notification ---
    const cartToast = document.getElementById("cart-toast");
    let toastTimeout;

    function showToast(message) {
        clearTimeout(toastTimeout);
        cartToast.textContent = message;
        cartToast.classList.add("show");
        toastTimeout = setTimeout(() => {
            cartToast.classList.remove("show");
        }, 3000);
    }
});
