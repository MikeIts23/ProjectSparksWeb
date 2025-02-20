document.addEventListener('DOMContentLoaded', function() {
  // SEZIONE: COLLEGAMENTO HEADER (LOGIN & REGISTER)
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

  // SEZIONE: MENU OVERLAY E SUBMENU
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

  // SEZIONE: SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // SEZIONE: ANIMAZIONE CONTATORI
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

  // SEZIONE: GESTIONE NEWSLETTER
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    });
  }

  // SEZIONE: GESTIONE WEB3 WALLET
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
        console.error('Wallet connection rejected:', error);
        alert('Wallet connection rejected.');
      }
    } else {
      alert('No wallet detected. Please install MetaMask or a compatible wallet.');
    }
  }
  function disconnectWallet() {
    localStorage.removeItem('connectedAccount');
    updateWalletUI(null);
  }
  if (btnConnectWallet) {
    btnConnectWallet.addEventListener('click', function() {
      const connectedAccount = localStorage.getItem('connectedAccount');
      if (connectedAccount) {
        if (confirm('Disconnect wallet?')) {
          disconnectWallet();
        }
      } else {
        connectWallet();
      }
    });
  }
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

  // SEZIONE: GOOGLE SIGN-IN (simulated)
  const btnGoogle = document.querySelector('.btn-social.google');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', function() {
      alert("Google Sign-In functionality is not implemented yet.");
    });
  }

  // SEZIONE: SCROLLSPY
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

  // SEZIONE: FADE-IN PER LE SEZIONI (Token & Academy)
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

  // SEZIONE: TEAM SLIDER & MODAL
  const track = document.querySelector('.slider-track');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const teamMembers = document.querySelectorAll('.team-member');
  let currentIndex = 0;
  const memberWidth = teamMembers[0].offsetWidth + 40;
  const totalMembers = teamMembers.length;
  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalMembers - 1;
    }
    updateSlider();
  });
  rightArrow.addEventListener('click', () => {
    if (currentIndex < totalMembers - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  });
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * memberWidth}px)`;
  }
  const modal = document.getElementById('teamModal');
  const modalContent = document.getElementById('memberInfo');
  const closeModal = document.querySelector('.close');
  if (teamMembers.length && modal && modalContent) {
    teamMembers.forEach(member => {
      member.addEventListener('click', function() {
        const info = this.getAttribute('data-info') || "Information not available.";
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

  // SEZIONE: VISION CARDS (Toggle active)
  const visionCards = document.querySelectorAll('.vision-card');
  visionCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // SEZIONE: UPDATE COUNTER (In Circulation)
  const circulationEl = document.getElementById('circulation');
  if (circulationEl) {
    let currentCirculation = 0;
    const targetCirculation = 500000;
    function updateCirculation() {
      if (currentCirculation < targetCirculation) {
        currentCirculation += 100;
        if (currentCirculation > targetCirculation) {
          currentCirculation = targetCirculation;
        }
        circulationEl.innerText = currentCirculation.toLocaleString();
        setTimeout(updateCirculation, 50);
      }
    }
    updateCirculation();
  }

  // SEZIONE: CHATBOT
  const chatbotIcon = document.getElementById('chatbot-icon');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotBadge = document.getElementById('chatbot-badge');
  let unreadCount = 0;
  const faq = {
    "How does the project work?": "The project uses advanced technologies to connect the digital world with the real space.",
    "What are the costs?": "The costs vary depending on the services chosen. We offer flexible solutions for every need.",
    "Where can I find the whitepaper?": "The whitepaper is available on our website in the dedicated section."
  };
  function appendMessage(message, sender = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chatbot-message', sender);
    msgDiv.textContent = message;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  function processInput(input) {
    const lowerInput = input.toLowerCase();
    for (let question in faq) {
      if (lowerInput.includes(question)) {
        return faq[question];
      }
    }
    return "I'm sorry, try again.";
  }
  if (chatbotIcon) {
    chatbotIcon.addEventListener('click', function(){
      chatbotWindow.style.display = 'flex';
      chatbotIcon.style.display = 'none';
      if (unreadCount > 0) {
        unreadCount = 0;
        chatbotBadge.textContent = unreadCount;
        chatbotBadge.style.display = 'none';
      }
      if (chatbotMessages.innerHTML === '') {
        appendMessage("Hello, how can I help?");
      }
    });
  }
  if (chatbotClose) {
    chatbotClose.addEventListener('click', function(){
      chatbotWindow.style.display = 'none';
      chatbotIcon.style.display = 'flex';
    });
  }
  if (chatbotSend) {
    chatbotSend.addEventListener('click', function(){
      const userInput = chatbotInput.value.trim();
      if (userInput !== '') {
        appendMessage(userInput, 'user');
        const response = processInput(userInput);
        setTimeout(() => {
          appendMessage(response, 'bot');
          unreadCount++;
          chatbotBadge.textContent = unreadCount;
          chatbotBadge.style.display = 'block';
        }, 1000);
        chatbotInput.value = '';
      }
    });
  }
  if (chatbotInput) {
    chatbotInput.addEventListener('keypress', function(e){
      if (e.key === 'Enter') {
        chatbotSend.click();
      }
    });
  }
});
