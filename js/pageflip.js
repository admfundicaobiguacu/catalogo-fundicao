let flip = null;

function isMobile() {
    return window.innerWidth <= 900;
}

function createBook() {

    Catalog.load();

    const bookElement = document.getElementById("book");

    flip = createCustomFlipbook(bookElement);

    flip.render();

}

function createCustomFlipbook(bookElement) {

    let currentPage = CONFIG.catalog.firstPage;

    const events = {
        flip: [],
        render: []
    };

    function emit(eventName) {
        events[eventName].forEach(callback => callback());
    }

    function normalizePage(page) {

        page = Number(page);

        if (page < 1) page = 1;
        if (page > CONFIG.catalog.totalPages) page = CONFIG.catalog.totalPages;

        if (isMobile()) {
            return page;
        }

        // Capa sozinha
        if (page === 1) {
            return 1;
        }

        // Depois da capa:
        // 2-3, 4-5, 6-7...
        if (page % 2 !== 0) {
            page = page - 1;
        }

        if (page < 2) page = 2;

        return page;

    }

    function getVisiblePages() {

        if (isMobile()) {
            return [currentPage];
        }

        if (currentPage === 1) {
            return [1];
        }

        const pages = [currentPage];

        if (currentPage + 1 <= CONFIG.catalog.totalPages) {
            pages.push(currentPage + 1);
        }

        return pages;

    }

    function render() {

        const visiblePages = getVisiblePages();

        const spreadClass = visiblePages.length === 1
            ? "book-spread single-page"
            : "book-spread double-page";

        bookElement.innerHTML = `
            <div class="${spreadClass}">
                ${visiblePages.map(page => `
                    <div class="book-page">
                        <img 
                            src="${CONFIG.catalog.imageFolder}${page}${CONFIG.catalog.imageExtension}?v=limpo-1"
                            class="book-page-img"
                            draggable="false"
                            alt="Página ${page}"
                        >
                    </div>
                `).join("")}
            </div>
        `;

        const images = bookElement.querySelectorAll("img");

        images.forEach(img => {

            img.addEventListener("dragstart", e => e.preventDefault());

            img.onload = () => {
                emit("render");
            };

        });

        emit("render");

    }

    return {

        render,

        flip(page) {
            currentPage = normalizePage(page);
            render();
            emit("flip");
        },

        flipPrev() {

            if (isMobile()) {

                currentPage = currentPage - 1;

            } else {

                if (currentPage <= 2) {
                    currentPage = 1;
                } else {
                    currentPage = currentPage - 2;
                }

            }

            currentPage = normalizePage(currentPage);

            render();
            emit("flip");

        },

        flipNext() {

            if (isMobile()) {

                currentPage = currentPage + 1;

            } else {

                if (currentPage === 1) {
                    currentPage = 2;
                } else {
                    currentPage = currentPage + 2;
                }

            }

            currentPage = normalizePage(currentPage);

            render();
            emit("flip");

        },

        getCurrentPageIndex() {
            return currentPage - 1;
        },

        getVisiblePages() {
            return getVisiblePages();
        },

        getCounterText() {

            const pages = getVisiblePages();

            if (pages.length === 1) {
                return `${pages[0]} / ${CONFIG.catalog.totalPages}`;
            }

            return `${pages[0]}-${pages[1]} / ${CONFIG.catalog.totalPages}`;

        },

        on(eventName, callback) {

            if (events[eventName]) {
                events[eventName].push(callback);
            }

        }

    };

}