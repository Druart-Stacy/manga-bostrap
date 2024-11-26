// Récupérer les données de l'URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get('id')); 
// Assurez-vous que l'ID est un nombre entier

// Charger les livres depuis localStorage
const books = JSON.parse(localStorage.getItem('books')) || [];

// Trouver le livre correspondant à l'ID
const selectedBook = books.find(book => book.id === bookId);

if (selectedBook) {
    // Afficher les détails du livre
    const container = document.getElementById('book-details');
    container.innerHTML = `
        <div class="card">
            ${selectedBook.image ? `<img src="${selectedBook.image}" class="card-img-top" alt="${selectedBook.title}">` : ''}
            <div class="card-body">
                <h2 class="card-title">${selectedBook.title}</h2>
                <p><strong>Description:</strong> ${selectedBook.description}</p>
                <p><strong>Genres:</strong> ${selectedBook.genres ? selectedBook.genres.join(', ') : 'N/A'}</p>
                <p><strong>Collection:</strong> ${selectedBook.collection}</p>
                <p><strong>Nombre de Tomes:</strong> ${selectedBook.volumes ? selectedBook.volumes.length : 0}</p>
            </div>
        </div>
    `;

    // Afficher les tomes existants avec leurs statuts
    if (selectedBook.volumes && selectedBook.volumes.length > 0) {
        const volumeList = document.createElement('ul');
        volumeList.classList.add('volume-list'); // Ajout d'une classe spécifique
        selectedBook.volumes.forEach((volume, index) => {
            const volumeItem = document.createElement('li');
            const savedStatus = localStorage.getItem(`status_tome_${bookId}_${volume.number}`) || "non";
            
            volumeItem.innerHTML = `
                <strong>Tome ${volume.number}</strong>: ${volume.description}
                ${volume.coverImage ? `<br><img src="${volume.coverImage}" style="max-width: 100px;">` : ''}
                <p><strong>Maison d'édition:</strong> ${volume.publisher || 'Non spécifiée'}</p>
                <br>
                <label for="statusTome${index}">Statut:</label>
                <div class="form-check">
                    <input 
                        type="radio" 
                        class="form-check-input status-tome" 
                        id="statusTomeLu${index}" 
                        name="statusTome${index}" 
                        value="lu" 
                        data-tome-number="${volume.number}">
                    <label class="form-check-label" for="statusTomeLu${index}">Lu</label>
                </div>
                <div class="form-check">
                    <input 
                        type="radio" 
                        class="form-check-input status-tome" 
                        id="statusTomeNonLu${index}" 
                        name="statusTome${index}" 
                        value="non lu" 
                        data-tome-number="${volume.number}">
                    <label class="form-check-label" for="statusTomeNonLu${index}">Non Lu</label>
                </div>
                <div class="form-check">
                    <input 
                        type="radio" 
                        class="form-check-input status-tome" 
                        id="statusTomeEnCours${index}" 
                        name="statusTome${index}" 
                        value="en cours" 
                        data-tome-number="${volume.number}">
                    <label class="form-check-label" for="statusTomeEnCours${index}">En Cours</label>
                    
                </div>
                 <button class="btn btn-dark edit-tome-button" data-index="${index}">Modifier</button>
            `;
            volumeList.appendChild(volumeItem);
        });
        container.appendChild(volumeList);
    }
    

    // Formulaire d'ajout de tome
    document.getElementById('addTomeForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Récupérer les données du formulaire
        const volumeNumber = document.getElementById('volumeNumber').value;
        const volumeDescription = document.getElementById('volumeDescription').value;
        const volumeFile = document.getElementById('volumeFile');
        const selectedPublisher = document.getElementById('publisherSelect').value; // Récupère la maison d'édition

        const newVolume = {
            number: volumeNumber,
            description: volumeDescription,
            publisher: selectedPublisher,
            coverImage: null
        };

        // Ajouter l'image du tome si disponible
        if (volumeFile.files && volumeFile.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                newVolume.coverImage = e.target.result; // Sauvegarder l'image en Base64
                addVolumeToBook(selectedBook, newVolume); // Ajouter le tome au livre
            };
            reader.readAsDataURL(volumeFile.files[0]);
        } else {
            addVolumeToBook(selectedBook, newVolume); // Ajouter le tome sans image
        }

        // Réinitialiser le formulaire
        document.getElementById('addTomeForm').reset();
    });

    // Ajouter un tome au livre
    function addVolumeToBook(book, volume) {
        // Ajouter le volume au tableau des volumes du livre
        book.volumes = book.volumes || [];
        book.volumes.push(volume);

        // Sauvegarder le livre modifié dans localStorage
        const bookIndex = books.findIndex(b => b.id === book.id);
        if (bookIndex !== -1) {
            books[bookIndex] = book; // Mettre à jour le livre
            localStorage.setItem('books', JSON.stringify(books)); // Sauvegarder dans localStorage
        }

        // Recharger les détails avec les nouveaux tomes
        window.location.reload();
    }

    // Charger les statuts à l'initialisation
    document.querySelectorAll('.status-tome').forEach(inputElement => {
        const tomeNumber = inputElement.getAttribute('data-tome-number');
        const savedStatus = localStorage.getItem(`status_tome_${bookId}_${tomeNumber}`);
        if (savedStatus && inputElement.value === savedStatus) {
            inputElement.checked = true;
        }
    });

    // Sauvegarder et charger le statut des tomes
    document.querySelectorAll('.status-tome').forEach(selectElement => {
        selectElement.addEventListener('change', event => {
            const tomeNumber = event.target.getAttribute('data-tome-number');
            const status = event.target.value;
            localStorage.setItem(`status_tome_${bookId}_${tomeNumber}`, status);
        });
    });
} else {
    // Si aucun livre n'est trouvé
    document.getElementById('book-details').innerHTML = `
        <p class="text-danger">Livre non trouvé.</p>
    `;
}

