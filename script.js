const myLibrary = [];

let genres = {};

const genresPromise = fetch('./json/genres.json')
    .then(res => res.json());

const newBookButton = document.getElementById("button-new-book");

newBookButton.addEventListener("click", e => dialog.showModal())

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

function getGenreIcon(genreName) {
    return genres[genreName];
}

function renderBooks() {
    const container = document.querySelector("#books-list");
    container.innerHTML = null;

    for (const book of myLibrary) {
        let newBook = document.createElement("div");
        newBook.classList.add("book-entry");

        // SVG icon
        let svg = document.createElement("img");
        svg.setAttribute("src", getGenreIcon(book.genre));
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
        readButton.addEventListener("click", e => toggleReadStatus(book.uuid));
        buttonsDiv.appendChild(readButton);

        // Delete button
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-book-entry");
        deleteButton.textContent = "Delete Book"
        deleteButton.addEventListener("click", e => deleteBook(book.uuid));
        buttonsDiv.appendChild(deleteButton);
        newBook.appendChild(buttonsDiv);

        // Set ID on card
        newBook.setAttribute("id", book.uuid);

        // Push to page
        container.appendChild(newBook);
    } 
}

function deleteBook(bookId) {
    for (let i in myLibrary) {
        if (bookId === myLibrary[i].uuid) {
            myLibrary.splice(i, 1);
            renderBooks()
        }
    }
}

function toggleReadStatus(bookId) {
    for (let i in myLibrary) {
        if (bookId === myLibrary[i].uuid) {
            myLibrary[i].read ? myLibrary[i].read = false : myLibrary[i].read = true;
            renderBooks()
        }
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

addBookToLibrary(
    "Gremlin Roger",
    "Merlin Mercius",
    2020,
    "Fantasy",
    1800,
    true
)

async function init() {
    const res = await fetch('./json/genres.json');
    genres = await res.json();
    renderBooks();
}

for (let i in myLibrary) {
    console.log(myLibrary[i].uuid)
}

// New book modal

submitButton = document.getElementById("form-submit");
const dialog = document.getElementById('new-book-modal');
const form = document.getElementById('new-book-form');

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary(
        form.title.value,
        form.author.value,
        form.year.value,
        form.genre.value,
        form.pages.value,
        form.read.checked
    );

    renderBooks();
    form.reset();
    dialog.close();
});

init()