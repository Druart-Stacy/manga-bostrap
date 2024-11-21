/**
 * Fonction pour rechercher dans les titres et descriptions des livres
 */

const sampleBooks = [
    {
        id: 1,
        title: "Naruto",
        description: "Un ninja avec un rêve de devenir Hokage.",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 2,
        title: "One Piece",
        description: "Une aventure pour trouver le One Piece.",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 3,
        title: "Demon Slayer",
        description: "Un garçon combat des démons pour sauver sa sœur.",
        image: "https://via.placeholder.com/150"
    }
];

// Enregistrer dans localStorage
localStorage.setItem('books', JSON.stringify(sampleBooks));


function searchText() {
    const input = document.getElementById('search-bar').value.toLowerCase(); // Texte saisi
    const books = loadBooksFromLocalStorage(); // Charger les livres depuis localStorage
    
    // Filtrer les livres en fonction du texte saisi
    const filteredBooks = books.filter(book => {
        return (
            book.title.toLowerCase().includes(input) || 
            book.description.toLowerCase().includes(input)
        );
    });

    // Réafficher les livres filtrés
    displayBooks(filteredBooks);
}
