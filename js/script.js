document.addEventListener('DOMContentLoaded', () => {

    // --- THEME SWITCHER LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the saved theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Event listener for the toggle switch
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });


    // --- NAVBAR ACTIVE LINK ON SCROLL LOGIC ---
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.navbar__link');
    
    const options = {
        root: null, // it is the viewport
        rootMargin: '-50% 0px -50% 0px', // trigger when the section is in the middle of the screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

});

// --- SOLUTION BUTTONS LOGIC ---
    const solutionButtons = document.querySelectorAll('.solution-btn');

    solutionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const solutionContent = button.nextElementSibling;
            
            if (solutionContent && solutionContent.classList.contains('solution-content')) {
                solutionContent.classList.toggle('hidden');
                
                if (solutionContent.classList.contains('hidden')) {
                    button.textContent = 'Show Solution';
                } else {
                    button.textContent = 'Hide Solution';
                }
            }
        });
    });

    // --- DROPDOWN MENU LOGIC ---
    const dropdownToggle = document.querySelector('.dropdown__toggle');
    const dropdownMenu = document.querySelector('.dropdown__menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (event) => {
            // Stop the click from bubbling up to the window
            event.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
        });

        // Close dropdown if clicked outside
        window.addEventListener('click', (event) => {
            if (!dropdownMenu.classList.contains('hidden')) {
                dropdownMenu.classList.add('hidden');
            }
        });

        // Stop clicks inside the dropdown from closing it
        dropdownMenu.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }