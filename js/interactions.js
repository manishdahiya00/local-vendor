// User interaction functionality
const Interactions = {
  init() {
    // Initialize interactions
    this.initHoverEffects();
    this.initHighlightEffects();
    this.initMobileNav();
  },
  
  initHoverEffects() {
    // Add custom interaction effects to elements
    this.setupListItemInteractions();
    this.setupNavigationItemEffects();
  },
  
  setupListItemInteractions() {
    // Enhanced interactions for list items
    document.querySelectorAll('.feature-list li').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        // Subtle tilt effect
        this.applyTiltEffect(item);
      });
      
      item.addEventListener('click', () => {
        // Visual feedback on click
        item.style.transform = 'translateX(15px) scale(1.03)';
        item.style.background = 'rgba(255, 107, 107, 0.2)';
        
        setTimeout(() => {
          item.style.transform = '';
          item.style.background = '';
        }, 400);
      });
    });
  },
  
  setupNavigationItemEffects() {
    // Enhanced navigation item effects
    document.querySelectorAll('.nav-item').forEach((item) => {
      const sectionId = item.getAttribute('data-section');
      
      item.addEventListener('mouseenter', () => {
        // Highlight corresponding section
        if (sectionId) {
          const section = document.getElementById(sectionId);
          if (section) {
            section.classList.add('highlight-target');
          }
        }
      });
      
      item.addEventListener('mouseleave', () => {
        // Remove highlight
        if (sectionId) {
          const section = document.getElementById(sectionId);
          if (section) {
            section.classList.remove('highlight-target');
          }
        }
      });
    });
  },
  
  applyTiltEffect(element) {
    // Reset previous transforms
    element.style.transform = '';
    
    // Apply tilt effect based on mouse position
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 20;
      const tiltY = -(x - centerX) / 20;
      
      element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });
    
    // Reset on mouse leave
    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  },
  
  initHighlightEffects() {
    // Add shimmer effect to important elements
    const highlights = document.querySelectorAll('.highlight-box, .tier.highlight');
    
    highlights.forEach(element => {
      // Create shimmer overlay
      const shimmer = document.createElement('div');
      shimmer.classList.add('shimmer');
      shimmer.style.position = 'absolute';
      shimmer.style.inset = '0';
      shimmer.style.pointerEvents = 'none';
      
      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(shimmer);
    });
  },
  
  initMobileNav() {
    // Handle mobile navigation toggle
    const navHeader = document.querySelector('.nav-header');
    const navWrapper = document.querySelector('.nav-wrapper');
    
    if (navHeader && navWrapper) {
      // Toggle navigation on mobile
      navHeader.addEventListener('click', () => {
        navWrapper.classList.toggle('open');
        
        // If mobile view, control the transform
        if (window.innerWidth <= 768) {
          if (navWrapper.classList.contains('open')) {
            navWrapper.style.transform = 'translateY(0)';
          } else {
            navWrapper.style.transform = 'translateY(calc(100% - 3rem))';
          }
        }
      });
      
      // Close navigation when clicking a link on mobile
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navWrapper.classList.remove('open');
            navWrapper.style.transform = 'translateY(calc(100% - 3rem))';
          }
        });
      });
    }
  }
};