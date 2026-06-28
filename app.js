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