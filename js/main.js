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

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking nav links
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
    const scrollY = window.scrollY + 120; // Offset for header

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
    // Fallback for older browsers
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
      // Update active button
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
   5. Technical Report & Writeup Modal Viewer
   -------------------------------------------------------------------------- */
const PROJECT_REPORTS = {
  ad_pentest: {
    title: 'Active Directory Penetration Testing & Lateral Movement Lab',
    badge: 'Offensive Security',
    date: 'Security Assessment Report',
    executiveSummary:
      'Simulated internal penetration test against an enterprise Active Directory domain environment containing multiple domain controllers, Windows 10/11 endpoints, and segmented trust boundaries.',
    methodology: [
      'External & Internal Reconnaissance via BloodHound and Nmap',
      'Kerberoasting & AS-REP Roasting for service account password extraction',
      'Unconstrained Delegation exploitation leading to Golden Ticket forging',
      'Pass-the-Hash / Pass-the-Ticket lateral movement across child domains',
      'Privilege Escalation from unprivileged domain user to Enterprise Admin',
    ],
    findings: [
      {
        severity: 'CRITICAL',
        title: 'Weak Kerberos Service Principal Name (SPN) Encryption',
        desc: 'Extracted crackable TGS tickets for high-privilege MSSQL service account using targeted Kerberoasting techniques.',
      },
      {
        severity: 'HIGH',
        title: 'Over-permissioned ACLs on Group Objects',
        desc: 'GenericAll permissions allowed unprivileged user account to reset passwords on Domain Admin delegates.',
      },
    ],
    remediation:
      'Enforced AES-256 Kerberos encryption, rotated service passwords to 30+ character random passphrases, deployed Managed Service Accounts (gMSA), and audited AD tiering architecture according to the ESAE model.',
    repoUrl: 'https://github.com/mahafuzborshon',
  },
  siem_soc: {
    title: 'Hybrid SIEM Deployment & Automated Threat Detection',
    badge: 'Defensive Security',
    date: 'Defensive Architecture & Telemetry',
    executiveSummary:
      'Designed and deployed an enterprise threat detection pipeline leveraging Splunk Enterprise, Suricata NIDS, Sysmon, and Elastic Agent to monitor and alert on adversary tactics mapped to the MITRE ATT&CK framework.',
    methodology: [
      'Ingested Sysmon telemetry across Windows endpoints for process creation and LSASS memory access',
      'Configured Suricata rules for signature-based network intrusion detection & beaconing analysis',
      'Authored 15+ custom Splunk SPL correlation searches targeting credential dumping and C2 beacons',
      'Executed Atomic Red Team test scenarios to validate detection efficacy and mean-time-to-detect (MTTD)',
    ],
    findings: [
      {
        severity: 'METRIC',
        title: '5+ Simulated Lab Intrusions Successfully Detected',
        desc: 'Immediate alerting generated for Cobalt Strike beaconing patterns, Mimikatz injections, and privilege escalation scripts.',
      },
      {
        severity: 'IMPROVEMENT',
        title: 'Reduced False-Positive Telemetry Noise by 42%',
        desc: 'Tuned baseline alerting filters for benign administrative PowerShell execution.',
      },
    ],
    remediation:
      'Established automated containment runbooks, enriched logs with threat intelligence feeds (VirusTotal/AbuseIPDB), and configured real-time alerting to SOC Slack channels.',
    repoUrl: 'https://github.com/mahafuzborshon',
  },
  vuln_scanner: {
    title: 'Automated Web Vulnerability Scanner & OWASP Top 10 Auditor',
    badge: 'Security Tooling',
    date: 'Vulnerability Research & Python Tool',
    executiveSummary:
      'Developed a modular, multi-threaded vulnerability assessment engine in Python to identify high-risk security flaws in web applications, including SQL Injection, Reflected/Stored XSS, CSRF, and misconfigured HTTP security headers.',
    methodology: [
      'Asynchronous crawler utilizing BeautifulSoup and HTTP session pools for endpoint discovery',
      'Smart payload injection module with dynamic boundary escaping and response diffing',
      'Integration with OWASP ZAP API for comprehensive baseline comparison',
      'Automated CVSS 3.1 score calculation and formatted executive PDF/JSON report generation',
    ],
    findings: [
      {
        severity: 'EFFICIENCY',
        title: '10x Throughput over Synchronous Scanners',
        desc: 'Leveraged Python AsyncIO to scan 500+ endpoints concurrently without triggering standard rate limits.',
      },
      {
        severity: 'ACCURACY',
        title: 'Context-Aware False-Positive Filtering',
        desc: 'Implemented statistical content-length and error-code verification to eliminate noise.',
      },
    ],
    remediation:
      'Open-sourced security tool for DevOps pipelines (CI/CD SAST/DAST integration) with detailed remediation recommendations for development teams.',
    repoUrl: 'https://github.com/mahafuzborshon',
  },
  forensics_lab: {
    title: 'Memory Forensics & Ransomware Reverse Engineering Sandbox',
    badge: 'Threat Research',
    date: 'Malware & Forensics Report',
    executiveSummary:
      'Isolated analysis of simulated ransomware and dropper samples within a secure, network-isolated sandbox environment using Volatility 3, Ghidra, and Wireshark.',
    methodology: [
      'Volatile memory extraction and analysis of infected Windows targets using Volatility 3',
      'Disassembly and decompilation of obfuscated binaries in Ghidra to pinpoint API hooking and crypto routines',
      'Traffic inspection of DNS tunneling and encrypted C2 communications',
      'Extracted Indicators of Compromise (IoCs) compiled into standardized YARA rules and STIX/TAXII format',
    ],
    findings: [
      {
        severity: 'IOC DETECTED',
        title: 'Hidden Process Injection & Unhooked NTDLL',
        desc: 'Uncovered process hollowing mechanism injecting into svchost.exe to bypass standard EDR hooks.',
      },
      {
        severity: 'CRYPTOGRAPHY',
        title: 'Hardcoded Fallback Keys in Early Dropper Stage',
        desc: 'Identified static encryption seeds enabling key recovery prior to command-and-control connection.',
      },
    ],
    remediation:
      'Distributed custom YARA detection signatures and recommended proactive memory-integrity policies (Credential Guard & HVCI).',
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
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem;">
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
          Remediation & Defense Architecture
        </h4>
        <p style="font-size: 0.875rem; color: var(--text-body); line-height: 1.6;">${data.remediation}</p>
      </div>

      <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
        <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View Code & Documentation on GitHub
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
        // Fallback
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
    submitBtn.innerHTML = `
      <svg class="radar-pulse" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
      Sending message...
    `;

    // Construct mailto link fallback for instant real-world connection
    setTimeout(() => {
      const subject = encodeURIComponent(`[Portfolio Contact] ${subjectInput.value || 'Cybersecurity Inquiry'}`);
      const body = encodeURIComponent(`From: ${nameInput.value} (${emailInput.value})\n\n${messageInput.value}`);
      
      // Success feedback
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Message Prepared!
      `;
      submitBtn.classList.remove('btn-primary');
      submitBtn.classList.add('btn-outline-green');

      // Trigger mail client
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
