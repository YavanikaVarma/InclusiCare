/* auth.js - Authentication Logic for InclusiCare */

document.addEventListener('DOMContentLoaded', () => {

    // --- Loading State Helper ---
    function setLoading(button, isLoading, loadingText = 'Loading...') {
        if (isLoading) {
            // Save original text
            if (!button.dataset.originalText) {
                button.dataset.originalText = button.innerHTML;
            }
            // Add loading class, disable, and inject spinner
            button.classList.add('loading');
            button.disabled = true;
            button.innerHTML = `<span class="spinner"></span> ${loadingText}`;
        } else {
            // Restore original state
            button.classList.remove('loading');
            button.disabled = false;
            button.innerHTML = button.dataset.originalText;
        }
    }

    // --- Login Form ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            
            setLoading(submitBtn, true, 'Logging in...');

            // Simulate API request delay
            setTimeout(() => {
                setLoading(submitBtn, false);
                // Redirect to main app on success
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // --- Register Form ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            
            setLoading(submitBtn, true, 'Creating account...');

            // Simulate API request delay
            setTimeout(() => {
                setLoading(submitBtn, false);
                // Redirect to login or auto-login on success
                window.location.href = 'index.html';
            }, 1500);
        });
    }

});
