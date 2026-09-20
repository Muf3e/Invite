/**
 * ROYAL LAVENDER & GOLD WEDDING INVITATION
 * Mustafa & Tasneem — Interactive Web Application
 */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingParticles();
  initArchMotionCanvas();
  initEnvelopeExperience();
  initAudioPlayer();
  initScratchCard();
  initCountdownTimer();
  initCalendarAction();
  initRsvpAndGuestbook();
  initBackToTop();
  initStoryScrollSpy();
  initParallaxDepth();
  initArchScrollPrompt();
});

/* ==========================================================================
   1. LIVING MOTION GRAPHIC PARTICLES & DYNAMIC PARALLAX CANVAS
   ========================================================================== */
function initFloatingParticles() {
  const canvas = document.getElementById('petal-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let scrollY = window.scrollY;
  let lastScrollY = scrollY;
  let scrollVelocity = 0;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    scrollVelocity = (scrollY - lastScrollY) * 0.3;
    lastScrollY = scrollY;
  }, { passive: true });

  // Interactive Cursor & Touch Trail
  const interactiveSparks = [];
  const addSparks = (x, y, count = 2) => {
    mouseX = x;
    mouseY = y;
    for (let i = 0; i < count; i++) {
      if (interactiveSparks.length > 60) interactiveSparks.shift();
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 0.5;
      interactiveSparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        size: Math.random() * 3 + 1.5,
        color: Math.random() > 0.3 ? '212, 175, 55' : '255, 235, 170'
      });
    }
  };

  window.addEventListener('mousemove', (e) => addSparks(e.clientX, e.clientY, 1), { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) addSparks(e.touches[0].clientX, e.touches[0].clientY, 2);
  }, { passive: true });

  // 1. Bokeh Orbs (deep ambient glow)
  const bokehCount = 14;
  const bokehs = [];
  for (let i = 0; i < bokehCount; i++) {
    bokehs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 45 + 25,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      baseOpacity: Math.random() * 0.12 + 0.06,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      isGold: Math.random() > 0.45
    });
  }

  // 2. Botanical Tumbling Petals & Blossoms
  const petalCount = 28;
  const petals = [];
  for (let i = 0; i < petalCount; i++) {
    petals.push(createPetal(true));
  }

  function createPetal(randomY = false) {
    const isGoldLeaf = Math.random() > 0.72;
    const isJasmine = !isGoldLeaf && Math.random() > 0.5;
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -30,
      size: Math.random() * 9 + 7,
      speedX: (Math.random() - 0.5) * 0.9,
      speedY: Math.random() * 1.3 + 0.6,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedZ: (Math.random() - 0.5) * 0.035,
      tiltY: Math.random() * Math.PI * 2,
      tiltSpeedY: Math.random() * 0.04 + 0.015,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.025 + 0.01,
      opacity: Math.random() * 0.45 + 0.4,
      type: isGoldLeaf ? 'gold' : isJasmine ? 'jasmine' : 'lavender'
    };
  }

  // 3. Shimmering Stardust
  const stardustCount = 38;
  const stardust = [];
  for (let i = 0; i < stardustCount; i++) {
    stardust.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.3 + 0.1),
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
      baseAlpha: Math.random() * 0.5 + 0.3
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Damping scroll velocity
    scrollVelocity *= 0.92;

    // 1. Render Bokeh
    for (let i = 0; i < bokehs.length; i++) {
      const b = bokehs[i];
      b.y += b.speedY - scrollVelocity * 0.1;
      b.x += b.speedX;
      b.phase += b.pulseSpeed;

      const alpha = b.baseOpacity * (0.8 + 0.2 * Math.sin(b.phase));
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
      if (b.isGold) {
        grad.addColorStop(0, `rgba(235, 195, 90, ${alpha * 1.2})`);
        grad.addColorStop(0.6, `rgba(212, 175, 55, ${alpha * 0.6})`);
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      } else {
        grad.addColorStop(0, `rgba(186, 160, 235, ${alpha * 1.3})`);
        grad.addColorStop(0.6, `rgba(142, 95, 205, ${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(142, 95, 205, 0)');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();

      if (b.y < -b.radius) b.y = height + b.radius;
      if (b.y > height + b.radius) b.y = -b.radius;
      if (b.x < -b.radius) b.x = width + b.radius;
      if (b.x > width + b.radius) b.x = -b.radius;
    }

    // 2. Render Stardust
    for (let i = 0; i < stardust.length; i++) {
      const s = stardust[i];
      s.y += s.speedY - scrollVelocity * 0.15;
      s.twinklePhase += s.twinkleSpeed;
      const alpha = Math.max(0.1, s.baseAlpha + Math.sin(s.twinklePhase) * 0.35);

      ctx.fillStyle = `rgba(255, 240, 180, ${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();

      // Subtle cross glimmer
      if (alpha > 0.65) {
        ctx.strokeStyle = `rgba(255, 255, 220, ${(alpha - 0.65) * 1.5})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x - s.size * 2, s.y);
        ctx.lineTo(s.x + s.size * 2, s.y);
        ctx.moveTo(s.x, s.y - s.size * 2);
        ctx.lineTo(s.x, s.y + s.size * 2);
        ctx.stroke();
      }

      if (s.y < -10) s.y = height + 10;
      if (s.y > height + 10) s.y = -10;
    }

    // 3. Render Tumbling Petals
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.swayPhase += p.swaySpeed;
      p.rotZ += p.rotSpeedZ;
      p.tiltY += p.tiltSpeedY;

      const swayX = Math.sin(p.swayPhase) * 1.5;
      p.x += p.speedX + swayX;
      p.y += p.speedY + scrollVelocity * 0.25;

      const scaleY = Math.cos(p.tiltY); // 3D tumble flip
      const petalW = p.size;
      const petalH = p.size * 1.45;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotZ);
      ctx.scale(1, Math.abs(scaleY) * 0.85 + 0.15);

      ctx.beginPath();
      ctx.moveTo(0, -petalH * 0.6);
      ctx.bezierCurveTo(petalW * 0.8, -petalH * 0.3, petalW * 0.7, petalH * 0.4, 0, petalH * 0.6);
      ctx.bezierCurveTo(-petalW * 0.7, petalH * 0.4, -petalW * 0.8, -petalH * 0.3, 0, -petalH * 0.6);
      ctx.closePath();

      if (p.type === 'gold') {
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * 0.85})`;
        ctx.strokeStyle = `rgba(255, 235, 140, ${p.opacity * 0.6})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      } else if (p.type === 'jasmine') {
        ctx.fillStyle = `rgba(255, 250, 240, ${p.opacity * 0.9})`;
        ctx.strokeStyle = `rgba(240, 225, 200, ${p.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(188, 168, 232, ${p.opacity * 0.75})`;
        ctx.strokeStyle = `rgba(225, 212, 248, ${p.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.fill();

      ctx.restore();

      if (p.y > height + 40) {
        petals[i] = createPetal(false);
      }
    }

    // 4. Render Interactive Cursor Trail Sparks
    for (let i = interactiveSparks.length - 1; i >= 0; i--) {
      const sp = interactiveSparks[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life -= sp.decay;
      if (sp.life <= 0) {
        interactiveSparks.splice(i, 1);
        continue;
      }

      ctx.fillStyle = `rgba(${sp.color}, ${sp.life * 0.85})`;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. 3D ENVELOPE OPENING MECHANICS & SOFT LIGHT REVEAL
   ========================================================================== */
function initEnvelopeExperience() {
  const waxSeal = document.getElementById('wax-seal');
  const envelopeBox = document.getElementById('envelope-box');
  const envelopeScreen = document.getElementById('envelope-screen');
  const inviteScreen = document.getElementById('invitation-screen');
  const bgAudio = document.getElementById('bg-audio');
  const musicToggle = document.getElementById('music-toggle');
  const lightPortal = document.getElementById('light-portal');
  const storyNav = document.getElementById('story-nav');

  if (!waxSeal || !envelopeBox) return;

  // Support direct preview of opened invitation for testing & inspection
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('open') === 'true' || urlParams.get('preview') === 'open') {
    envelopeScreen.classList.add('hidden');
    inviteScreen.classList.remove('hidden');
    if (storyNav) storyNav.classList.add('visible');
    const walkVideo = document.getElementById('couple-walk-video');
    if (walkVideo) walkVideo.play().catch(() => {});
  }

  let hasTriggered = false;

  const handleOpen = () => {
    if (hasTriggered) return;
    hasTriggered = true;

    // 1. Play background music
    if (bgAudio) {
      bgAudio.play().then(() => {
        if (musicToggle) musicToggle.classList.add('playing');
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    }

    // 2. Activate radiant golden rays and gentle glow on seal
    waxSeal.classList.add('glowing');
    createSealBurst(waxSeal);

    // 3. Center seam cracks open with soft warm champagne beam
    setTimeout(() => {
      envelopeBox.classList.add('light-active');
    }, 250);

    // 4. Open flaps in 3D perspective
    setTimeout(() => {
      envelopeBox.classList.add('open');
    }, 550);

    // 5. Expand soft ethereal light portal
    setTimeout(() => {
      if (lightPortal) lightPortal.classList.add('active');
    }, 950);

    // 6. Transition smoothly to the main invitation story
    setTimeout(() => {
      envelopeScreen.classList.add('hidden');
      inviteScreen.classList.remove('hidden');
      if (storyNav) storyNav.classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Autoplay couple walking video seamlessly
      const walkVideo = document.getElementById('couple-walk-video');
      if (walkVideo) {
        walkVideo.play().catch(err => console.log('Video autoplay:', err));
      }

      // Re-trigger motion canvas resize
      window.dispatchEvent(new Event('resize'));

      // Fade out soft light portal to unveil Chapter I
      setTimeout(() => {
        if (lightPortal) {
          lightPortal.style.transition = 'opacity 1s ease';
          lightPortal.classList.remove('active');
          setTimeout(() => {
            lightPortal.style.display = 'none';
          }, 1000);
        }
        triggerGoldConfetti();
      }, 250);
    }, 1500);
  };

  waxSeal.addEventListener('click', handleOpen);
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  });

  const sealIndicator = document.getElementById('seal-indicator');
  if (sealIndicator) {
    sealIndicator.addEventListener('click', handleOpen);
  }
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
    const rsvpItem = {
      name,
      phone,
      count,
      attendance,
      message,
      timestamp: new Date().toISOString()
    };
    rsvpRecords.push(rsvpItem);
    localStorage.setItem('mt_rsvp_records', JSON.stringify(rsvpRecords));

    // Async sync to Google Sheets (if webhook configured or fallback webhook)
    if (typeof GOOGLE_SHEET_WEBHOOK_URL !== 'undefined' && GOOGLE_SHEET_WEBHOOK_URL) {
      fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpItem)
      }).catch(err => console.log('Google Sheets sync notice:', err));
    }

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

/* ==========================================================================
   9. STORYTELLER BOOK PARALLAX SCROLL SPY & CHAPTER NAVIGATION
   ========================================================================== */
function initStoryScrollSpy() {
  const navDots = document.querySelectorAll('.story-nav-dot');
  const chapters = document.querySelectorAll('.story-chapter');

  if (navDots.length === 0 || chapters.length === 0) return;

  // Handle dot clicks for smooth jumping
  navDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // IntersectionObserver to highlight active chapter
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -50% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navDots.forEach(dot => {
          if (dot.getAttribute('href') === `#${id}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  chapters.forEach(chapter => observer.observe(chapter));
}

/* ==========================================================================
   10. LIVING MOTION GRAPHICS CANVAS INSIDE HERO ARCHWAY
   ========================================================================== */
function initArchMotionCanvas() {
  const canvas = document.getElementById('arch-motion-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const parent = canvas.parentElement;

  let width = (canvas.width = parent.clientWidth || 380);
  let height = (canvas.height = parent.clientHeight || 480);

  const handleResize = () => {
    if (!parent) return;
    width = canvas.width = parent.clientWidth || 380;
    height = canvas.height = parent.clientHeight || 480;
  };

  window.addEventListener('resize', handleResize);

  // Sparkles (rising gold dust) & Petals (swirling down)
  const sparkles = [];
  const sparkleCount = 38;
  for (let i = 0; i < sparkleCount; i++) {
    sparkles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.9 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.04 + 0.015,
      phase: Math.random() * Math.PI * 2
    });
  }

  const petals = [];
  const petalCount = 18;
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      rx: Math.random() * 5 + 3,
      ry: Math.random() * 3 + 2,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.7,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.6 + 0.3,
      color: Math.random() > 0.5 ? 'rgba(230, 190, 215,' : 'rgba(200, 175, 235,'
    });
  }

  // Soft bokeh spheres
  const bokehs = [];
  for (let i = 0; i < 8; i++) {
    bokehs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 25 + 15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01
    });
  }

  function renderArchMotion() {
    ctx.clearRect(0, 0, width, height);

    // 1. Soft golden bokeh in background
    for (let i = 0; i < bokehs.length; i++) {
      const b = bokehs[i];
      b.pulse += b.pulseSpeed;
      const alpha = 0.08 + 0.06 * Math.sin(b.pulse);
      ctx.fillStyle = `rgba(255, 235, 150, ${alpha})`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r + Math.sin(b.pulse) * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Rising Golden Sparkles
    for (let i = 0; i < sparkles.length; i++) {
      const s = sparkles[i];
      s.y += s.speedY;
      s.x += s.speedX + Math.sin(s.phase) * 0.3;
      s.phase += s.twinkleSpeed;

      const currentAlpha = Math.max(0.1, s.opacity * (0.6 + 0.4 * Math.sin(s.phase)));

      ctx.fillStyle = `rgba(255, 245, 180, ${currentAlpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      // Tiny white star center
      if (s.r > 1.8) {
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (s.y < -10) {
        s.y = height + 10;
        s.x = Math.random() * width;
      }
    }

    // 3. Falling Flower Petals
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.rotation * 0.02) * 0.4;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = `${p.color} ${p.opacity})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (p.y > height + 15 || p.x < -15 || p.x > width + 15) {
        p.y = -15;
        p.x = Math.random() * width;
      }
    }

    requestAnimationFrame(renderArchMotion);
  }

  renderArchMotion();
}

/* ==========================================================================
   11. INTERACTIVE 3D PARALLAX ON HERO ARCHWAY & WALKING COUPLE
   ========================================================================== */
function initParallaxDepth() {
  const archCard = document.getElementById('archway-card');
  const heroStage = document.getElementById('hero-archway-stage');
  const walkVideo = document.getElementById('couple-walk-video');
  const lanternLeft = document.getElementById('lantern-left');
  const lanternRight = document.getElementById('lantern-right');

  if (!archCard || !heroStage) return;

  // Desktop Mouse Parallax
  heroStage.addEventListener('mousemove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 5;
    const rotY = (x / (rect.width / 2)) * 5;

    archCard.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.01)`;

    if (walkVideo) {
      walkVideo.style.transform = `scale(1.05) translate(${(rotY * -1.8).toFixed(1)}px, ${(rotX * -1.8).toFixed(1)}px)`;
    }

    if (lanternLeft) {
      lanternLeft.style.transform = `translateX(${(rotY * 0.8).toFixed(1)}px)`;
    }
    if (lanternRight) {
      lanternRight.style.transform = `translateX(${(rotY * 0.8).toFixed(1)}px)`;
    }
  });

  // Global Mouse Parallax on Living Motion Background
  const bgAurora = document.getElementById('aurora-ambient-mesh');
  const bgLattice = document.getElementById('sacred-geometry-lattice');
  const bgLight = document.getElementById('volumetric-light-shafts');

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (bgAurora) bgAurora.style.transform = `translate(${(normX * 12).toFixed(1)}px, ${(normY * 10).toFixed(1)}px)`;
    if (bgLattice) bgLattice.style.transform = `translate(${(normX * -22).toFixed(1)}px, ${(normY * -18).toFixed(1)}px)`;
    if (bgLight) bgLight.style.transform = `translate(${(normX * 30).toFixed(1)}px, ${(normY * 24).toFixed(1)}px)`;
  }, { passive: true });

  heroStage.addEventListener('mouseleave', () => {
    archCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    if (walkVideo) {
      walkVideo.style.transform = 'scale(1) translate(0px, 0px)';
    }
    if (lanternLeft) lanternLeft.style.transform = 'none';
    if (lanternRight) lanternRight.style.transform = 'none';
  });

  // Mobile Gyroscope Parallax
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const rotY = Math.max(-8, Math.min(8, e.gamma / 3));
        const rotX = Math.max(-8, Math.min(8, (e.beta - 45) / 3));
        archCard.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

        if (walkVideo) {
          walkVideo.style.transform = `scale(1.04) translate(${(rotY * -1.5).toFixed(1)}px, ${(rotX * -1.5).toFixed(1)}px)`;
        }

        if (bgLattice) bgLattice.style.transform = `translate(${(rotY * -3).toFixed(1)}px, ${(rotX * -3).toFixed(1)}px)`;
        if (bgAurora) bgAurora.style.transform = `translate(${(rotY * 2).toFixed(1)}px, ${(rotX * 2).toFixed(1)}px)`;
      }
    }, { passive: true });
  }

  // Scroll Parallax on Video and Living Background
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < 800 && walkVideo) {
      walkVideo.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
    if (bgLattice) {
      bgLattice.style.transform = `translateY(${(scrollY * 0.08).toFixed(1)}px)`;
    }
    if (bgAurora) {
      bgAurora.style.transform = `translateY(${(scrollY * 0.035).toFixed(1)}px)`;
    }
  }, { passive: true });
}

/* ==========================================================================
   12. ARCH SCROLL PROMPT NAVIGATION
   ========================================================================== */
function initArchScrollPrompt() {
  const prompt = document.getElementById('arch-scroll-prompt');
  const target = document.getElementById('chapter-invitation');
  if (!prompt || !target) return;

  const doScroll = () => {
    target.scrollIntoView({ behavior: 'smooth' });
  };

  prompt.addEventListener('click', doScroll);
  prompt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      doScroll();
    }
  });
}


