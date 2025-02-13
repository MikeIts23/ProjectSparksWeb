document.addEventListener('DOMContentLoaded', function() {
  /* =====================================================
     SEZIONE: COLLEGAMENTO HEADER (LOGIN & REGISTER)
  ===================================================== */
  const btnLoginHeader = document.querySelector('.btn-login');
  if (btnLoginHeader) {
    btnLoginHeader.addEventListener('click', function() {
      window.location.href = "login.html";
    });
  }

  const btnRegisterHeader = document.querySelector('.btn-register');
  if (btnRegisterHeader) {
    btnRegisterHeader.addEventListener('click', function() {
      window.location.href = "register.html";
    });
  }

  /* =====================================================
     SEZIONE: MENU OVERLAY E SUBMENU
  ===================================================== */
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

  /* =====================================================
     SEZIONE: SMOOTH SCROLL
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* =====================================================
     SEZIONE: ANIMAZIONE CONTATORI
  ===================================================== */
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

  /* =====================================================
     SEZIONE: GESTIONE NEWSLETTER
  ===================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Grazie per esserti iscritto alla newsletter!');
      newsletterForm.reset();
    });
  }

  /* =====================================================
     SEZIONE: GESTIONE WEB3 WALLET
  ===================================================== */
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

  /* =====================================================
     SEZIONE: SCROLLSPY
  ===================================================== */
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

  /* =====================================================
     SEZIONE: FADE-IN PER LE SEZIONI (Token & Academy)
  ===================================================== */
  const tokenSection = document.querySelector('.token-section');
  if (tokenSection) {
    const observerToken = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tokenSection.classList.add('visible');
          observerToken.unobserve(tokenSection);
        }
      });
    }, { threshold: 0.1 });
    observerToken.observe(tokenSection);
  }

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

  /* =====================================================
     SEZIONE: TEAM SLIDER & MODAL
     (Assicurati che le frecce .left-arrow e .right-arrow
      siano FUORI dal track nel tuo HTML, in modo che
      non si spostino con le immagini.)
  ===================================================== */
  const track = document.querySelector('.slider-track');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const teamMembers = document.querySelectorAll('.team-member');

  let currentIndex = 0;
  // Calcola la larghezza di ogni card: 220px + 20px margin (a sinistra) + 20px margin (a destra) = 220 + 40
  const memberWidth = teamMembers[0].offsetWidth + 40;
  const totalMembers = teamMembers.length;

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalMembers - 1; // Loop all'ultimo membro
    }
    updateSlider();
  });

  rightArrow.addEventListener('click', () => {
    if (currentIndex < totalMembers - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop al primo membro
    }
    updateSlider();
  });

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * memberWidth}px)`;
  }

  // Gestione del modal (se presente) per info aggiuntive sul team
  const modal = document.getElementById('teamModal');
  const modalContent = document.getElementById('memberInfo');
  const closeModal = document.querySelector('.close');

  if (teamMembers.length && modal && modalContent) {
    teamMembers.forEach(member => {
      member.addEventListener('click', function() {
        const info = this.getAttribute('data-info') || "Informazioni non disponibili.";
        modalContent.innerText = info;
        modal.style.display = 'block';
      });
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', function(e) {
    if (modal && e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
