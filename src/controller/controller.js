import LibraryBook from "../model/model";

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
 * Controllers respond to UI interaction.
 */
export function lookAtBooks() {
  bookShelf.classList.toggle("look-at-bookshelf");
  mainContent.classList.toggle("backdrop-blur");
  organizeBooks.classList.toggle("active-button");
}

export function lookAtCatalogue() {
  catalogue.classList.toggle("look-at-catalogue");
  peruseBooks.classList.toggle("active-button");
}

export function organizeBookShelf(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const bookObject = Object.fromEntries(formData);

  for (let entry in bookObject) {
    if (bookObject[entry] === "add-book") {
      LibraryBook.addBookToLibrary(bookObject);
      alert("Added book to the library");
    } else if (bookObject[entry] === "remove-book") {
      removeBookFromLibrary(bookObject);
      alert("Removed book from the library");
    }
  }
}

export function addBookMode() {
  if (document.querySelector(".book-form")) {
    document.querySelector(".book-form").remove();
  }

  bookShelf.appendChild(addTemplate.content.cloneNode(true));

  form = document.querySelector(".book-form");
  form.addEventListener("submit", organizeBookShelf);

  const removeBook = document.querySelector("#remove-book");
  removeBook.addEventListener("click", removeBookMode);
}

export function removeBookMode() {
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
 * Helper functions delegated tasks by controllers.
 */

export function addBookToShelf(book) {
  LibraryBook.libraryCollection.push(book);
  const tableRecord = document.createElement("tr");
  for (const metaProperty in book) {
    const tableCell = document.createElement("td");
    tableCell.textContent = book[metaProperty];
    tableRecord.appendChild(tableCell);
  }
  document.getElementById("table-records").appendChild(tableRecord);
}

export function removeBookFromLibrary(book) {
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

export function populateStaticBooksList() {
  LibraryBook.libraryCollection.push(theHobbit);
  LibraryBook.libraryCollection.push(lionWitchWardrobe);
}

export function displayLibraryBooks() {
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
