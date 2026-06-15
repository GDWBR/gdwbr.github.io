document.addEventListener('DOMContentLoaded', () => {
    
    // Parallax Effect on Scroll
    const bgLayer = document.getElementById('layer-bg');
    const smokeLayer = document.getElementById('layer-smoke');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Ajustando os multiplicadores para mudar a velocidade
        if (bgLayer) bgLayer.style.transform = `translateY(${scrolled * 0.5}px)`;
        if (smokeLayer) smokeLayer.style.transform = `translateY(${scrolled * 0.3}px)`;
    });

    // Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach(el => observer.observe(el));

    // Interactive Particles (Following Mouse)
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 100 // Raio de interação do mouse
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Movimentação natural da partícula (como fumaça/brasas)
            this.y -= this.directionY;
            this.x += this.directionX;
            
            // Reposicionar se sair da tela
            if (this.y < 0 - this.size) {
                this.y = canvas.height + this.size;
                this.x = Math.random() * canvas.width;
            }
            if (this.x > canvas.width + this.size || this.x < 0 - this.size) {
                this.x = Math.random() * canvas.width;
            }

            // Interação com o mouse
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
            
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.5;
            let x = Math.random() * innerWidth;
            let y = Math.random() * innerHeight;
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1.5) + 0.5;
            // Cores entre laranja e cinza para simular faíscas/fumaça
            let color = Math.random() > 0.5 ? 'rgba(232, 93, 4, 0.7)' : 'rgba(200, 200, 200, 0.3)';
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    initParticles();
    animateParticles();
});
