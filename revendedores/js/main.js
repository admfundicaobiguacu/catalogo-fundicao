document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
   TRACKING DOS CTAs DE WHATSAPP
========================================= */

const ctas =
  document.querySelectorAll("[data-cta]");

ctas.forEach((cta) => {

  cta.addEventListener("click", () => {

    const origem =
      cta.dataset.cta || "nao-identificado";

    const texto =
      cta.textContent
        .trim()
        .replace(/\s+/g, " ");

    console.log(
      `CTA WhatsApp: ${origem}`
    );

    if (typeof gtag === "function") {

      gtag("event", "whatsapp_click", {

        landing_page:
          "b2b_revendedores",

        cta_origin:
          origem,

        cta_text:
          texto,

        page_path:
          window.location.pathname

      });

    }

  });

});

  /* =========================================
   WHATSAPP STICKY MOBILE
========================================= */

const mobileWhatsapp =
  document.querySelector(".mobile-whatsapp");

const hero =
  document.querySelector("#inicio");

const footer =
  document.querySelector("footer");

if (mobileWhatsapp && hero && footer) {

  let heroVisible = true;
  let footerVisible = false;

  function updateMobileWhatsapp() {

    if (heroVisible || footerVisible) {
      mobileWhatsapp.classList.remove("is-visible");
    } else {
      mobileWhatsapp.classList.add("is-visible");
    }

  }

  const heroObserver =
    new IntersectionObserver(
      ([entry]) => {

        heroVisible = entry.isIntersecting;

        updateMobileWhatsapp();

      },
      {
        threshold: 0.15
      }
    );

  const footerObserver =
    new IntersectionObserver(
      ([entry]) => {

        footerVisible = entry.isIntersecting;

        updateMobileWhatsapp();

      },
      {
        threshold: 0.05
      }
    );

  heroObserver.observe(hero);
  footerObserver.observe(footer);

}


  /* =========================================
     FAQ ACCORDION
  ========================================= */

  const faqQuestions =
    document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

      const item =
        question.closest(".faq-item");

      const isOpen =
        item.classList.contains("is-open");


      /* Fecha os demais */

      document
        .querySelectorAll(".faq-item.is-open")
        .forEach((openItem) => {

          openItem.classList.remove("is-open");

          const openButton =
            openItem.querySelector(".faq-question");

          openButton.setAttribute(
            "aria-expanded",
            "false"
          );

        });


      /* Abre o selecionado */

      if (!isOpen) {

        item.classList.add("is-open");

        question.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });

});