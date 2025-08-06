const myLibrary = [];

function Book(title, author, date, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.date = date;
    this.genre = genre
    this.pages = pages;
    this.read = read;
    this.uuid = crypto.randomUUID();
}

function addBookToLibrary(...args) {
    let newBook = new Book(...args);
    myLibrary.push(newBook);
}

function renderBooks() {
    for (const book of myLibrary) {
        console.log(book);
    }
}