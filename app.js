// Select all elements that have the 'fade-in' class
const faders = document.querySelectorAll('.fade-in');

// Settings for the observer
const appearOptions = {
  threshold: 0.15, // Triggers when 15% of the element is visible
  rootMargin: "0px 0px -50px 0px" // Triggers slightly before the bottom of the screen
};

// The Observer function
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return; // Do nothing if it's not on screen yet
    } else {
      entry.target.classList.add('visible'); // Add the visible class to trigger CSS
      observer.unobserve(entry.target); // Stop observing once it has faded in
    }
  });
}, appearOptions);

// Apply the observer to each element
faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Stops the page from reloading

    // Gather the data from the inputs
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      service: document.getElementById('service').value
    };

    try {
      // Send the data to your Node server
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Message sent successfully! We will be in touch soon.');
        contactForm.reset(); // Clears the form fields
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Make sure the server is running!');
    }
  });
}