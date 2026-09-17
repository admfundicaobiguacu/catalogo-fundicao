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

          cta_origin:
            origem,

          cta_text:
            texto,

          landing_page:
            "b2c_consumidor",

          page_path:
            window.location.pathname

        });

      }

    });

  });



  /* =========================================
     WHATSAPP STICKY MOBILE
     Exibe após sair do hero e oculta no footer
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

        mobileWhatsapp.classList.remove(
          "is-visible"
        );

      } else {

        mobileWhatsapp.classList.add(
          "is-visible"
        );

      }

    }


    const heroObserver =
      new IntersectionObserver(
        ([entry]) => {

          heroVisible =
            entry.isIntersecting;

          updateMobileWhatsapp();

        },
        {
          threshold: 0.15
        }
      );


    const footerObserver =
      new IntersectionObserver(
        ([entry]) => {

          footerVisible =
            entry.isIntersecting;

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
    document.querySelectorAll(
      ".faq-question"
    );


  faqQuestions.forEach((question) => {

    question.addEventListener(
      "click",
      () => {

        const item =
          question.closest(".faq-item");

        if (!item) return;


        const isOpen =
          item.classList.contains(
            "is-open"
          );


        /* Fecha os demais */

        document
          .querySelectorAll(
            ".faq-item.is-open"
          )
          .forEach((openItem) => {

            openItem.classList.remove(
              "is-open"
            );

            const openButton =
              openItem.querySelector(
                ".faq-question"
              );

            if (openButton) {

              openButton.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          });


        /* Abre o selecionado */

        if (!isOpen) {

          item.classList.add(
            "is-open"
          );

          question.setAttribute(
            "aria-expanded",
            "true"
          );

        }

      }
    );

  });



  /* =========================================
     COMPARADOR ANTES / DEPOIS
     RESTAURAÇÃO DE FOTOS
  ========================================= */

  document
    .querySelectorAll(".before-after")
    .forEach((comparison) => {

      const range =
        comparison.querySelector(
          ".before-after-range"
        );

      const before =
        comparison.querySelector(
          ".before-after-before"
        );

      const divider =
        comparison.querySelector(
          ".before-after-divider"
        );


      if (
        !range ||
        !before ||
        !divider
      ) {
        return;
      }


      const updateComparison = () => {

        const value =
          range.value;

        before.style.width =
          `${value}%`;

        divider.style.left =
          `${value}%`;

      };


      range.addEventListener(
        "input",
        updateComparison
      );


      updateComparison();

    });



  /* =========================================
     COMPARADOR ACM
     GRANITO ANTIGO / ACM APLICADO
  ========================================= */

  document
    .querySelectorAll(
      "[data-acm-comparador]"
    )
    .forEach((comparador) => {

      const range =
        comparador.querySelector(
          ".acm-comparador__range"
        );


      if (!range) {

        console.warn(
          "Range do comparador ACM não encontrado."
        );

        return;

      }


      /*
       * Atualiza a variável CSS responsável
       * pelo recorte, divisor e botão.
       */

      const atualizarPosicao =
        (valor) => {

          const posicao =
            Math.max(
              0,
              Math.min(
                100,
                Number(valor)
              )
            );

          range.value =
            posicao;

          comparador.style.setProperty(
            "--position",
            `${posicao}%`
          );

        };


      /*
       * Funcionamento normal do input range
       */

      range.addEventListener(
        "input",
        () => {

          atualizarPosicao(
            range.value
          );

        }
      );


      /*
       * Permite clicar e arrastar
       * em qualquer ponto da imagem.
       */

      const atualizarPeloPonteiro =
        (event) => {

          const rect =
            comparador
              .getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const percentual =
            (x / rect.width) * 100;

          atualizarPosicao(
            percentual
          );

        };


      let arrastando = false;


      comparador.addEventListener(
        "pointerdown",
        (event) => {

          arrastando = true;

          comparador.setPointerCapture(
            event.pointerId
          );

          atualizarPeloPonteiro(
            event
          );

        }
      );


      comparador.addEventListener(
        "pointermove",
        (event) => {

          if (!arrastando) {
            return;
          }

          atualizarPeloPonteiro(
            event
          );

        }
      );


      comparador.addEventListener(
        "pointerup",
        (event) => {

          arrastando = false;

          if (
            comparador.hasPointerCapture(
              event.pointerId
            )
          ) {

            comparador.releasePointerCapture(
              event.pointerId
            );

          }

        }
      );


      comparador.addEventListener(
        "pointercancel",
        () => {

          arrastando = false;

        }
      );


      /*
       * Posição inicial
       */

      atualizarPosicao(
        range.value || 50
      );

    });



  /* =========================================
     WHATSAPP FLUTUANTE
     Oculta quando outro CTA está visível
  ========================================= */

  const floatingWhatsApp =
    document.querySelector(
      ".mobile-whatsapp"
    );


  if (floatingWhatsApp) {

    const mobileMedia =
      window.matchMedia(
        "(max-width: 760px)"
      );


    /*
     * Estes CTAs não escondem
     * o botão flutuante.
     */

    const ignoredCtas =
      new Set([
        "header",
        "mobile-sticky",
        "footer"
      ]);


    const pageCtas =
      Array.from(
        document.querySelectorAll(
          "a[data-cta]"
        )
      ).filter((element) => {

        return !ignoredCtas.has(
          element.dataset.cta
        );

      });


    const siteFooter =
      document.querySelector(
        ".site-footer"
      );


    const targets =
      siteFooter
        ? [...pageCtas, siteFooter]
        : pageCtas;


    const visibleTargets =
      new Set();


    function updateFloatingWhatsApp() {

      const shouldHide =
        mobileMedia.matches &&
        visibleTargets.size > 0;

      floatingWhatsApp
        .classList
        .toggle(
          "is-suppressed",
          shouldHide
        );

    }


    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                visibleTargets.add(
                  entry.target
                );

              } else {

                visibleTargets.delete(
                  entry.target
                );

              }

            }
          );


          updateFloatingWhatsApp();

        },
        {
          threshold: 0.15
        }
      );


    targets.forEach(
      (target) => {

        observer.observe(
          target
        );

      }
    );


    if (
      mobileMedia.addEventListener
    ) {

      mobileMedia.addEventListener(
        "change",
        updateFloatingWhatsApp
      );

    } else {

      /*
       * Compatibilidade com navegadores antigos
       */

      mobileMedia.addListener(
        updateFloatingWhatsApp
      );

    }

  }


});