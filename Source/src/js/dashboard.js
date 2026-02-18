const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

const user = parseJwt(token);


if (user.role === "ADMIN") {
    document.getElementById("adminSection").style.display = "block";
}

loadUserBooks();

async function loadUserBooks() {
    const res = await fetch("http://localhost:8080/api/user/books", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();

    const readingList = document.getElementById("readingList");
    const favoriteList = document.getElementById("favoriteList");

    readingList.innerHTML = "";
    favoriteList.innerHTML = "";

    data.reading.forEach(book => {
        readingList.innerHTML += `
            <div class="book-item">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
            </div>
        `;
    });

    data.favorites.forEach(book => {
        favoriteList.innerHTML += `
            <div class="book-item">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
            </div>
        `;
    });
}



const addBookBtn = document.getElementById("addBookBtn");

if (addBookBtn) {
    addBookBtn.addEventListener("click", async () => {

        const title = document.getElementById("bookTitle").value;
        const author = document.getElementById("bookAuthor").value;
        const category = document.getElementById("bookCategory").value;

        await fetch("http://localhost:8080/api/admin/add-book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ title, author, category })
        });

        alert("Book added!");
        loadAllBooks();
    });
}



async function loadAllBooks() {

    const res = await fetch("http://localhost:8080/api/admin/books", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const books = await res.json();
    const list = document.getElementById("adminBookList");
    list.innerHTML = "";

    books.forEach(book => {
        list.innerHTML += `
            <div class="book-item">
                <h4>${book.title}</h4>
                <button onclick="deleteBook(${book.id})">Delete</button>
            </div>
        `;
    });
}

async function deleteBook(id) {
    await fetch(`http://localhost:8080/api/admin/delete-book/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    loadAllBooks();
}

if (user.role === "ADMIN") {
    loadAllBooks();
}



document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});
