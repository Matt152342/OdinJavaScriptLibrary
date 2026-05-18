const library = []

function Book(title, author, numberOfPages, readState = false) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readState = readState;
    this.id = crypto.randomUUID();
}

function addBook(bookTitle, bookAuthor, numberOfPages, readState) {
    const book = new Book(bookTitle, bookAuthor, numberOfPages, readState);
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
    const readBtn = document.createElement('button');
    
    bookCard.classList.add('bookCard');
    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = `By ${book.author}`;
    bookPages.textContent = `${book.numberOfPages}`;

    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('removeBook');
    removeBtn.setAttribute('id', book.id);
    if (book.readState === true) {
        readBtn.textContent = 'Read';
        readBtn.classList.add('read');
        readBtn.setAttribute('id', book.id);
    }
    else if (book.readState === false) {
        readBtn.textContent = 'Unread';
        readBtn.classList.add('unread');
        readBtn.setAttribute('id', book.id);
    }

    bookGrid.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(readBtn);
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

    addBook(title, author, pages, false);

    displayBooks(); 
    
    bookDialog.close();
    form.reset();
})

const bookGrid = document.getElementById('bookGrid');

bookGrid.addEventListener('click', (event) => {
    const target = event.target;
    const targetClasslist = event.target.classList;
    const bookID = event.target.id; // the target is the button pressed

    if (targetClasslist.contains('removeBook')) {

        for(let i = 0; i < library.length; i++) {
            if (bookID === library[i].id) {
                library.splice(i, 1);
                break;
            }
        }
        displayBooks();
    }

    if (targetClasslist.contains('unread') || targetClasslist.contains('read')) {
        const book = library.find((book) => book.id === bookID);

        if (book) {
            book.readState = !book.readState;

            if (book.readState) {
                target.textContent = 'Read';
                targetClasslist.remove('unread');
                targetClasslist.add('read');
            } else {
                target.textContent = 'Unread';
                targetClasslist.remove('read');
                targetClasslist.add('unread');
            }
        }
    }
});
