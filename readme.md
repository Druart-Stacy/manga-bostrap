# liste Manga  - Stacy Druart

## Description
Le projet **Manga liste** est un site web développé pour présenter des projets manga dans un liste en ligne. Le site inclut une présentation des genres de mangas, des liens vers des sections de lecture, ainsi que des informations sur les types de mangas, les maisons d'édition et un formulaire de contact.

## Fonctionnalités
- **Page d'accueil :** Présente une barre de navigation permettant d'accéder aux différentes sections du site.
- **Genres de mangas :** Des sections pour chaque genre de manga (Aventure, Comédie, Drame, Fantasy, Horreur, Romance) sont disponibles pour afficher des projets.
- **liste :** Affiche des projets manga sous forme de cartes avec des descriptions et des images.
- **Formulaire d'ajout de livre :** Permet à l'utilisateur d'ajouter un livre avec des informations telles que le titre, les genres, le nombre de tomes, l'auteur, la description et une image.
- **Responsive :** Le site est conçu pour être responsive et s’adapte à différentes tailles d’écran grâce à Bootstrap.

## Page "Formulaire d'ajout de livre"
La page **formulaire.html** permet aux utilisateurs d'ajouter un nouveau livre à la collection de mangas. Cette page comprend un formulaire avec les champs suivants :
- **Titre** : Le titre du livre.
- **Genres** : Des cases à cocher pour choisir les genres associés au livre (Action, Aventures, Romance, Fantasy, Autre).
- **Nombre de tomes** : Un champ numérique pour spécifier le nombre de tomes du livre.
- **Description** : Un champ texte pour ajouter une description du livre.
- **Auteur** : Le nom de l'auteur du manga.
- **Image** : Un champ pour télécharger une image du livre.

### Fonctionnement du formulaire
Lorsqu'un utilisateur remplit le formulaire et clique sur "Ajouter", les données sont collectées et stockées dans le `localStorage` du navigateur, afin que les informations soient accessibles à travers les sessions du même utilisateur. L'image téléchargée est convertie en base64 et stockée sous forme de chaîne de caractères dans le localStorage.

### Code JavaScript
Le script suivant permet de gérer l'ajout de livre au localStorage :

```javascript
document.getElementById('addDivForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire (rechargement de la page)

    // Récupérer les valeurs des champs du formulaire
    const title = document.getElementById('title').value;
    const volumes = document.getElementById('volumes').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;

    // Récupérer les genres sélectionnés
    const genres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
        .map(checkbox => checkbox.value)
        .join(', ');

    // Vérification dans la console pour s'assurer que nous avons bien les valeurs
    console.log('Données récupérées du formulaire:', {title, volumes, description, author, genres});

    const fileInput = document.getElementById('file');
    const newBook = {
        title,
        volumes,
        description,
        author,
        genres
    };

    // Ajouter l'image si elle existe
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newBook.image = e.target.result; // Sauvegarde de l'image en Base64
            addBookToLocalStorage(newBook);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        newBook.image = null;
        addBookToLocalStorage(newBook);
    }
});

// Fonction pour ajouter le livre au localStorage
function addBookToLocalStorage(bookData) {
    // Récupérer les livres existants depuis localStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];

    // Ajouter le nouveau livre au tableau
    books.push(bookData);

    // Sauvegarder le tableau mis à jour dans localStorage
    localStorage.setItem('books', JSON.stringify(books));

    // Rediriger vers la page de visualisation
    window.location.href = 'index.html';
}
Le script empêche l'envoi traditionnel du formulaire, collecte les informations et les ajoute au localStorage. Une fois les données enregistrées, l'utilisateur est redirigé vers la page d'accueil pour visualiser le livre ajouté.

Technologies utilisées
HTML5 pour la structure du site.
CSS3 pour le style et la mise en page.
JavaScript pour l’interactivité, notamment avec jQuery et Bootstrap.
Bootstrap 5 pour une mise en page responsive et un design moderne.
Installation
Prérequis
Un éditeur de texte (ex : Visual Studio Code).
Un navigateur web pour tester le site (Google Chrome, Firefox, etc.).
Étapes d'installation
Clonez ce repository :
bash
Copier le code
git@github.com:Druart-Stacy/manga-bostrap.git
cd Manga-tech-Boostrap
Manga-tech-Boostrap/
│
├── index.html             # Page principale du site
├── formulaire.html        # Formulaire d'ajout de livre
├── 404.html               # Page d'erreur (404)
├── assets/
│   ├── style.css          # Fichier CSS personnalisé
│   └── images/            # Dossier pour les images du site
└── README.md              # Ce fichier README
Contribution
Forkez ce repository.
Créez une branche pour votre fonctionnalité (git checkout -b feature/nom-de-la-fonctionnalité).
Committez vos changements (git commit -m 'Ajout d'une fonctionnalité').
Poussez votre branche (git push origin feature/nom-de-la-fonctionnalité).
Ouvrez une Pull Request pour que vos changements soient examinés.
Auteur
Stacy Druart
Développeuse Web

License
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

markdown
Copier le code

### Explications supplémentaires
- **Formulaire d'ajout de livre :** Cette section décrit le rôle du formulaire sur `formulaire.html`. Il permet aux utilisateurs de saisir des informations détaillées sur un manga, et ces informations sont ensuite enregistrées dans le `localStorage`.
- **Code JavaScript :** Le script JavaScript est inclus dans le `README.md` pour expliquer comment les données du formulaire sont manipulées et sauvegardées dans le `localStorage`.

Cela devrait aider à bien comprendre le fonctionnement de cette page et à l'intégrer dans le reste du projet !

#truc à ajouter : 
schéma graphique poir voir combien de collection par éditeur et la même parr style 


