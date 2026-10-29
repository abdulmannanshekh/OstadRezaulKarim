/* ==========================================================================
   OSTAD REZAUL KARIM - OFFENSIVE CYBERSECURITY & RED TEAM PORTFOLIO
   JAVASCRIPT CORE ENGINE & TACTICAL INTERACTION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initCanvas();
  initTypewriter();
  initTerminal();
  initAudioSFX();
  initNavigation();
  initPgpCopy();
  initContactForm();
});

/* ==========================================================================
   1. REAL-TIME SYSTEM CLOCK
   ========================================================================== */
function initClock() {
  const clockEl = document.getElementById('system-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const utcString = now.toUTCString().split(' ')[4] + ' UTC';
    clockEl.textContent = utcString;
  }
  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. DYNAMIC CYBER CANVAS (PARTICLE CONSTELLATION & RED PULSES)
   ========================================================================== */
function initCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 23, 68, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ff1744';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const lineAlpha = (1 - dist / 130) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 23, 68, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. CYBER TYPEWRITER
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const roles = [
    'Top 1% Offensive Security Operator',
    'Founder & Lead @ Ostad Red Team Forge',
    'Adversary Simulation & EDR Evasion Specialist',
    'Zero-Day Research & Custom Exploit Engineering',
    'Full-Stack Web & Mobile App Developer',
    'Enterprise IT Infrastructure & Cloud Hardening'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 70;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      speed = 30;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      speed = 70;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      speed = 2000; // Pause at end of sentence
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500; // Pause before new sentence
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   4. TACTICAL INTERACTIVE TERMINAL
   ========================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const execBtn = document.getElementById('term-exec-btn');
  const clearBtn = document.getElementById('clear-term-btn');

  if (!input || !output) return;

  const commandHistory = [];
  let historyIndex = -1;

  function appendLine(html, type = '') {
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    line.innerHTML = html;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    playTerminalSound('key');
    commandHistory.push(cmdRaw);
    historyIndex = commandHistory.length;

    appendLine(`<span class="term-prompt">operator@forge:~$</span> <span class="term-cmd">${escapeHTML(cmdRaw)}</span>`);

    const parts = cmd.split(' ');
    const mainCmd = parts[0];

    switch (mainCmd) {
      case 'help':
        appendLine(`
<span class="term-warn">TACTICAL COMMANDS DIRECTORY:</span>
  <span class="term-cmd">whoami</span>       - Display operator clearance and profile
  <span class="term-cmd">about</span>        - Summary dossier of Ostad Rezaul Karim
  <span class="term-cmd">forge</span>        - Information regarding Ostad Red Team Forge
  <span class="term-cmd">skills</span>       - List of core proficiencies & capabilities
  <span class="term-cmd">arsenal</span>      - View offensive weapons & development stack
  <span class="term-cmd">missions</span>     - Recent adversary simulations & case studies
  <span class="term-cmd">curriculum</span>   - Ostad Red Team Forge 19-Module Masterclass
  <span class="term-cmd">domain</span>       - Custom domain details (ostadrezaulkarim.com)
  <span class="term-cmd">github</span>       - GitHub profile repository link
  <span class="term-cmd">contact</span>      - Secure communication channels
  <span class="term-cmd">pgp</span>          - Show PGP encrypted public key fingerprint
  <span class="term-cmd">ping</span>         - Ping active threat simulation node
  <span class="term-cmd">matrix</span>       - Trigger cyber matrix digital rain stream
  <span class="term-cmd">sudo</span>         - Elevate privileges
  <span class="term-cmd">clear</span>        - Wipe terminal screen
`);
        break;

      case 'whoami':
        appendLine(`
[+] USER: Ostad Rezaul Karim
[+] ROLE: Founder & Lead Red Teamer // Ostad Red Team Forge
[+] RANK: Top 1% Global Offensive Security Operator
[+] UID: 0 (root) | GID: 0 (wheel)
[+] SYSTEM INTEGRITY: 100% UNCOMPROMISED
`, 'term-success');
        break;

      case 'about':
        appendLine(`
[+] OPERATOR DOSSIER: Ostad Rezaul Karim
[+] Focus: High-tier Red Teaming, Adversary Simulation (APT), Zero-Day Discovery,
          Advanced EDR/SIEM Evasion, Full-Stack App Engineering & IT Infrastructure.
[+] Mission: Emulating real-world cyber adversaries to harden enterprise perimeters.
`);
        break;

      case 'forge':
        appendLine(`
[+] GUILD: Ostad Red Team Forge
[+] PURPOSE: Elite syndicate dedicated to offensive security innovation,
             custom malware analysis, and unbreakable software architecture.
[+] FOUNDER: Ostad Rezaul Karim
`, 'term-success');
        break;

      case 'skills':
        appendLine(`
[★] RED TEAM & ADVERSARY SIMULATION: 99% (AD Dominance, Kerberos, EDR Bypass)
[★] PENETRATION TESTING & WEB EXPLOITS: 98% (OWASP Top 10, Cloud, APIs)
[★] FULL-STACK APP & WEB DEVELOPMENT: 95% (Node, Python, Go, React, C++)
[★] EXPLOIT DEV & REVERSE ENGINEERING: 94% (Ghidra, Memory Corruption, Assembly)
[★] ENTERPRISE IT & CLOUD SECURITY: 96% (AWS, Linux, Docker, Hardening)
`);
        break;

      case 'arsenal':
        appendLine(`
[+] OFFENSIVE: Cobalt Strike, Metasploit Pro, Burp Suite Pro, BloodHound, Impacket, Nmap
[+] LANGUAGES: Python, Go, C/C++, Bash, PowerShell, JavaScript, TypeScript
[+] INFRA: Docker, Kubernetes, AWS, Linux Hardened Kernels, Cloudflare
`);
        break;

      case 'missions':
        appendLine(`
1. [OP-NIGHTSHADE-01] Enterprise AD Forest Takeover & Kerberoasting (Completed)
2. [OP-SILENT-ECHO] Next-Gen EDR Bypass & Custom Syscall Injection (Successful)
3. [OP-SECURE-FORGE] Zero-Trust Enterprise Portal Hardening (Verified)
`, 'term-warn');
        break;

      case 'curriculum':
      case 'masterclass':
        appendLine(`
[+] RED TEAM MASTERCLASS // OSTAD RED TEAM FORGE (2026 EDITION)
[+] SYLLABUS: 19 Advanced Modules (Zero to Enterprise Operator)
    - Modules 1-3: Foundations, C Shellcode Runners, EDR/AMSI Bypasses
    - Modules 4-6: Active Directory, Kerberoasting, Golden Tickets, DCSync
    - Modules 7-9: Havoc C2, Azure Entra ID Cloud Takeover, Reporting
    - Modules 10-12: Physical Locks, Social Engineering, Custom Malware (Hell's Gate)
    - Modules 13-19: Web, Android, WiFi, Exploit Dev (ROP), IoT, OSINT, K8s
[+] VIEW PAGE: <a href="curriculum.html" style="color:#00b0ff; text-decoration:underline;">curriculum.html</a>
[+] DOWNLOAD DOCX: <a href="assets/Ostad_Red_Team_Forge_Masterclass_Curriculum.docx" download style="color:#00ff88; text-decoration:underline;">Ostad_Red_Team_Forge_Masterclass_Curriculum.docx</a>
`, 'term-success');
        break;

      case 'domain':
        appendLine(`
[+] OFFICIAL DOMAIN: https://ostadrezaulkarim.com
[+] STATUS: Configured & Verified for Ostad Rezaul Karim
[+] HOSTING: GitHub Pages (SSL Enforced)
`, 'term-success');
        break;

      case 'github':
        appendLine(`
[+] GITHUB REPOSITORY: <a href="https://github.com/abdulmannanshekh/OstadRezaulKarim" target="_blank" style="color:#ff3366; text-decoration:underline;">https://github.com/abdulmannanshekh/OstadRezaulKarim</a>
`);
        break;

      case 'contact':
        appendLine(`
[+] Website: https://ostadrezaulkarim.com
[+] GitHub: https://github.com/abdulmannanshekh/OstadRezaulKarim
[+] Group: Ostad Red Team Forge
[+] PGP Fingerprint: 8F3B 9E21 47CA 108D BD45 77EA 90C1 2F41
`);
        break;

      case 'pgp':
        appendLine(`
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Ostad Red Team Forge Comms v1.0
8F3B9E2147CA108DBD4577EA90C12F41AA761E09472198031278912389172389
=ORKF
-----END PGP PUBLIC KEY BLOCK-----
`, 'term-success');
        break;

      case 'ping':
        appendLine(`
PING ostadrezaulkarim.com (185.199.108.153) 56(84) bytes of data.
64 bytes from 185.199.108.153: icmp_seq=1 ttl=58 time=12.4 ms
64 bytes from 185.199.108.153: icmp_seq=2 ttl=58 time=11.8 ms
64 bytes from 185.199.108.153: icmp_seq=3 ttl=58 time=12.1 ms
--- ostadrezaulkarim.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 11.8/12.1/12.4/0.2 ms
`, 'term-success');
        break;

      case 'matrix':
        runMatrixStream();
        break;

      case 'sudo':
        appendLine(`[!] Privilege elevation unnecessary: Ostad Rezaul Karim already possesses supreme root clearance.`, 'term-warn');
        break;

      case 'clear':
        output.innerHTML = '';
        break;

      default:
        appendLine(`bash: command not found: ${escapeHTML(cmd)}. Type '<span class="term-cmd">help</span>' for authorized commands.`, 'term-error');
        break;
    }
  }

  function runMatrixStream() {
    appendLine(`[+] STREAMING NEURAL TELEMETRY MATRIX...`, 'term-warn');
    const chars = '01010101010101010101010101010101010101010101010101010101';
    let count = 0;
    const interval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 48; i++) {
        line += Math.random() > 0.5 ? '1' : '0';
      }
      appendLine(line, 'term-success');
      count++;
      if (count > 5) clearInterval(interval);
    }, 120);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    }
  });

  execBtn.addEventListener('click', () => {
    handleCommand(input.value);
    input.value = '';
    input.focus();
  });

  clearBtn.addEventListener('click', () => {
    output.innerHTML = '';
    playTerminalSound('click');
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

/* ==========================================================================
   5. SYNTHESIZED TACTICAL AUDIO (WEB AUDIO API - ZERO EXTERNAL ASSETS)
   ========================================================================== */
let audioCtx = null;
let sfxEnabled = true;

function initAudioSFX() {
  const toggleBtn = document.getElementById('sfx-toggle');
  const icon = document.getElementById('sfx-icon');

  if (toggleBtn && icon) {
    toggleBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) {
        icon.className = 'fa-solid fa-volume-high';
        playTerminalSound('beep');
      } else {
        icon.className = 'fa-solid fa-volume-xmark';
      }
    });
  }
}

