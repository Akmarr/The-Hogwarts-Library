async function resetPassword(){

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    const newPassword = document.getElementById("newPassword").value;
    const message = document.getElementById("message");

    try {

        const response = await fetch("http://localhost:8080/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                password: newPassword
            })
        });

        const data = await response.text();

        if(response.ok){
            message.style.color = "lightgreen";
            message.textContent = data;
        } else {
            message.style.color = "red";
            message.textContent = data;
        }

    } catch(error) {
        message.style.color = "red";
        message.textContent = "Server error";
    }
}
