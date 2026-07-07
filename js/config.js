// =====================================
// CONFIGURAÇÕES GERAIS DO CATÁLOGO
// Fundição Biguaçu
// =====================================

const CONFIG = {

    // Informações da empresa
    company: {
        name: "Fundição Biguaçu",
        subtitle: "Catálogo de Produtos"
    },

    // Catálogo
    catalog: {
        totalPages: 20,
        firstPage: 1,
        imageFolder: "assets/img/pages/",
        imageExtension: ".jpg"
    },

    // Livro
    book: {
        width: 900,
        height: 1273,
        showCover: true,
        drawShadow: true,
        maxShadowOpacity: 0.2,
        showPageCorners: false,
        mobileScrollSupport: true
    },
    
    controls: {
    show: true,
    showCounter: true
},

    // WhatsApp
    whatsapp: {
        phone: "5548999112119",
        message: "Olá! Gostaria de solicitar um orçamento."
    },

    // Índice
    menu: [

        {
            title: "Letras de Metal",
            page: 2
        },

        {
            title: "Cristos e Crucifixos",
            page: 4
        },

        {
            title: "Molduras e Acessórios",
            page: 5
        },

        {
            title: "Fotos de Porcelana",
            page: 6
        },

        {
            title: "Placas de ACM",
            page: 10
        },

        {
            title: "Placas de Metal",
            page: 14
        },

        {
            title: "Itens em Acrílico",
            page: 18
        },

        {
            title: "Outros Produtos",
            page: 19
        }

    ]

};