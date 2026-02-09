document.addEventListener("DOMContentLoaded", () => {
  // --- 404 Glitch Simulation ---
  // Simulate if hash is #error or invalid path (if this was SPA router)
  if (window.location.hash === "#error") {
    const glitch = document.getElementById("glitch-overlay");
    if (glitch) glitch.classList.remove("hidden");
    setTimeout(() => {
      window.location.hash = "";
      location.reload();
    }, 3000);
    return;
  }

  // --- Premium Cyber Loader ---
  const loader = document.getElementById("loader");
  if (loader && loader.classList.contains("cyber-loader")) {
    const bar = loader.querySelector(".loader-bar-fill");
    const percent = loader.querySelector(".status-percent");

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress > 100) progress = 100;

      if (bar) bar.style.width = `${progress}%`;
      if (percent) percent.innerText = `${Math.floor(progress)}%`;

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add("hidden");
          // Trigger animations slightly earlier for smoother feel
          setTimeout(() => initAnimations(), 200);
        }, 400);
      }
    }, 50); // Speed
  } else {
    initAnimations();
  }

  // --- Dynamic Rotating Testimonials ---
  // Using static HTML for accessibility/SEO, simplified names.

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button");
      const status = contactForm.querySelector(".form-status");
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      const data = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          status.style.display = "block";
          status.style.color = "var(--primary)";
          status.textContent = "Message sent successfully!";
          contactForm.reset();
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        status.style.display = "block";
        status.style.color = "red";
        status.textContent = "Oops! There was a problem sending your form.";
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
        setTimeout(() => {
          status.style.display = "none";
        }, 5000);
      }
    });
  }

  // --- Cursor Follower ---
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    window.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;

      cursorOutline.animate(
        {
          left: `${x}px`,
          top: `${y}px`,
        },
        { duration: 400, fill: "forwards" },
      );

      document.body.style.setProperty("--mouse-x", `${x}px`);
      document.body.style.setProperty("--mouse-y", `${y}px`);
    });
  }

  // --- Scroll Progress ---
  const scrollBar = document.querySelector(".scroll-progress-bar");
  window.addEventListener("scroll", () => {
    if (scrollBar) {
      const scrollTotal =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollCurrent = window.scrollY;
      const scrollPercent = (scrollCurrent / scrollTotal) * 100;
      scrollBar.style.width = `${scrollPercent}%`;
    }
  });

  // --- Magnetic Buttons & Tilt ---
  // Simple custom implementation for performance
  const magneticEls = document.querySelectorAll(".btn, .nav-link");
  magneticEls.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });

  const tiltEls = document.querySelectorAll(
    ".project-card, .feature-item, .service-card, .stat-card",
  );
  tiltEls.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
      const rotateY = ((x - centerX) / centerX) * 5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  // --- Terminal & Stats ---
  initTerminal();
  fetchGitHubStats();
  initParticles();

  // --- Hero Typing Effect ---
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = ""; // Clear
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Typing speed
      } else {
        // Add cursor after typing
        heroTitle.innerHTML += '<span class="cursor-blink">|</span>';
      }
    }
    setTimeout(typeWriter, 500); // Start delay
  }

  // --- Navbar Active State ---
  const navbarLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    threshold: 0.3, // Trigger when 30% visible
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navbarLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });

        // Mobile Dock logic (existing)
        const dockItems = document.querySelectorAll(".dock-item");
        dockItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // --- Tech Stack Interaction ---
  const projectCards = document.querySelectorAll(".project-card");
  const techIcons = document.querySelectorAll(".tech-icon-wrapper");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const stats = card.querySelector(".project-stats");
      if (!stats) return;
      const techText = stats.innerText.toLowerCase(); // e.g. "php / js"

      techIcons.forEach((icon) => {
        const tooltip = icon.getAttribute("data-tooltip").toLowerCase();
        // Simple matching logic
        if (techText.includes("php") && tooltip.includes("php"))
          icon.classList.add("highlight");
        if (
          techText.includes("js") &&
          (tooltip.includes("node") ||
            tooltip.includes("react") ||
            tooltip.includes("vue"))
        )
          icon.classList.add("highlight");
        if (techText.includes("laravel") && tooltip.includes("laravel"))
          icon.classList.add("highlight");
        if (techText.includes("react") && tooltip.includes("react"))
          icon.classList.add("highlight");
        if (techText.includes("vue") && tooltip.includes("vue"))
          icon.classList.add("highlight");
      });
    });

    card.addEventListener("mouseleave", () => {
      techIcons.forEach((icon) => icon.classList.remove("highlight"));
    });
  });

  // --- Copy Email ---
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(emailLink.innerText);

      const original = emailLink.innerHTML;
      emailLink.innerHTML = "Copied!";
      emailLink.style.color = "var(--primary)";

      setTimeout(() => {
        emailLink.innerHTML = original;
        emailLink.style.color = "";
      }, 2000);
    });
  }

  // Navbar Scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Discord Copy
  const discordBtn = document.getElementById("discord-btn");
  if (discordBtn) {
    discordBtn.addEventListener("click", () => copyDiscord(discordBtn));
  }
});

