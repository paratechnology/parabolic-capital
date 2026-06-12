const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-menu]");
const year = document.querySelector("[data-year]");
const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioRows = document.querySelectorAll(".portfolio-row");
const contactForm = document.querySelector("[data-contact-form]");
const contactSubmit = document.querySelector("[data-contact-submit]");
const contactStatus = document.querySelector("[data-contact-status]");

const CONTACT_ENDPOINT = "";
const CONTACT_FALLBACK_EMAIL = "";

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  mobileMenu?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
};

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("menu-open", !isOpen);
  mobileMenu?.classList.toggle("is-open", !isOpen);
  menuButton.setAttribute("aria-expanded", String(!isOpen));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    portfolioRows.forEach((row) => {
      const shouldShow = filter === "all" || row.dataset.sector === filter;
      row.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const setContactStatus = (message, type = "") => {
  if (!contactStatus) return;
  contactStatus.textContent = message;
  contactStatus.classList.toggle("is-success", type === "success");
  contactStatus.classList.toggle("is-error", type === "error");
};

const setContactLoading = (isLoading) => {
  if (!contactSubmit) return;
  contactSubmit.disabled = isLoading;
  contactSubmit.textContent = isLoading ? "Sending..." : "Send enquiry";
};

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setContactStatus("");

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    setContactStatus("Please complete the required fields.", "error");
    return;
  }

  const formData = new FormData(contactForm);
  if (formData.get("companyWebsite")) {
    contactForm.reset();
    setContactStatus("Thank you. Your enquiry has been received.", "success");
    return;
  }

  const payload = {
    name: String(formData.get("name") || "").trim(),
    organization: String(formData.get("organization") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    opportunityType: String(formData.get("opportunityType") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    source: "parabolic-capital-website",
    submittedAt: new Date().toISOString()
  };

  if (!CONTACT_ENDPOINT) {
    const fallbackEmail = CONTACT_FALLBACK_EMAIL.trim();
    if (fallbackEmail) {
      const subject = encodeURIComponent(`Parabolic Capital enquiry: ${payload.opportunityType}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nOrganization: ${payload.organization}\nEmail: ${payload.email}\nOpportunity type: ${payload.opportunityType}\n\n${payload.message}`
      );
      window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      setContactStatus("Your email app should open with the enquiry prepared.", "success");
      return;
    }

    setContactStatus("Online submissions are being connected. Please try again shortly.", "error");
    return;
  }

  try {
    setContactLoading(true);
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Contact request failed with status ${response.status}`);
    }

    contactForm.reset();
    setContactStatus("Thank you. Your enquiry has been received.", "success");
  } catch (error) {
    setContactStatus("We could not send the enquiry. Please try again shortly.", "error");
  } finally {
    setContactLoading(false);
  }
});

const revealTargets = document.querySelectorAll(
  ".intro-band, .principles article, .sector-ledger article, .image-statement-content, .portfolio-row, .model-steps article, .contact-section > *"
);

revealTargets.forEach((target) => target.setAttribute("data-reveal", ""));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const heroMedia = document.querySelector(".hero-media");
const statementMedia = document.querySelector(".image-statement-media");

window.addEventListener(
  "scroll",
  () => {
    const offset = window.scrollY;
    if (heroMedia) {
      heroMedia.style.transform = `translateY(${offset * 0.04}px) scale(1.02)`;
    }
    if (statementMedia) {
      const sectionTop = statementMedia.parentElement?.offsetTop || 0;
      const localOffset = Math.max(0, offset - sectionTop);
      statementMedia.style.transform = `translateY(${localOffset * 0.035}px) scale(1.03)`;
    }
  },
  { passive: true }
);
