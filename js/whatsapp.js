function createWhatsapp() {

    const container = document.getElementById("whatsapp");

    container.innerHTML = `
        <button id="btnWhatsapp" title="Solicitar orçamento">
            <svg class="whatsapp-icon" viewBox="0 0 32 32">
                <path d="M16 3C8.8 3 3 8.6 3 15.6c0 2.4.7 4.7 2 6.7L3.7 29l6.9-1.8c1.7.9 3.6 1.3 5.5 1.3 7.2 0 13-5.6 13-12.6S23.2 3 16 3zm0 23.2c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.1 1.1 1.1-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.7 0-5.7 4.7-10.3 10.4-10.3s10.4 4.6 10.4 10.3S21.7 26.2 16 26.2zm5.7-7.7c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1c-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2s0-.5.1-.6c.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.2.2 2 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.2-.2-.5-.3z"/>
            </svg>
            <span>Solicite um Orçamento</span>
        </button>
    `;

    const button = document.getElementById("btnWhatsapp");

    // Tamanho do botão no desktop
    if (window.innerWidth > 900) {

        container.style.width = "135px";
        button.style.width = "135px";
        button.style.padding = "10px 8px";
        button.style.fontSize = "12px";
        button.style.borderRadius = "22px";

    }

    button.onclick = () => {

        window.open(
            `https://wa.me/${CONFIG.whatsapp.phone}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`,
            "_blank"
        );

    };

}