// Fonction pour ouvrir le formulaire de modification dans une modale
function openEditForm(book, volume) {
    // Pré-remplir les champs de la modale avec les données existantes
    document.getElementById('editVolumeNumber').value = volume.number;
    document.getElementById('editVolumeDescription').value = volume.description;
    

    // Afficher l'image actuelle si elle existe
    const currentCoverImageDiv = document.getElementById('currentCoverImage');
    if (volume.coverImage) {
        currentCoverImageDiv.innerHTML = `<img src="${volume.coverImage}" style="max-width: 100px;" alt="Couverture actuelle">`;
    } else {
        currentCoverImageDiv.innerHTML = '';
    }

    // Sauvegarder le tome en cours de modification dans une variable globale
    window.currentVolume = volume;

    // Afficher la modale
    const editModal = new bootstrap.Modal(document.getElementById('editTomeModal'));
    editModal.show();
}

// Gérer la soumission du formulaire de modification
document.getElementById('editTomeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Récupérer les nouvelles valeurs
    const newNumber = document.getElementById('editVolumeNumber').value;
    const newDescription = document.getElementById('editVolumeDescription').value;
    const newFile = document.getElementById('editVolumeFile').files[0];

    // Mettre à jour les données du tome
    window.currentVolume.number = newNumber;
    window.currentVolume.description = newDescription;

    if (newFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            window.currentVolume.coverImage = e.target.result; // Mettre à jour l'image en base64
            saveChanges(); // Sauvegarder les modifications
        };
        reader.readAsDataURL(newFile);
    } else {
        saveChanges(); // Sauvegarder sans modifier l'image
    }

    // Fermer la modale
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editTomeModal'));
    editModal.hide();
});

// Fonction pour sauvegarder les modifications
function saveChanges() {
    // Sauvegarder le livre modifié dans localStorage
    const bookIndex = books.findIndex(b => b.id === selectedBook.id);
    if (bookIndex !== -1) {
        books[bookIndex] = selectedBook; // Mettre à jour le livre
        localStorage.setItem('books', JSON.stringify(books)); // Sauvegarder dans localStorage
    }}
    document.querySelectorAll('.edit-tome-button').forEach(button => {
        button.addEventListener('click', event => {
            const tomeIndex = parseInt(event.target.getAttribute('data-index'));
            const volumeToEdit = selectedBook.volumes[tomeIndex];
            openEditForm(selectedBook, volumeToEdit);
        });
    });
    
    



    // nombre de tome lu non-lu  encour et total 
    
     // Compter les cases à cocher (tomes total)
     $(document).ready(function () {
        function countLus() {
            let tomesLus = 0;

            // Parcourir toutes les cases à cocher et compter celles qui sont cochées et ont la valeur "lu"
            $('.form-check-input').each(function() {
                if ($(this).prop('checked') && $(this).val() === 'lu') {
                    tomesLus++;
                }
            });

            // Afficher le nombre de tomes lus
            $('#counter').text(tomesLus);
        }

        // Compter les tomes lorsqu'on clique sur le bouton
        $('#countTomes').click(function() {
            countLus();
        });
    });

    