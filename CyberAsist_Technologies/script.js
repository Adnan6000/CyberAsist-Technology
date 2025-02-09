// Particles.js Configuration
particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#00bcd4",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00bcd4",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });

// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

document.querySelectorAll("a, button, .service-card").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });
  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Highlight Active Section on Scroll
const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Smooth Scrolling for Navigation Links
navLinksAll.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });

    // Close mobile menu after clicking a link
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
gsap.from(".hero-content h1", {
  opacity: 0,
  y: -50,
  duration: 1,
  delay: 0.5,
});

gsap.from(".hero-content p", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 1,
});

gsap.from(".cta-button", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 1.5,
});

// Services Section Animations
gsap.from(".service-card", {
  opacity: 0,
  y: 50,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".services",
    start: "top 80%",
  },
});

// Testimonial Slider
const testimonialsSlider = document.querySelector(".testimonials-slider");
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let autoSlideInterval;

function showTestimonial(index) {
  // Update slider position
  testimonialsSlider.style.transform = `translateX(-${index * 100}%)`;

  // Update active testimonial
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle("active", i === index);
  });

  // Update active dot
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

// Auto Slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextTestimonial, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Initialize Slider
showTestimonial(currentIndex);
startAutoSlide();

// Dot Navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    showTestimonial(currentIndex);
    stopAutoSlide();
    startAutoSlide();
  });
});

// Pause Auto Slide on Hover
testimonialsSlider.addEventListener("mouseenter", stopAutoSlide);
testimonialsSlider.addEventListener("mouseleave", startAutoSlide);

// GSAP Animations for Contact Section
gsap.from(".contact h2", {
    opacity: 0,
    y: -50,
    duration: 1,
    scrollTrigger: {
      trigger: ".contact",
      start: "top 80%",
    },
  });
  
  gsap.from(".animated-form", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".contact",
      start: "top 80%",
    },
  });
  
  // Form Validation and Submission
  const contactForm = document.getElementById("contact-form");
  
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (name === "" || email === "" || message === "") {
      alert("Please fill out all fields.");
      return;
    }
  
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Simulate form submission
    alert("Thank you for your message! We'll get back to you soon.");
    contactForm.reset();
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
 // Newsletter Form Submission
const newsletterForm = document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = newsletterForm.querySelector("input").value.trim();

  if (email === "") {
    alert("Please enter your email address.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate newsletter subscription
  alert("Thank you for subscribing to our newsletter!");
  newsletterForm.reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
// Particles.js Background
particlesJS.load("particles-js", "particles.json", function () {
  console.log("Particles.js loaded!");
});

// GSAP Animations for Footer
gsap.from(".footer-section", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "footer",
      start: "top 80%",
    },
  });