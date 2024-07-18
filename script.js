document.addEventListener("DOMContentLoaded", function() {
    const message = "Welcome to New Centralia";
    const welcomeMessage = document.getElementById("welcome-message");
    const mainContent = document.getElementById("main-content");
    const sections = document.querySelectorAll("#main-content section");
    let index = 0;

    function typeMessage() {
        if (index < message.length) {
            welcomeMessage.innerHTML += message.charAt(index);
            index++;
            setTimeout(typeMessage, 100);
        }
    }

    welcomeMessage.addEventListener("click", function() {
        welcomeMessage.classList.add('burn');
        createFlames(welcomeMessage);
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.display = 'block';
            observeSections();
        }, 1500);
    });

    function createFlames(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < rect.width; i += 10) {
            const flame = document.createElement('div');
            flame.className = 'flame';
            flame.style.left = `${i}px`;
            flame.style.top = `${rect.height / 2}px`;
            element.appendChild(flame);

            setTimeout(() => {
                flame.remove();
            }, 500);
        }
    }

    function observeSections() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    if (index === 0) {
        typeMessage();
    }
});