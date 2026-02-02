document.addEventListener("DOMContentLoaded", () => {
  // Loader Logic
  const loader = document.getElementById('loader');
  if (loader) {
      // Ensure the animation has time to play (min 2s) + load time
      const minLoadTime = 2000;
      const startTime = Date.now();

      window.addEventListener('load', () => {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadTime - elapsedTime);

          setTimeout(() => {
              loader.classList.add('hidden');
              // Enable scrolling or specific animations triggering here if needed
          }, remainingTime);
      });
  }

  // Custom Cursor Logic
  const cursor = document.querySelector(".cursor-glow");

  document.addEventListener("mousemove", (e) => {
    // Smooth follow
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Hover effects for cursor
  const hoverElements = document.querySelectorAll("a, button, .project-card");
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursor.style.background =
        "radial-gradient(circle, rgba(0, 240, 255, 0.15), transparent 70%)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.background =
        "radial-gradient(circle, rgba(112, 0, 255, 0.15), transparent 70%)";
    });
  });

  // Reveal Animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(
    ".reveal-text, .reveal-text-delay, .reveal-buttons, .section-title, .about-text, .project-card",
  );
  revealElements.forEach((el) => {
    // Add base classes if not already there, just in case
    // el.classList.add('reveal-pending'); // Could use this for JS-disabled fallback
    observer.observe(el);
  });

  // Stagger visuals
  const heroTexts = document.querySelectorAll(".hero-title span");
  heroTexts.forEach((text, index) => {
    text.style.transitionDelay = `${index * 0.2}s`;
  });

  // Hero Delay
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) heroSubtitle.style.transitionDelay = "0.6s";

  const heroButtons = document.querySelector(".hero-actions");
  if (heroButtons) heroButtons.style.transitionDelay = "0.8s";

  // Smooth Scroll for Anchor Links (Basic implementation provided by CSS, but JS can enhance)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });


  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  if (menuToggle) {
      menuToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          menuToggle.classList.toggle('open');
      });
  }

  // Close menu when clicking a link
  navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('open');
      });
  });

  // Magnetic Buttons
  const btns = document.querySelectorAll('.btn, .nav-links a');
  btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const deltaX = (x - centerX) * 0.3; // Intensity
          const deltaY = (y - centerY) * 0.3;
          
          btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0, 0)';
      });
  });

  // 3D Tilt for Project Cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -5; // Limit rotation deg
          const rotateY = ((x - centerX) / centerX) * 5;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
  });

  initParticles();
});

function initParticles() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
      this.color =
        Math.random() > 0.5 ? "rgba(112, 0, 255, " : "rgba(0, 240, 255, "; // Primary or Secondary
      this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ")";
      ctx.fill();
    }
  }

  // Performance: Reduced particle count
  const particleCount = window.innerWidth < 768 ? 30 : 60;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
