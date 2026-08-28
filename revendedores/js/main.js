document.addEventListener("DOMContentLoaded", () => {

  /*
   * Preparação inicial da landing B2B.
   *
   * O JavaScript será mantido propositalmente pequeno.
   * Mais adiante entraremos com:
   *
   * - FAQ accordion
   * - comportamento do WhatsApp mobile
   * - tracking de CTAs
   * - pequenos efeitos de interface
   */

  const ctas = document.querySelectorAll("[data-cta]");

  ctas.forEach((cta) => {

    cta.addEventListener("click", () => {

      const origem = cta.dataset.cta;

      console.log(
        `CTA WhatsApp: ${origem}`
      );

    });

  });

});