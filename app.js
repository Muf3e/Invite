/**
 * ROYAL LAVENDER & GOLD WEDDING INVITATION
 * Mustafa & Tasneem — Interactive Web Application
 */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingParticles();
  initEnvelopeExperience();
  initAudioPlayer();
  initScratchCard();
  initCountdownTimer();
  initCalendarAction();
  initRsvpAndGuestbook();
  initBackToTop();
});

/* ==========================================================================
   1. FLOATING LAVENDER PETALS & GOLD DUST PARTICLES
   ========================================================================== */
function initFloatingParticles() {
  const canvas = document.getElementById('petal-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 35;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle(true));
  }

  function createParticle(randomY = false) {
    const isGold = Math.random() > 0.65;
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      radius: isGold ? Math.random() * 2 + 1 : Math.random() * 6 + 3,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: Math.random() * 1.2 + 0.5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.6 + 0.3,
      isGold: isGold,
      // For lavender petals, shape factor
      tilt: Math.random() * 10 - 5,
      tiltSpeed: Math.random() * 0.05 + 0.01,
      color: isGold
        ? 'rgba(212, 175, 55, '
        : Math.random() > 0.5
        ? 'rgba(178, 159, 224, '
        : 'rgba(215, 203, 240, '
    };
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;
      p.tilt += p.tiltSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isGold) {
        // Gold shimmer speck
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Soft delicate lavender petal
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius, p.radius * 0.55, (p.tilt * Math.PI) / 180, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Reset if off screen
      if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
        particles[i] = createParticle(false);
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. 3D ENVELOPE OPENING MECHANICS
   ========================================================================== */
function initEnvelopeExperience() {
  const waxSeal = document.getElementById('wax-seal');
  const envelopeBox = document.getElementById('envelope-box');
  const envelopeScreen = document.getElementById('envelope-screen');
  const inviteScreen = document.getElementById('invitation-screen');
  const bgAudio = document.getElementById('bg-audio');
  const musicToggle = document.getElementById('music-toggle');

  if (!waxSeal || !envelopeBox) return;

  waxSeal.addEventListener('click', () => {
    // 1. Play background music
    if (bgAudio) {
      bgAudio.play().then(() => {
        if (musicToggle) musicToggle.classList.add('playing');
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    }

    // 2. Animate wax seal cracking and breaking away
    waxSeal.style.transition = 'transform 0.5s ease, opacity 0.4s ease';
    waxSeal.style.transform = 'translate(-50%, -50%) scale(1.35)';
    waxSeal.style.opacity = '0';

    // 3. Open top envelope flap in 3D
    setTimeout(() => {
      envelopeBox.classList.add('open');
      createSealBurst(waxSeal);
    }, 250);

    // 4. Smoothly transition to the main invitation experience
    setTimeout(() => {
      envelopeScreen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      envelopeScreen.style.opacity = '0';
      envelopeScreen.style.transform = 'translateY(-30px)';

      setTimeout(() => {
        envelopeScreen.classList.add('hidden');
        inviteScreen.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 700);
    }, 1400);
  });
}

function createSealBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 20; i++) {
    const spark = document.createElement('div');
    spark.style.position = 'fixed';
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.width = '6px';
    spark.style.height = '6px';
    spark.style.borderRadius = '50%';
    spark.style.background = 'linear-gradient(135deg, #FFF0C2, #D4AF37)';
    spark.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.8)';
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '9999';

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 30;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    document.body.appendChild(spark);

    spark.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }).onfinish = () => spark.remove();
  }
}

/* ==========================================================================
   3. BACKGROUND AUDIO EQUALIZER CONTROLLER
   ========================================================================== */
function initAudioPlayer() {
  const audio = document.getElementById('bg-audio');
  const toggleBtn = document.getElementById('music-toggle');
  if (!audio || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        toggleBtn.classList.add('playing');
      }).catch(err => console.error(err));
    } else {
      audio.pause();
      toggleBtn.classList.remove('playing');
    }
  });
}

/* ==========================================================================
   4. INTERACTIVE HTML5 SCRATCH-TO-REVEAL CANVAS
   ========================================================================== */
function initScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  const progressBar = document.getElementById('scratch-progress');
  const hintText = document.getElementById('scratch-hint');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let isRevealed = false;

  // Render luxurious golden shimmer foil on canvas
  function renderGoldFoil() {
    const w = canvas.width;
    const h = canvas.height;

    // Base metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#B88E28');
    grad.addColorStop(0.25, '#F7E7B4');
    grad.addColorStop(0.5, '#D4AF37');
    grad.addColorStop(0.75, '#FFF5D1');
    grad.addColorStop(1, '#8A6414');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle decorative border pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Fine gold glitter noise
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.35)' : 'rgba(99, 71, 7, 0.2)';
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }

    // Centered foil text
    ctx.fillStyle = '#2A163B';
    ctx.font = 'bold 16px "Montserrat", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE ✨', w / 2, h / 2 - 12);

    ctx.fillStyle = '#634707';
    ctx.font = 'italic 12px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Rub with your finger or mouse to reveal', w / 2, h / 2 + 15);
  }

  renderGoldFoil();

  // Scratch handling
  function scratch(e) {
    if (!isDrawing || isRevealed) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchPercentage();
  }

  // Throttle check percentage
  let checkTimer = null;
  function checkScratchPercentage() {
    if (checkTimer) return;
    checkTimer = setTimeout(() => {
      checkTimer = null;
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let clearPixels = 0;
      const step = 32; // sampling step for high performance

      for (let i = 3; i < pixels.length; i += 4 * step) {
        if (pixels[i] === 0) {
          clearPixels++;
        }
      }

      const totalSampled = pixels.length / (4 * step);
      const percent = Math.round((clearPixels / totalSampled) * 100);

      if (progressBar) {
        progressBar.style.setProperty('--progress', `${percent}%`);
      }

      if (percent >= 45 && !isRevealed) {
        completeScratchReveal();
      }
    }, 120);
  }

  function completeScratchReveal() {
    isRevealed = true;
    canvas.style.transition = 'opacity 0.6s ease';
    canvas.style.opacity = '0';
    setTimeout(() => {
      canvas.style.pointerEvents = 'none';
      if (progressBar) progressBar.style.setProperty('--progress', '100%');
      if (hintText) {
        hintText.innerText = '✨ Mubarak! The Auspicious Date has been Unveiled! ✨';
        hintText.style.color = 'var(--gold-dark)';
        hintText.style.fontWeight = '600';
      }
      triggerGoldConfetti();
    }, 600);
  }

  // Pointer Events
  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
  window.addEventListener('mousemove', scratch);
  window.addEventListener('mouseup', () => { isDrawing = false; });

  canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: true });
  window.addEventListener('touchmove', scratch, { passive: true });
  window.addEventListener('touchend', () => { isDrawing = false; });
}

function triggerGoldConfetti() {
  const container = document.querySelector('.scratch-container');
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = `${centerX}px`;
    confetti.style.top = `${centerY}px`;
    confetti.style.width = `${Math.random() * 8 + 4}px`;
    confetti.style.height = `${Math.random() * 12 + 6}px`;
    confetti.style.backgroundColor = Math.random() > 0.4 ? '#D4AF37' : '#B29FE0';
    confetti.style.borderRadius = '2px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 160 + 50;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    const rot = Math.random() * 720;

    document.body.appendChild(confetti);

    confetti.animate([
      { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
      { transform: `translate(${destX}px, ${destY}px) rotate(${rot}deg) scale(0.3)`, opacity: 0 }
    ], {
      duration: 1200 + Math.random() * 400,
      easing: 'cubic-bezier(0.2, 1, 0.3, 1)'
    }).onfinish = () => confetti.remove();
  }
}

/* ==========================================================================
   5. REAL-TIME COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  if (!daysEl) return;

  // Auspicious Wedding Date (Sunday, Dec 14, 2026, 13:30:00)
  const targetDate = new Date('December 14, 2026 13:30:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minutesEl.innerText = '00';
      secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? '0' + days : days;
    hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   6. 1-CLICK CALENDAR INTEGRATION (.ICS & GOOGLE CALENDAR)
   ========================================================================== */
