const library = []

function Book(title, author, numberOfPages) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.id = crypto.randomUUID();
}

function addBook(bookTitle, bookAuthor, numberOfPages) {
    const book = new Book(bookTitle, bookAuthor, numberOfPages);
    library.push(book);
    console.log("Book added");
}

function createCard(book) {
    const bookGrid = document.getElementById('bookGrid');
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const removeBtn = document.createElement('button');
    
    bookCard.classList.add('bookCard');
    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = `By ${book.author}`;
    bookPages.textContent = `${book.numberOfPages}`;
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('removeBook');
    removeBtn.setAttribute('id', book.id);

    bookGrid.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(removeBtn);
}

function displayBooks() {
    const bookGrid = document.getElementById('bookGrid');
    bookGrid.innerHTML = "";

    library.forEach((book) => {
        createCard(book);
    });
}

const form = document.getElementById('bookForm');
const bookDialog = document.getElementById('formContainer');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;

    addBook(title, author, pages);

    displayBooks(); 
    
    bookDialog.close();
    form.reset();
})

const bookGrid = document.getElementById('bookGrid');
bookGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeBook')) {
        const bookID = event.target.id;

        for(let i = 0; i < library.length; i++) {
            if (bookID === library[i].id) {
                library.splice(i, 1);
                break;
            }
        }
        displayBooks();
    }
});