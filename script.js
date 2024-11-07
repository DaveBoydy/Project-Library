/*
 * Reference DOM nodes for dynamic updates.
 */

const mainContent = document.querySelector("#content");
const organizeBooks = document.querySelector("#organize-books");
const peruseBooks = document.querySelector("#peruse-books");
const bookShelf = document.querySelector("#bookshelf");
const catalogue = document.querySelector("#catalogue");
const addTemplate = document.querySelector("#bookshelf-add");
const removeTemplate = document.querySelector("#bookshelf-remove");
const bookList = document.querySelector("#book-list");
let form = null;

/*
 * Execute logic after the DOM has loaded.
 */
addEventListener("load", (event) => {
  console.log( "The page is fully loaded and application logic can be safely executed.");

  initLibraryCollection();
});

/*
 * Initialize library.
 */
function initLibraryCollection() {
  populateStaticBooksList();
  displayLibraryBooks();
  addBookMode();
  organizeBooks.addEventListener("click", lookAtBooks);
  peruseBooks.addEventListener("click", lookAtCatalogue);
}

/*
 *  Create new book objects.
 */
class LibraryBook {
  static libraryCollection = [];
  constructor(title, author, pages, completion) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.completion = completion;
  }

  static addBookToLibrary(book) {
    const libraryBook = new LibraryBook(
      book["book-title"],
      book["book-author"],
      book["book-pages"],
      book["book-completion"]
    );
    addBookToShelf(libraryBook);
  }
}

/*
 * Controllers respond to UI interaction.
 */
function lookAtBooks() {
  bookShelf.classList.toggle("look-at-bookshelf");
  mainContent.classList.toggle("backdrop-blur");
  organizeBooks.classList.toggle("active-button");
}

function lookAtCatalogue() {
  catalogue.classList.toggle("look-at-catalogue");
  peruseBooks.classList.toggle("active-button");
}

function organizeBookShelf(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const bookObject = Object.fromEntries(formData);

  for (entry in bookObject) {
    if (bookObject[entry] === "add-book") {
      LibraryBook.addBookToLibrary(bookObject);
    } else if (bookObject[entry] === "remove-book") {
      removeBookFromLibrary(bookObject);
    }
  }
}

function addBookMode() {
  if (document.querySelector(".book-form")) {
    document.querySelector(".book-form").remove();
  }

  bookShelf.appendChild(addTemplate.content.cloneNode(true));

  form = document.querySelector(".book-form");
  form.addEventListener("submit", organizeBookShelf);

  const removeBook = document.querySelector("#remove-book");
  removeBook.addEventListener("click", removeBookMode);
}

function removeBookMode() {
  if (document.querySelector(".book-form")) {
    document.querySelector(".book-form").remove();
  }

  bookShelf.appendChild(removeTemplate.content.cloneNode(true));

  form = document.querySelector(".book-form");
  form.addEventListener("submit", organizeBookShelf);

  const addBook = document.querySelector("#add-book");
  addBook.addEventListener("click", addBookMode);
}

/*
 * Library book examples.
 */
const theHobbit = new LibraryBook(
  "The Hobbit",
  "J.R.R. Tolkien",
  "295 pages",
  "Not started"
);

const lionWitchWardrobe = new LibraryBook(
  "The lion, the Witch and the Wardrobe",
  "C.S. Lewis",
  "208 pages",
  "Halfway through"
);

/*
 * Helper functions delegated tasks by controllers.
 */

function addBookToShelf(book) {
  LibraryBook.libraryCollection.push(book);
  const tableRecord = document.createElement("tr");
  for (const metaProperty in book) {
    const tableCell = document.createElement("td");
    tableCell.textContent = book[metaProperty];
    tableRecord.appendChild(tableCell);
  }
  document.getElementById("table-records").appendChild(tableRecord);
}

function removeBookFromLibrary(book) {
  console.log("Removing a library book");

  LibraryBook.libraryCollection.map(function (libBook, index) {
    if (book["book-title"].toLowerCase() === libBook["title"].toLowerCase()) {
      console.log(`target acquired at index: ${index}`);
      LibraryBook.libraryCollection.splice(index, 1);
    }
  });

  let records = document.getElementById("table-records");

  bookList.removeChild(records);
  records = document.createElement("tbody");
  records.setAttribute("id", "table-records");
  bookList.appendChild(records);

  displayLibraryBooks();
}

function populateStaticBooksList() {
  LibraryBook.libraryCollection.push(theHobbit);
  LibraryBook.libraryCollection.push(lionWitchWardrobe);
}

function displayLibraryBooks() {
  LibraryBook.libraryCollection.forEach((book) => {
    const tableRecord = document.createElement("tr");
    for (const metaProperty in book) {
      const tableCell = document.createElement("td");
      tableCell.textContent = book[metaProperty];
      tableRecord.appendChild(tableCell);
    }
    document.getElementById("table-records").appendChild(tableRecord);
  });
}
