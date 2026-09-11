// Select all elements that have the 'fade-in' class
const faders = document.querySelectorAll('.fade-in');

// Settings for the observer
const appearOptions = {
  threshold: 0.15, 
  rootMargin: "0px 0px -50px 0px" 
};

// The Observer function
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return; // <-- Removed the stray 't' here!
    } else {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); 
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

/* =========================================
   Contact Form UI States
   ========================================= */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('success-message');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.style.cursor = 'not-allowed';

    try {
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Updated to match the exact route in your server.js
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Redirect the browser to your custom success page!
        window.location.href = '/success.html';
      } else {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      submitBtn.textContent = 'Error - Please Try Again';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const dropdownParents = document.querySelectorAll(".header__nav-item");

  dropdownParents.forEach(item => {
    const link = item.querySelector(".header__nav-link");
    const dropdown = item.querySelector(".dropdown");

    if (dropdown && link) {
      link.addEventListener("click", function (e) {
        // If we are on mobile screen width, prevent the link from navigating away on the first tap
        if (window.innerWidth <= 767) {
          e.preventDefault();
          // Toggle an 'active' class to show/hide the dropdown
          item.classList.toggle("active-mobile-dropdown");
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropButtons = document.querySelectorAll('.dropbtn');

  dropButtons.forEach(button => {
    button.addEventListener('click', function () {
      // 1. Find the <h3> that wraps this specific button
      const parentHeading = this.closest('h3');
      
      // 2. Find the dropdown content directly after this <h3>
      const dropdownContent = parentHeading.nextElementSibling;
      
      // 3. Toggle the visibility class
      dropdownContent.classList.toggle('show');
      
      // 4. Swap the + and - symbol
      if (dropdownContent.classList.contains('show')) {
        this.innerText = '-';
      } else {
        this.innerText = '+';
      }
    });
  });
});

// ==========================================
// INITIALIZE LENIS SMOOTH SCROLLING
// ==========================================
const lenis = new Lenis({
  duration: 1.8, // Controls the smoothness/speed
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

// Sync Lenis with the browser's native refresh rate
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);