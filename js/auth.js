document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor logic since main.js isn't fully loaded here or conflicts might occur
    const cursor = document.querySelector(".custom-cursor");
    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
        
        const interactiveElements = document.querySelectorAll("a, button, input, select");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
        });
    }

    // GSAP Entrance Animations
    gsap.from("#auth-back", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
    });

    gsap.from("#auth-card", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
    });

    // Reset Errors helper
    function resetErrors(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        form.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');
        form.querySelectorAll('.form-control').forEach(el => el.style.borderColor = 'rgba(245, 241, 232, 0.2)');
    }

    // Login Validation & Redirection
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Password Toggle
        const toggleBtn = document.getElementById('togglePassword');
        const passInput = document.getElementById('loginPassword');
        if (toggleBtn && passInput) {
            toggleBtn.addEventListener('click', () => {
                const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passInput.setAttribute('type', type);
                toggleBtn.classList.toggle('fa-eye');
                toggleBtn.classList.toggle('fa-eye-slash');
            });
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            resetErrors('loginForm');
            
            let isValid = true;
            const role = document.getElementById('loginRole').value;
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email.value)) {
                document.getElementById('loginEmailError').style.display = 'block';
                email.style.borderColor = 'var(--accent-color)';
                isValid = false;
            }

            if(password.value.trim() === '') {
                document.getElementById('loginPasswordError').style.display = 'block';
                password.style.borderColor = 'var(--accent-color)';
                isValid = false;
            }

            if(isValid) {
                const username = email.value.split('@')[0];
                const displayName = username.charAt(0).toUpperCase() + username.slice(1);
                localStorage.setItem('currentUser', displayName);

                // Redirect based on Role
                if (role === 'Admin') {
                    window.location.href = 'AdminDashboard.html';
                } else {
                    window.location.href = 'ClientDashboard.html';
                }
            }
        });
    }

    // Signup Validation & Redirection
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        // Password Toggle
        const toggleBtn = document.getElementById('toggleSignupPassword');
        const passInput = document.getElementById('signupPassword');
        if (toggleBtn && passInput) {
            toggleBtn.addEventListener('click', () => {
                const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passInput.setAttribute('type', type);
                toggleBtn.classList.toggle('fa-eye');
                toggleBtn.classList.toggle('fa-eye-slash');
            });
        }

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            resetErrors('signupForm');
            
            let isValid = true;
            const name = document.getElementById('signupName');
            const email = document.getElementById('signupEmail');
            const password = document.getElementById('signupPassword');

            if(name.value.trim() === '') {
                document.getElementById('signupNameError').style.display = 'block';
                name.style.borderColor = 'var(--accent-color)';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email.value)) {
                document.getElementById('signupEmailError').style.display = 'block';
                email.style.borderColor = 'var(--accent-color)';
                isValid = false;
            }

            if(password.value.length < 6) {
                document.getElementById('signupPasswordError').style.display = 'block';
                password.style.borderColor = 'var(--accent-color)';
                isValid = false;
            }

            if(isValid) {
                // After signup, redirect to Login page
                window.location.href = 'Login.html';
            }
        });
    }
});
