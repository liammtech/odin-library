const myLibrary = [];

function Book(title, author, year, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
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
    const container = document.querySelector("#books-list")

    for (const book of myLibrary) {
        let newBook = document.createElement("div");
        newBook.classList.add("book-entry");

        // SVG icon
        let svg = document.createElement("img");
        svg.setAttribute("src", "assets/svg/science-fiction.svg");
        newBook.appendChild(svg);

        // Title
        let title = document.createElement("h3");
        title.classList.add("field-title");
        title.textContent = book.title;
        newBook.appendChild(title);

        // Author
        let author = document.createElement("p");
        author.classList.add("field-author");
        author.textContent = book.author;
        newBook.appendChild(author);

        // Year
        let year = document.createElement("p");
        year.classList.add("field-year");
        year.textContent = book.year;
        newBook.appendChild(year);

        // Pages
        let pages = document.createElement("p");
        pages.classList.add("field-pages");
        pages.textContent = `${book.pages} Pages`;
        newBook.appendChild(pages);

        // Genre
        let genre = document.createElement("p");
        genre.classList.add("field-genre");
        genre.textContent = book.genre;
        newBook.appendChild(genre);

        // Buttons div
        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("book-entry-buttons");

        // Read button
        let readButton = document.createElement("button");
        readButton.classList.add("toggle-read-status")
        if (book.read) {
            readButton.classList.add("book-read");
            readButton.textContent = "Read ✔"
        } else {
            readButton.classList.add("book-not-read");
            readButton.textContent = "Not Read 🛇"
        }
        buttonsDiv.appendChild(readButton);

        // Delete button
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-book-entry");
        deleteButton.textContent = "Delete Book"
        buttonsDiv.appendChild(deleteButton);
        newBook.appendChild(buttonsDiv);

        // Push to page
        container.appendChild(newBook);
    } 
}

addBookToLibrary(
    "The Flogrons of Atlassia",
    "Marcus Scificius",
    2032,
    "Science Fiction",
    742,
    true
)

addBookToLibrary(
    "My Neighbour's Keeper",
    "Julia Romanticus",
    2001,
    "Romance",
    280,
    false
)

renderBooks()