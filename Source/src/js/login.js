const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const passwordInput = document.getElementById("password");
const togglePass = document.getElementById("togglePass");



togglePass.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePass.textContent = "HIDE";
    } else {
        passwordInput.type = "password";
        togglePass.textContent = "SHOW";
    }
});



form.addEventListener("submit", async (e) => {
    e.preventDefault();

    message.textContent = "";

    const login = document.getElementById("login").value.trim();
    const password = passwordInput.value.trim();

    
    if (!login || !password) {
        message.textContent = "Please fill in all fields";
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, password })
        });

        const data = await res.json();

        if (!res.ok) {
            message.textContent = data.message || "Login failed";
            return;
        }

       
        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        message.textContent = "Login successful!";
        
        
        window.location.href = "index.html";

    } catch (error) {
        message.textContent = "Server error. Try again later.";
    }
});

