window.addEventListener("load", () => {

    createBook();
    createMenu();
    createWhatsapp();

    let zoom = 1;
    let moveX = 0;
    let moveY = 0;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const book = document.getElementById("book");
    const bookWrapper = document.getElementById("book-wrapper");

    function resetZoom() {
        zoom = 1;
        moveX = 0;
        moveY = 0;
        updateBookSize();
    }

    function getAvailableSize() {

        if (isMobile()) {
            return {
                width: window.innerWidth * 0.94,
                height: window.innerHeight * 0.80
            };
        }

        return {
            width: window.innerWidth - 370,
            height: window.innerHeight - 110
        };

    }

    function updateBookSize() {

        const images = book.querySelectorAll(".book-page-img");

        if (!images.length) return;

        let maxNaturalWidth = 0;
        let maxNaturalHeight = 0;

        images.forEach(img => {

            if (!img.naturalWidth || !img.naturalHeight) return;

            maxNaturalWidth = Math.max(maxNaturalWidth, img.naturalWidth);
            maxNaturalHeight = Math.max(maxNaturalHeight, img.naturalHeight);

        });

        if (!maxNaturalWidth || !maxNaturalHeight) return;

        const available = getAvailableSize();
        const pageCount = images.length;

        const fitScale = Math.min(
            available.width / (maxNaturalWidth * pageCount),
            available.height / maxNaturalHeight
        );

        const finalScale = fitScale * zoom;

        images.forEach(img => {
            img.style.width = `${img.naturalWidth * finalScale}px`;
            img.style.height = "auto";
        });

        book.style.transform = `translate(${moveX}px, ${moveY}px)`;

        if (zoom > 1) {
            book.style.cursor = "grab";
        } else {
            moveX = 0;
            moveY = 0;
            book.style.cursor = "default";
            book.style.transform = "translate(0px, 0px)";
        }

    }

    function updateCounter() {

        if (!CONFIG.controls.showCounter) return;

        const counter = document.getElementById("counter");

        if (flip.getCounterText) {
            counter.innerHTML = flip.getCounterText();
        } else {
            counter.innerHTML = `${flip.getCurrentPageIndex() + 1} / ${CONFIG.catalog.totalPages}`;
        }

    }

    function createNavigationControls() {

        let controls = document.getElementById("controls");

        if (!controls) {
            controls = document.createElement("div");
            controls.id = "controls";
            document.body.appendChild(controls);
        }

        controls.innerHTML = `
    <button id="prevBtn" title="Página anterior">
        <svg viewBox="0 0 48 48">
            <path d="M30 10 L16 24 L30 38"></path>
        </svg>
    </button>

    <button id="nextBtn" title="Próxima página">
        <svg viewBox="0 0 48 48">
            <path d="M18 10 L32 24 L18 38"></path>
        </svg>
    </button>
`;

        controls.style.setProperty("position", "fixed", "important");
        controls.style.setProperty("bottom", "20px", "important");
       controls.style.setProperty(
    "left",
    window.innerWidth > 900 ? "calc(50% + 65px)" : "50%",
    "important"
);
        controls.style.setProperty("transform", "translateX(-50%)", "important");
        controls.style.setProperty("display", "flex", "important");
        controls.style.setProperty("gap", "46px", "important");
        controls.style.setProperty("align-items", "center", "important");
        controls.style.setProperty("justify-content", "center", "important");
        controls.style.setProperty("z-index", "99999", "important");
        controls.style.setProperty("pointer-events", "auto", "important");

        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

       [prevBtn, nextBtn].forEach(btn => {

    btn.style.setProperty("background", "transparent", "important");
    btn.style.setProperty("border", "none", "important");
    btn.style.setProperty("box-shadow", "none", "important");
    btn.style.setProperty("cursor", "pointer", "important");
    btn.style.setProperty("padding", "0 8px", "important");
    btn.style.setProperty("width", "54px", "important");
    btn.style.setProperty("height", "54px", "important");
    btn.style.setProperty("display", "flex", "important");
    btn.style.setProperty("align-items", "center", "important");
    btn.style.setProperty("justify-content", "center", "important");

    const arrows = controls.querySelectorAll("svg");

arrows.forEach(svg => {

    svg.style.setProperty("width", "42px", "important");
    svg.style.setProperty("height", "42px", "important");
    svg.style.setProperty("stroke", "#555", "important");
    svg.style.setProperty("stroke-width", "1.8", "important");
    svg.style.setProperty("fill", "none", "important");
    svg.style.setProperty("stroke-linecap", "round", "important");
    svg.style.setProperty("stroke-linejoin", "round", "important");

});

});

        prevBtn.onclick = () => flip.flipPrev();
        nextBtn.onclick = () => flip.flipNext();

    }

    createNavigationControls();

    if (CONFIG.controls.showCounter) {

        updateCounter();

        flip.on("flip", () => {
            resetZoom();
            updateCounter();
        });

    } else {

        document.getElementById("counter").style.display = "none";

    }

    flip.on("render", () => {
        updateBookSize();
    });

    bookWrapper.addEventListener("wheel", (e) => {

        e.preventDefault();

        if (e.deltaY < 0) {
            zoom = Math.min(zoom + 0.25, 4);
        } else {
            zoom = Math.max(zoom - 0.25, 1);
        }

        updateBookSize();

    }, { passive: false });

    book.addEventListener("mousedown", (e) => {

        if (zoom <= 1) return;

        isDragging = true;

        startX = e.clientX - moveX;
        startY = e.clientY - moveY;

        book.style.cursor = "grabbing";

    });

    window.addEventListener("mousemove", (e) => {

        if (!isDragging) return;

        moveX = e.clientX - startX;
        moveY = e.clientY - startY;

        updateBookSize();

    });

    window.addEventListener("mouseup", () => {

        isDragging = false;

        if (zoom > 1) {
            book.style.cursor = "grab";
        }

    });

    book.ondblclick = () => {

        if (zoom === 1) {
            zoom = 2;
        } else {
            zoom = 1;
            moveX = 0;
            moveY = 0;
        }

        updateBookSize();

    };

    window.addEventListener("resize", () => {
        resetZoom();
        createNavigationControls();
    });

    document.getElementById("loading").style.display = "none";

});