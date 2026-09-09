document.addEventListener("DOMContentLoaded", () => {
    // Custom Cursor
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    const interactiveElements = document.querySelectorAll("a, button, .interactive");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // Toggle icon
            const icon = mobileBtn.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-times");
                } else {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // Initialize AOS for generic scroll animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // Preloader Animation
    const preloader = document.getElementById("preloader");
    if (preloader && typeof gsap !== 'undefined') {
        gsap.to(preloader, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.5,
            onComplete: () => {
                preloader.style.display = "none";
                // Trigger an event for page specific enter animations
                document.dispatchEvent(new Event("preloaderDone"));
            }
        });
    } else if (preloader) {
        setTimeout(() => {
            preloader.style.display = "none";
        }, 1000);
    }
});