function initCalendarAction() {
  const calBtn = document.getElementById('add-to-cal-btn');
  if (!calBtn) return;

  calBtn.addEventListener('click', () => {
    // Generate iCal format (.ics)
    const title = 'Wedding of Mustafa & Tasneem (Aqd al-Nikah)';
    const description = 'Auspicious wedding celebration of Mustafa & Tasneem under the Raza Mubarak of His Holiness Syedna Mufaddal Saifuddin (TUS).';
    const location = 'Grand Saifee Darbar Hall, Mumbai';
    const startDate = '20261214T080000Z'; // UTC format (1:30 PM IST)
    const endDate = '20261214T160000Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mustafa and Tasneem Wedding//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Trigger download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Mustafa_Tasneem_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Feedback
    calBtn.innerHTML = '<span>✅ Added to Calendar!</span>';
    setTimeout(() => {
      calBtn.innerHTML = '<span class="btn-icon">📅</span> Add to Calendar';
    }, 3000);
  });
}

/* ==========================================================================
   7. DIGITAL RSVP & MUBARAKI DUA GUESTBOOK
   ========================================================================== */
function initRsvpAndGuestbook() {
  const form = document.getElementById('rsvp-form');
  const feedback = document.getElementById('rsvp-feedback');
  const wishesList = document.getElementById('wishes-list');
  if (!form || !wishesList) return;

  // Pre-seed some authentic blessings if not present
  const defaultWishes = [
    {
      name: 'Burhanuddin Bhai & Family',
      time: 'Yesterday',
      text: 'Mubarak Mubarak to both families! May Allah Ta’ala bless Mustafa & Tasneem with everlasting happiness, sakoon, and afiyat under the chhatra chhaya of Aqa Mawla TUS.'
    },
    {
      name: 'Husain Bhai Kapasi',
      time: '2 days ago',
      text: 'Lakh Lakh Mubaraki! May this sacred union be enriched with infinite barakaat, joy, and prosperity.'
    },
    {
      name: 'Arwa Ben & Shabbir Bhai',
      time: '3 days ago',
      text: 'Dil se mubarakbadi! Beautiful invitation. Looking forward to celebrating all the rusumat together!'
    }
  ];

  let storedWishes = JSON.parse(localStorage.getItem('mt_wedding_wishes') || 'null');
  if (!storedWishes || storedWishes.length === 0) {
    storedWishes = defaultWishes;
    localStorage.setItem('mt_wedding_wishes', JSON.stringify(storedWishes));
  }

  function renderWishes() {
    wishesList.innerHTML = '';
    storedWishes.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'wish-card';
      card.innerHTML = `
        <div class="wish-author">
          <span>${escapeHtml(item.name)}</span>
          <span class="wish-time">${escapeHtml(item.time)}</span>
        </div>
        <p class="wish-text">"${escapeHtml(item.text)}"</p>
      `;
      wishesList.appendChild(card);
    });
  }

  renderWishes();

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guest-name').value.trim();
    const phone = document.getElementById('guest-phone').value.trim();
    const count = document.getElementById('guest-count').value;
    const attendance = form.querySelector('input[name="attendance"]:checked')?.value || 'Joyfully Attending';
    const message = document.getElementById('guest-message').value.trim();

    if (!name || !phone) return;

    // Save RSVP record to localStorage
    const rsvpRecords = JSON.parse(localStorage.getItem('mt_rsvp_records') || '[]');
    rsvpRecords.push({
      name,
      phone,
      count,
      attendance,
      message,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mt_rsvp_records', JSON.stringify(rsvpRecords));

    // If guest left a message, add it to the live wall
    if (message) {
      storedWishes.unshift({
        name: name,
        time: 'Just now',
        text: message
      });
      localStorage.setItem('mt_wedding_wishes', JSON.stringify(storedWishes));
      renderWishes();
    }

    // Show feedback and celebrate
    form.classList.add('hidden');
    feedback.classList.remove('hidden');
    triggerGoldConfetti();
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ==========================================================================
   8. BACK TO TOP SMOOTH SCROLL
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
