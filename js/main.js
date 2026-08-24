/**
 * MAHAFUZ BORSHON — CYBER SECURITY PORTFOLIO
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollspy();
  initScrollReveal();
  initProjectFilters();
  initModals();
  initClipboard();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Navbar & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. Scrollspy Active Link Navigation
   -------------------------------------------------------------------------- */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
}

/* --------------------------------------------------------------------------
   4. Project Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Technical Report & Writeup Modal Viewer (Matched to Real Resume Projects)
   -------------------------------------------------------------------------- */
const PROJECT_REPORTS = {
  drupal_exploitation: {
    title: 'Drupal Exploitation and Privilege Escalation | Metasploit',
    badge: 'Web & Privilege Escalation',
    date: 'March 2025 – April 2025',
    executiveSummary:
      'Executed a full-scope penetration test against a vulnerable Drupal web application environment. Uncovered sensitive database credentials from configuration files and escalated privileges to root by exploiting SUID misconfigurations and an Exim4 vulnerability.',
    methodology: [
      'Comprehensive web application reconnaissance and directory fuzzing using Gobuster and Nmap',
      'Extracted database connection credentials directly from exposed Drupal configuration files',
      'Exploited SUID binary misconfigurations and local Exim4 privilege escalation vector',
      'Obtained unrestricted root shell access on the underlying Linux host',
    ],
    findings: [
      {
        severity: 'CRITICAL',
        title: 'Exim4 Local Privilege Escalation & SUID Misconfiguration',
        desc: 'Uncovered vulnerable local mail transfer agent binary with improper permissions, allowing elevation from www-data to full root.',
      },
      {
        severity: 'HIGH',
        title: 'Hardcoded Cleartext Database Credentials in Configuration',
        desc: 'Sensitive database credentials stored without restriction in Drupal configuration files.',
      },
    ],
    remediation:
      'Sanitized file permissions on web root directories, removed unnecessary SUID bit permissions on system binaries, and updated Exim4 to the latest patched release.',
    repoUrl: 'https://github.com/mahafuzborshon',
  },
  full_security_assessment: {
    title: 'Full Security Assessment | Nmap, RCE Exploitation (Target: 10.201.91.88)',
    badge: 'Network & RCE Pentest',
    date: 'February 2025 – March 2025',
    executiveSummary:
      'Conducted a structured penetration testing engagement following the OWASP Testing Guide and PTES methodology against target machine 10.201.91.88. Identified five distinct vulnerabilities (4 Critical, 1 Medium) and successfully exploited an unauthenticated Remote Code Execution flaw to obtain kernel-level access.',
    methodology: [
      'Port and service enumeration using Nmap scripts and custom reconnaissance workflows',
      'Vulnerability identification and threat classification (4 Critical, 1 Medium severity)',
      'Exploitation of an unauthenticated Remote Code Execution (RCE) vector to gain initial access',
      'Post-exploitation enumeration achieving kernel-level control and documenting findings to PTES standards',
    ],
    findings: [
      {
        severity: 'CRITICAL',
        title: 'Unauthenticated Remote Code Execution (RCE)',
        desc: 'Exposed vulnerable service endpoint permitted remote arbitrary command injection without prior authentication.',
      },
      {
        severity: 'CRITICAL',
        title: 'Kernel-Level System Compromise',
        desc: 'Direct path from initial service compromise to complete host takeover.',
      },
    ],
    remediation:
      'Isolated vulnerable service from public network exposure, implemented strict input validation and least-privilege service accounts, and applied official vendor security patches.',
    repoUrl: 'https://github.com/mahafuzborshon',
  },
  network_intrusion_soc: {
    title: 'Network Traffic Analysis & Simulated Intrusion Detection',
    badge: 'Defensive Security & SIEM',
    date: 'CodemanBD Lab Operations (2025)',
    executiveSummary:
      'Monitored network traffic using Wireshark, Snort, and Wazuh across 10+ simulated lab environments. Successfully analyzed packet streams and detected 5+ simulated intrusion attempts.',
    methodology: [
      'Continuous packet capture and deep protocol inspection in Wireshark',
      'Configured signature-based detection rules in Snort and host monitoring in Wazuh',
      'Identified brute force, port scans, and malicious payload delivery attempts across simulated lab networks',
      'Prepared detailed incident reports with risk ratings and actionable remediation guidance',
    ],
    findings: [
      {
        severity: 'DETECTION',
        title: '5+ Simulated Intrusions Detected in Real Time',
        desc: 'Successfully intercepted and correlated port sweeps, Metasploit handlers, and unauthorized shell spawns.',
      },
      {
        severity: 'AUTOMATION',
        title: 'Linux Bash Script Automation',
        desc: 'Automated repetitive log filtering and packet parsing tasks using custom Linux command-line scripts.',
      },
    ],
    remediation:
      'Hardened firewall access lists, deployed automated intrusion prevention triggers, and tuned SIEM correlation alerts.',
    repoUrl: 'https://github.com/mahafuzborshon',
  },
};

