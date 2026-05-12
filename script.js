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

for(let i = 0; i < 2; i++) {
    addBook("Hunger Games", "Mary Poppins");
}

function createCard(book) {
    const bookGrid = document.getElementById('bookGrid');
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookID = document.createElement('p');
    
    bookCard.classList.add('bookCard');

    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = `${book.author}`;
    bookID.textContent = `${book.id}`;

    bookGrid.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookID);
}

function displayBooks() {
    for (let i = 0; i < library.length; i++) {
        createCard(library[i]);
    }
}

displayBooks();