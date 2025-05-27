// Navigation functionality
const Navigation = {
  activeSection: null,
  sections: [],
  navLinks: [],
  scrolling: false,
  
  init() {
    // Get all sections and navigation links
    this.sections = Array.from(document.querySelectorAll('.content-section'));
    this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
    
    // Set up smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleNavClick.bind(this));
    });
    
    // Set up scroll event for highlighting active section
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Initialize progress bar
    this.initProgressBar();
    
    // Initialize active section
    this.checkActiveSection();
    
    // Set up scroll to top button
    this.initScrollToTop();
  },
  
  handleNavClick(e) {
    e.preventDefault();
    
    // Get the target section
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      this.scrolling = true;
      
      // Update active class
      this.updateActiveLink(targetId.substring(1));
      
      // Smooth scroll to target section
      window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: 'smooth'
      });
      
      // Reset scrolling flag after animation
      setTimeout(() => {
        this.scrolling = false;
      }, 1000);
    }
  },
  
  handleScroll() {
    // Update progress bar
    this.updateProgressBar();
    
    // Don't update active section during programmatic scrolling
    if (this.scrolling) return;
    
    // Check which section is currently in view
    this.checkActiveSection();
    
    // Show/hide scroll to top button
    this.updateScrollTopButton();
  },
  
  checkActiveSection() {
    // Get current scroll position
    const scrollPosition = window.scrollY + 300;
    
    // Find the current section in view
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = this.sections[i];
      
      if (scrollPosition >= section.offsetTop) {
        const sectionId = section.getAttribute('id');
        
        if (this.activeSection !== sectionId) {
          this.activeSection = sectionId;
          this.updateActiveLink(sectionId);
        }
        
        break;
      }
    }
  },
  
  updateActiveLink(sectionId) {
    // Remove active class from all links
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current link
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  },
  
  initProgressBar() {
    // Initialize progress bar
    this.progressBar = document.getElementById('progressBar');
  },
  
  updateProgressBar() {
    // Calculate scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Update progress bar width
    if (this.progressBar) {
      this.progressBar.style.width = scrolled + '%';
    }
  },
  
  initScrollToTop() {
    // Get scroll to top button
    this.scrollTopBtn = document.getElementById('scrollTop');
    
    // Add click event listener
    if (this.scrollTopBtn) {
      this.scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Initial visibility check
    this.updateScrollTopButton();
  },
  
  updateScrollTopButton() {
    // Show button when user scrolls down
    if (this.scrollTopBtn) {
      if (window.pageYOffset > 400) {
        this.scrollTopBtn.classList.add('visible');
      } else {
        this.scrollTopBtn.classList.remove('visible');
      }
    }
  }
};