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
    const readBtn = document.createElement('button');
    
    bookCard.classList.add('bookCard');
    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = `By ${book.author}`;
    bookPages.textContent = `${book.numberOfPages}`;

    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('removeBook');
    removeBtn.setAttribute('id', book.id);
    readBtn.textContent = 'Unread';
    readBtn.classList.add('unread');

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

    addBook(title, author, pages);

    displayBooks(); 
    
    bookDialog.close();
    form.reset();
})

const bookGrid = document.getElementById('bookGrid');

bookGrid.addEventListener('click', (event) => {
    const target = event.target;
    const targetClasslist = event.target.classList;

    if (targetClasslist.contains('removeBook')) {
        const bookID = event.target.id; // the target is the button pressed

        for(let i = 0; i < library.length; i++) {
            if (bookID === library[i].id) {
                library.splice(i, 1);
                break;
            }
        }
        displayBooks();
    }

    if (targetClasslist.contains('unread')) {
        target.textContent = 'Read';
        targetClasslist.remove('unread');
        targetClasslist.add('read');
    }
    else if (targetClasslist.contains('read')) {
        target.textContent = 'Unread';
        targetClasslist.remove('read');
        targetClasslist.add('unread');
    }
});
