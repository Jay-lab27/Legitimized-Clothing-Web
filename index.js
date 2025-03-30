// Para sa phone toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.navbar');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Dropdown 
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a'); 

    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return; // 

       
        if (e.target === link || link.contains(e.target)) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
       
    });
});



// Pang close nang menu 
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});



