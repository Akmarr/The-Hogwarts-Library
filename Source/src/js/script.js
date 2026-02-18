const themeBtn = document.getElementById('theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const bookCards = document.querySelectorAll('.book-card');


themeBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        themeBtn.textContent = '🌙 Dark Mode';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '☀️ Light Mode';
    }
});


filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        bookCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});