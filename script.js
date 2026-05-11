const library = []

function Book(name, author, id) {
    this.name = name;
    this.author = author;
    this.id = id;
}

Book.prototype.addBookToLibrary = function (bookName, bookAuthor, bookID) {
    const book = new Book(bookName, bookAuthor, bookID);
    library.push(book);
    console.log("Book added");
}