function playTerminalSound(type) {
  if (!sfxEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'key') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'beep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1100, now + 0.06);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'click') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch (err) {
    // Audio context may be restricted by autoplay policy
  }
}

/* ==========================================================================
   6. NAVIGATION & SMOOTH SCROLL
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Active section tracking on scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. PGP KEY COPY TO CLIPBOARD
   ========================================================================== */
function initPgpCopy() {
  const copyBtn = document.getElementById('copy-pgp-btn');
  const pgpText = document.getElementById('pgp-text');

  if (copyBtn && pgpText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(pgpText.textContent).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = 'COPIED!';
        copyBtn.style.background = '#00ff88';
        copyBtn.style.color = '#000';
        playTerminalSound('beep');

        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2200);
      });
    });
  }
}

/* ==========================================================================
   8. ENCRYPTED TRANSMISSION CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !feedback || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    playTerminalSound('beep');

    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;
    const mission = document.getElementById('mission-type').value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ENCRYPTING & TRANSMITTING...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> TRANSMISSION DELIVERED`;
      
      feedback.innerHTML = `
        <span style="color:#00ff88;">
          [+] SIGNAL SECURED: Thank you, ${escapeHTML(name)}. Your brief regarding [${mission.toUpperCase()}] has been logged into Ostad Red Team Forge. Direct reply will be routed to ${escapeHTML(email)}.
        </span>
      `;

      form.reset();
      playTerminalSound('beep');

      setTimeout(() => {
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> TRANSMIT ENCRYPTED SIGNAL`;
      }, 5000);
    }, 1800);
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}
