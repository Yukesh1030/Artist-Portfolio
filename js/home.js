document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial load animation triggered from main.js when preloader is done
    document.addEventListener("preloaderDone", () => {
        const tl = gsap.timeline();
        
        // Hero Image Reveal
        tl.to(".hero-img", {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        })
        // Hero Image Slow Zoom
        .to(".hero-img", {
            scale: 1.1,
            duration: 10,
            ease: "none",
            repeat: -1,
            yoyo: true
        }, "-=1.5")
        // Title Reveal
        .fromTo(".hero-title", {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1.2");
    });

    // Horizontal Scroll for Skills Showcase
    // Only apply on desktop
    if (window.innerWidth > 768) {
        const skillsTrack = document.querySelector('.skills-track');
        if (skillsTrack) {
            const trackWidth = skillsTrack.scrollWidth - window.innerWidth;
            
            gsap.to(skillsTrack, {
                x: () => -trackWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: ".skills-wrapper",
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${trackWidth}`
                }
            });
        }
    }

    // Number Counter Animation for Achievements
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            }
        });
    });

    // Parallax for Studio Image
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        gsap.to(parallaxImg, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: "#studio-parallax",
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            }
        });
    }
});
