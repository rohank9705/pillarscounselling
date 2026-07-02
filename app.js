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
const contactForm = document.getElementById('contact-form');
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
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        successMessage.classList.add('fade-in', 'visible');
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

