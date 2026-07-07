function createMenu() {

    const menu = document.getElementById("menu");

    menu.innerHTML = `
        <div class="menu-header">
            <h1>Fundição<br>Biguaçu</h1>
            <p>${CONFIG.company.subtitle}</p>
            <span class="menu-line"></span>
        </div>

        <h2 class="menu-title">Índice</h2>
    `;

    CONFIG.menu.forEach(item => {

        const div = document.createElement("div");

        div.className = "menu-item";
        div.textContent = item.title;

        div.onclick = () => {
            flip.flip(item.page);
            menu.classList.remove("open");
        };

        menu.appendChild(div);

    });

    const download = document.createElement("a");

    download.id = "downloadCatalogo";
    download.href = "assets/pdf/catalogo.pdf";
    download.download = "Catalogo-Fundicao-Biguacu.pdf";
    download.innerHTML = "Baixe o Catálogo<br>em PDF";

    menu.appendChild(download);

    const toggle = document.createElement("button");
    toggle.id = "menu-toggle";
    toggle.innerHTML = "☰";

    toggle.onclick = () => {
        menu.classList.toggle("open");
    };

    document.body.appendChild(toggle);

}