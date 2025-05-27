// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  Navigation.init();
  Animations.init();
  Interactions.init();
  
  // Set the document title
  document.title = 'Local Delivery Revolution - Future of Hyperlocal Commerce';
  
  // Add page loaded class for animations
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 100);
});

// Handle visibility change for optimized animations
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    // Restart animations if needed
    Animations.restartBackgroundAnimations();
  }
});