const form = document.getElementById("registerForm");


form.addEventListener("submit", async function (e) {
    e.preventDefault();

    clearErrors();

    let isValid = true;


    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    
    if (firstName.value.trim().length < 2) {
        showError(firstName, "firstNameError", "First name must be at least 2 characters");
        isValid = false;
    }

   
    if (lastName.value.trim().length < 2) {
        showError(lastName, "lastNameError", "Last name must be at least 2 characters");
        isValid = false;
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        showError(email, "emailError", "Enter a valid email address");
        isValid = false;
    }

    
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(password.value)) {
        showError(
            password,
            "passwordError",
            "Password must be 8+ characters, include uppercase, lowercase and number"
        );
        isValid = false;
    }

    
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "confirmPasswordError", "Passwords do not match");
        isValid = false;
    }

    
    if (!isValid) return;

   
    const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("message").textContent = "Registration successful!";
            form.reset();
        } else {
            document.getElementById("message").textContent = data.message;
        }

    } catch (error) {
        document.getElementById("message").textContent = "Server error!";
    }
});



function showError(input, errorId, message) {
    input.classList.add("invalid");
    document.getElementById(errorId).textContent = message;
}


function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalid");
        input.classList.remove("valid");
    });
}