function copyDiscord(btn) {
  navigator.clipboard.writeText("AlizHarb#4796");
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
  btn.style.borderColor = "var(--primary)";

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.borderColor = "";
  }, 2000);
}

function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".fade-in-up")
    .forEach((el) => observer.observe(el));
}

function initTerminal() {
  const input = document.getElementById("terminal-input");
  const body = document.getElementById("terminal-body");
  if (!input) return;

  // Hint Logic
  input.addEventListener("focus", () => {
    const hint = document.querySelector(".terminal-hint");
    if (hint) hint.style.opacity = "0";
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim().toLowerCase();
      if (!cmd) return;

      // Echo
      const echo = document.createElement("div");
      echo.className = "output-line";
      echo.innerHTML = `<span class="prompt">guest@alizharb:~$</span> ${cmd}`;
      body.insertBefore(echo, input.parentElement);

      // Response
      let responseHTML = "";
      switch (cmd) {
        case "help":
          responseHTML =
            "Available: <span class='output-success'>about, services, work, contact, social, matrix, clear</span>";
          break;
        case "about":
          responseHTML = "Scrolling to About...";
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "contact":
          responseHTML = "Opening channels...";
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "social":
          responseHTML = "GitHub: @alizharb | Discord: AlizHarb#4796";
          break;
        case "matrix":
          responseHTML = "Accessing Mainframe... (Type 'stop matrix' to exit)";
          initMatrixEffect();
          break;
        case "stop matrix":
          responseHTML = "Matrix simulation terminated.";
          initParticles(); // Revert to particles
          break;

        // --- Theme Switcher ---
        case "theme green":
          setTheme("green");
          responseHTML = "Theme set to: Matrix Green";
          break;
        case "theme blue":
          setTheme("blue");
          responseHTML = "Theme set to: Azure Blue";
          break;
        case "theme purple":
          setTheme("purple");
          responseHTML = "Theme set to: Cyberpunk Purple";
          break;
        case "theme red":
          setTheme("red");
          responseHTML = "Theme set to: Red Alert";
          break;
        case "theme yellow":
          setTheme("yellow");
          responseHTML = "Theme set to: High Voltage";
          break;

        case "services":
          responseHTML = "Listing services...";
          document
            .getElementById("services")
            ?.scrollIntoView({ behavior: "smooth" });
          break;

        case "cheat":
          responseHTML =
            "Commands: theme [green|blue|purple|red|yellow], matrix, stop matrix, clear, about, work";
          break;

        case "clear":
          // Remove all non-essential lines (keep Welcome)
          Array.from(body.children).forEach((child) => {
            if (
              child.classList.contains("output-line") &&
              !child.innerHTML.includes("Welcome")
            ) {
              child.remove();
            }
          });
          const welcome = document.querySelector(".terminal-welcome");
          if (welcome) welcome.scrollIntoView();
          input.value = "";
          return;

        default:
          if (cmd.startsWith("theme")) {
            responseHTML = "Usage: theme [green|blue|purple|red|yellow]";
          } else {
            responseHTML = `<span style="color:var(--accent)">Command not found: ${cmd}</span>`;
          }
      }

      if (responseHTML) {
        const res = document.createElement("div");
        res.className = "output-line";
        res.innerHTML = responseHTML;
        body.insertBefore(res, input.parentElement);
      }

      input.value = "";
      body.scrollTop = body.scrollHeight;
    }
  });

  document
    .querySelector(".terminal-window")
    .addEventListener("click", () => input.focus());

  // --- Smart Boot Sequence ---
  const terminalWindow = document.querySelector(".terminal-window");
  let bootHasRun = false;

  if (terminalWindow) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !bootHasRun) {
            bootHasRun = true;
            const input = document.getElementById("terminal-input");
            if (input) {
              // Type out welcome message typing effect
              input.placeholder = "System Ready...";
              setTimeout(() => (input.placeholder = ""), 2000);
            }
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(terminalWindow);
  }
}