function initModals() {
  const modalOverlay = document.getElementById('report-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewReportBtns = document.querySelectorAll('[data-report-id]');

  if (!modalOverlay) return;

  function openReportModal(reportKey) {
    const data = PROJECT_REPORTS[reportKey];
    if (!data) return;

    const modalBody = document.getElementById('modal-report-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
          <span class="project-category-tag">${data.badge}</span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">${data.date}</span>
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--text-heading); margin-bottom: 1rem; line-height: 1.3;">${data.title}</h2>
        <p style="font-size: 0.9375rem; color: var(--text-body); line-height: 1.6; background-color: var(--bg-alt); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-primary);">${data.executiveSummary}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-mono);">
          Assessment Methodology
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.methodology
            .map(
              (step) => `
            <li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.875rem; color: var(--text-body);">
              <span style="color: var(--accent-primary); font-weight: 700;">▸</span>
              <span>${step}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-mono);">
          Key Findings & Metrics
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${data.findings
            .map(
              (f) => `
            <div style="padding: 0.875rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background-color: var(--bg-card);">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: var(--radius-sm); background-color: var(--accent-primary-light); color: var(--accent-primary);">
                  ${f.severity}
                </span>
                <span style="font-size: 0.875rem; font-weight: 700; color: var(--text-heading);">${f.title}</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--text-body); margin: 0;">${f.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-mono);">
          Remediation & Hardening Guidelines
        </h4>
        <p style="font-size: 0.875rem; color: var(--text-body); line-height: 1.6;">${data.remediation}</p>
      </div>

      <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
        <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View Profile &amp; Repositories on GitHub
        </a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewReportBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const reportKey = btn.getAttribute('data-report-id');
      openReportModal(reportKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Clipboard Copy with Toast Notification
   -------------------------------------------------------------------------- */
function initClipboard() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');
  const toast = document.getElementById('copy-toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-message');
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast(`Copied "${textToCopy}" to clipboard!`);
        } catch (err) {
          showToast('Failed to copy');
        }
        document.body.removeChild(textarea);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Contact Form Handler (Client Validation & User Feedback)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending message...`;

    setTimeout(() => {
      const subject = encodeURIComponent(`[Portfolio Contact] ${subjectInput.value || 'Cybersecurity Inquiry'}`);
      const body = encodeURIComponent(`From: ${nameInput.value} (${emailInput.value})\n\n${messageInput.value}`);
      
      submitBtn.innerHTML = `Message Prepared!`;
      submitBtn.classList.remove('btn-primary');
      submitBtn.classList.add('btn-outline-green');

      window.location.href = `mailto:mahafuzborshon@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('btn-outline-green');
        submitBtn.classList.add('btn-primary');
      }, 4000);
    }, 600);
  });
}
