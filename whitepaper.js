document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
  
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
    }
    if (closeSidebar) {
      closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('active');
      });
    }
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        sidebar.classList.remove('active');
      });
    });
  });
  