function setTheme(colorName) {
  const root = document.documentElement;
  /* OKLCH Palette */
  const colorMap = {
    // Default Cyan
    default: "oklch(72% 0.16 200)",
    // Matrix Green
    green: "oklch(86% 0.29 144)",
    // Neon Blue
    blue: "oklch(80% 0.18 230)",
    // Cyber Purple
    purple: "oklch(65% 0.25 300)",
    // Neon Red
    red: "oklch(65% 0.25 30)",
    // Neon Yellow
    yellow: "oklch(90% 0.2 100)",
  };

  const newPrimary = colorMap[colorName];
  if (newPrimary) {
    root.style.setProperty("--primary", newPrimary);
    // Use color-mix for dynamic transparency support with any color format
    root.style.setProperty(
      "--glass-border",
      `color-mix(in srgb, ${newPrimary}, transparent 70%)`,
    );

    // Update logo dot color to match theme
    const logoDot = document.querySelector(".logo-dot");
    if (logoDot) logoDot.style.color = newPrimary;
  }
}

async function fetchGitHubStats() {
  try {
    const username = "alizharb";
    // Using cached data if available to avoid rate limits
    const cached = localStorage.getItem("gh_stats");
    let stats = null;

    if (cached) {
      const c = JSON.parse(cached);
      if (Date.now() - c.ts < 3600000) stats = c.data;
    }

    if (!stats) {
      const [uRes, rRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
      ]);

      if (!uRes.ok || !rRes.ok) throw new Error("API Error");

      const uData = await uRes.json();
      const rData = await rRes.json();

      const stars = rData.reduce((a, b) => a + (b.stargazers_count || 0), 0);
      stats = { repos: uData.public_repos, stars };

      localStorage.setItem(
        "gh_stats",
        JSON.stringify({ data: stats, ts: Date.now() }),
      );
    }

    // DOM Updates
    const repoCount = document.getElementById("stat-repos");
    const starCount = document.getElementById("stat-stars");

    if (repoCount) repoCount.innerText = stats.repos;
    if (starCount) starCount.innerText = stats.stars;
  } catch (e) {
    console.warn("GitHub Stats specific error:", e);
  }
}

// Global variable to track active effect
let currentEffect = "particles";
let animationFrameId;

function initParticles() {
  currentEffect = "particles";
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Cancel any existing animation frame
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  let w,
    h,
    particles = [];

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  // Create
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2,
    });
  }

  const animate = () => {
    if (currentEffect !== "particles") return; // Stop if mode changed

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.strokeStyle = "rgba(255,255,255,0.05)";

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        if (dx * dx + dy * dy < 15000) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });
    animationFrameId = requestAnimationFrame(animate);
  };
  animate();
}

function initMatrixEffect() {
  currentEffect = "matrix";
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  // Add resize listener for Matrix too
  const resizeMatrix = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeMatrix);

  let cols = Math.floor(w / 20);
  let ypos = Array(cols).fill(0);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  const animateMatrix = () => {
    if (currentEffect !== "matrix") {
      window.removeEventListener("resize", resizeMatrix);
      return;
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, w, h);

    // Dynamic Color
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();
    ctx.fillStyle = color || "#0f0";
    ctx.font = "15pt monospace";

    ypos.forEach((y, i) => {
      const text = String.fromCharCode(Math.random() * 128);
      const x = i * 20;
      ctx.fillText(text, x, y);

      if (y > h + Math.random() * 10000) ypos[i] = 0;
      else ypos[i] = y + 20;
    });

    animationFrameId = requestAnimationFrame(animateMatrix);
  };
  animateMatrix();
}
