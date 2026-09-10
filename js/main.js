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

    // Flip Open Entry Animation for Images
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Exclude logos and backgrounds that should not be 3D flipped
        const flipImages = document.querySelectorAll('img:not(.navbar-brand img):not(.footer-brand img):not(.hero-img):not(.page-hero img):not(.parallax-img)');
        
        flipImages.forEach(img => {
            // Remove AOS to prevent animation conflicts on the same element
            if (img.hasAttribute('data-aos')) {
                img.removeAttribute('data-aos');
                img.classList.remove('aos-init', 'aos-animate');
            }

            gsap.fromTo(img, 
                {
                    rotationX: 90,
                    opacity: 0,
                    transformPerspective: 1000,
                    transformOrigin: "center center"
                },
                {
                    rotationX: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        onEnter: () => img.style.transition = 'none',
                        onLeaveBack: () => img.style.transition = '',
                        onComplete: () => img.style.transition = '',
                        onReverseComplete: () => img.style.transition = ''
                    }
                }
            );
        });
    }
});
