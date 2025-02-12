document.addEventListener('DOMContentLoaded', function() {
    /* --- Gestione Menu Overlay e Submenu --- */
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
  
    hamburger.addEventListener('click', function() {
      menuOverlay.classList.toggle('active');
    });
  
    document.querySelectorAll('.menu-overlay a').forEach(item => {
      item.addEventListener('click', function() {
        menuOverlay.classList.remove('active');
      });
    });
  
    document.querySelectorAll('.has-submenu > a').forEach(parentLink => {
      parentLink.addEventListener('click', function(e) {
        e.preventDefault();
        const parentLi = this.parentElement;
        const submenu = parentLi.querySelector('.submenu');
        submenu.classList.toggle('active');
        parentLi.classList.toggle('open');
      });
    });
  
    /* --- Smooth scroll per i link --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    /* --- Animazione contatori con numeri casuali nella prima sezione --- */
    const counters = document.querySelectorAll('.number');
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  
    /* --- News letter --- */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Grazie per esserti iscritto alla newsletter!');
        newsletterForm.reset();
      });
    }
  
    /* --- Gestione Web3 Wallet --- */
    const btnConnectWallet = document.getElementById('btnConnectWallet');
  
    function updateWalletUI(account) {
      if (account) {
        const abbreviated = account.substring(0, 6) + '...' + account.substring(account.length - 4);
        btnConnectWallet.innerText = abbreviated;
      } else {
        btnConnectWallet.innerText = '🌐 Connect Wallet';
      }
    }
  
    async function connectWallet() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          localStorage.setItem('connectedAccount', account);
          updateWalletUI(account);
        } catch (error) {
          console.error('Connessione wallet rifiutata:', error);
          alert('Connessione wallet rifiutata.');
        }
      } else {
        alert('Nessun wallet rilevato. Installa MetaMask o un wallet compatibile.');
      }
    }
  
    function disconnectWallet() {
      localStorage.removeItem('connectedAccount');
      updateWalletUI(null);
    }
  
    btnConnectWallet.addEventListener('click', function() {
      const connectedAccount = localStorage.getItem('connectedAccount');
      if (connectedAccount) {
        if (confirm('Vuoi disconnettere il wallet?')) {
          disconnectWallet();
        }
      } else {
        connectWallet();
      }
    });
  
    const storedAccount = localStorage.getItem('connectedAccount');
    if (storedAccount) {
      updateWalletUI(storedAccount);
    }
  
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function(accounts) {
        if (accounts.length > 0) {
          localStorage.setItem('connectedAccount', accounts[0]);
          updateWalletUI(accounts[0]);
        } else {
          disconnectWallet();
        }
      });
    }
  
    /* --- Scrollspy: evidenzia la voce attiva del menu --- */
    const menuLinks = document.querySelectorAll('.menu-items a');
    function updateActiveMenu() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      menuLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
          if (scrollPosition >= section.offsetTop - 100 &&
              scrollPosition < section.offsetTop + section.offsetHeight - 100) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    }
    window.addEventListener('scroll', updateActiveMenu);
  
    /* --- Fade-in della sezione Token quando entra in vista --- */
    const tokenSection = document.querySelector('.token-section');
    if (tokenSection) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tokenSection.classList.add('visible');
            observer.unobserve(tokenSection);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(tokenSection);
    }
  
    /* --- Fade-in della sezione Academy quando entra in vista --- */
    const academySection = document.querySelector('.academy');
    if (academySection) {
      const observerAcademy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            academySection.classList.add('visible');
            observerAcademy.unobserve(academySection);
          }
        });
      }, { threshold: 0.1 });
      observerAcademy.observe(academySection);
    }
  });
  