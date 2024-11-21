Voici une version corrigée et améliorée de votre fichier README, avec des ajouts pour la section "Trucs à ajouter" :

---

# Liste Manga - Stacy Druart

## Description
Le projet **Manga Liste** est un site web développé pour présenter et gérer une liste de mangas en ligne. Le site inclut une présentation des genres de mangas, des liens vers des sections de lecture, ainsi que des informations sur les types de mangas, les maisons d'édition et un formulaire de contact.

## Fonctionnalités
- **Page d'accueil :** Barre de navigation permettant d'accéder aux différentes sections du site.
- **Genres de mangas :** Sections pour chaque genre de manga (Aventure, Comédie, Drame, Fantasy, Horreur, Romance), affichant des projets associés.
- **Liste :** Présentation de mangas sous forme de cartes avec des descriptions, des images et des informations clés.
- **Formulaire d'ajout de livre :** Permet à l'utilisateur d'ajouter un manga avec des informations telles que le titre, les genres, le nombre de tomes, l'auteur, une description et une image.
- **Sauvegarde locale :** Les données saisies sont sauvegardées dans le `localStorage`, permettant une persistance locale.
- **Responsive :** Design adaptable aux différentes tailles d'écran grâce à Bootstrap.

## Page "Formulaire d'ajout de livre"
La page **formulaire.html** permet aux utilisateurs d'ajouter un nouveau manga à la collection. Ce formulaire comprend les champs suivants :
- **Titre :** Le titre du manga.
- **Genres :** Cases à cocher pour choisir les genres associés au manga (Action, Aventure, Romance, Fantasy, Autre).
- **Nombre de tomes :** Un champ numérique pour spécifier le nombre de tomes.
- **Description :** Un champ texte pour ajouter une description.
- **Auteur :** Le nom de l'auteur.
- **Image :** Un champ pour télécharger une image du manga.

### Fonctionnement du formulaire
Lorsqu'un utilisateur remplit le formulaire et clique sur "Ajouter", les données sont collectées et stockées dans le `localStorage`. L'image téléchargée est convertie en Base64 et sauvegardée sous forme de chaîne de caractères.

### Code JavaScript
Le script suivant gère l'ajout de mangas dans le `localStorage` :

```javascript
document.getElementById('addDivForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const volumes = document.getElementById('volumes').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const genres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
        .map(checkbox => checkbox.value)
        .join(', ');

    const fileInput = document.getElementById('file');
    const newBook = { title, volumes, description, author, genres };

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newBook.image = e.target.result;
            addBookToLocalStorage(newBook);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        newBook.image = null;
        addBookToLocalStorage(newBook);
    }
});

function addBookToLocalStorage(bookData) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(bookData);
    localStorage.setItem('books', JSON.stringify(books));
    window.location.href = 'index.html';
}
```

### Technologies utilisées
- **HTML5 :** Structure du site.
- **CSS3 :** Style et mise en page.
- **JavaScript :** Interactivité (avec `localStorage` et gestion des formulaires).
- **Bootstrap 5 :** Mise en page responsive et design moderne.

## Installation

### Prérequis
- Un éditeur de texte comme Visual Studio Code.
- Un navigateur web (Google Chrome, Firefox, etc.).

### Étapes d'installation
1. Clonez ce repository :
   ```bash
   git clone git@github.com:Druart-Stacy/manga-bostrap.git
   cd manga-bostrap
   ```

2. Structure du projet :
   ```
   Manga-tech-Boostrap/
   │
   ├── index.html             # Page principale
   ├── formulaire.html        # Formulaire d'ajout de livre
   ├── 404.html               # Page d'erreur (404)
   ├── assets/
   │   ├── style.css          # Fichier CSS personnalisé
   │   └── images/            # Images du site
   └── README.md              # Ce fichier README
   ```

## Contribution
1. Forkez ce repository.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalité
   ```
3. Committez vos changements :
   ```bash
   git commit -m "Ajout d'une fonctionnalité"
   ```
4. Poussez votre branche :
   ```bash
   git push origin feature/nom-de-la-fonctionnalité
   ```
5. Ouvrez une Pull Request pour révision.

## Auteur
**Stacy Druart**  
Développeuse Web passionnée par les mangas et les technologies web.

## Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

## Trucs à ajouter
Voici des idées supplémentaires pour enrichir le projet :
1. **Schémas graphiques :**
   - Ajouter un graphique interactif pour visualiser le nombre de mangas par maison d'édition.
   - Intégrer un graphique pour comparer les mangas par genre.

2. **Compteur de tomes à lire :**
   - Ajouter un compteur global pour afficher le nombre total de tomes restants à lire.
   - Ajouter un compteur individuel pour chaque série.

3. **Édition des informations :**
   - Permettre la modification des informations des mangas (titre, description, etc.).
   - Ajouter un bouton "Modifier" sur chaque carte de manga.

4. **Recherche avancée :**
   - Ajouter une barre de recherche pour filtrer les mangas genre.

5. **Filtrage et tri :**
   - Permettre le tri des mangas par genre
   - Ajouter des filtres pour afficher uniquement certains genres.

6. **Partage :**
   - Intégrer des options de partage sur les réseaux sociaux (ex. : partager un manga via Facebook ou Twitter).





