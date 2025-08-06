const myLibrary = [];

function Book(title, author, date, pages, read) {
    this.title = title;
    this.author = author;
    this.date = date;
    this.pages = pages;
    this.read = read;
    this.uuid = crypto.randomUUID();
}

function addBookToLibrary(title, author, date, pages, read) {
    let newBook = new Book(title, author, date, pages, read);
    myLibrary.push(newBook);
}

function renderBooks() {

}