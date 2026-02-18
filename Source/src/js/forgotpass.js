document.getElementById("recoverForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    try {

        const response = await fetch("http://localhost:8080/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
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

});

