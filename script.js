const myLibrary = [];

/*
 * Reference DOM nodes for dynamic updates.
 */

const organizeBooks = document.querySelector("#organize-books");
const peruseBooks = document.querySelector("#peruse-books");
const bookShelf = document.querySelector("#bookshelf");
const computerScreen = document.querySelector("#catalogue");
const form = document.querySelector("form");

/*
 * Listen for UI interaction.
 */
addEventListener("load", (event) => {
  console.log("The page is fully loaded.");

  organizeBooks.addEventListener("click", lookAtBooks);
  peruseBooks.addEventListener("click", lookAtComputer);
  form.addEventListener("submit", organizeBookShelf);
  addBookToLibrary();
  displayLibraryBooks();
});

/*
 * Controllers respond to UI interaction.
 */

function lookAtBooks() {
  bookShelf.classList.toggle("look-at-bookshelf");
}

function lookAtComputer() {
  computerScreen.classList.toggle("look-at-computer");
}

function organizeBookShelf(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const bookObject = Object.fromEntries(formData);
  console.log(bookObject);
}

/*
 *  Create new book objects.
 */
function LibraryBook(title, author, pages, completion) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completion = completion;
}

/*
 * Library book examples.
 */
const theHobbit = new LibraryBook(
  "The Hobbit",
  "J.R.R. Tolkien",
  "295 pages",
  "not started"
);

const lionWitchWardrobe = new LibraryBook(
  "The lion, the Witch and the Wardrobe",
  "C.S. Lewis",
  "208 pages",
  "halfway through"
);

/*
 * Helper functions perform tasks for controllers.
 */
function addBookToLibrary() {
  //TODO add books from the bookshelf form.
  populateStaticBooksList();
}

function populateStaticBooksList() {
  myLibrary.push(theHobbit);
  myLibrary.push(lionWitchWardrobe);
}

function displayLibraryBooks() {
  myLibrary.forEach((book) => {
    const tableRecord = document.createElement("tr");
    for (const metaProperty in book) {
      const tableCell = document.createElement("td");
      tableCell.textContent = book[metaProperty];
      tableRecord.appendChild(tableCell);
    }
    document.getElementById("table-records").appendChild(tableRecord);
  });
}
