// =====================================
// CATÁLOGO
// Responsável por montar a lista de páginas
// =====================================

const Catalog = {

    pages: [],

    load() {

        this.pages = [];

        for (
            let page = CONFIG.catalog.firstPage;
            page <= CONFIG.catalog.totalPages;
            page++
        ) {

            this.pages.push(
    `${CONFIG.catalog.imageFolder}${page}${CONFIG.catalog.imageExtension}?v=300dpi`
);

        }

    }

};