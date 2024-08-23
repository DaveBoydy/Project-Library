const myLibrary = [];

/*
 * Reference DOM nodes for dynamic updates.
 */
// const borrowBook = document.querySelector("#borrow-book");

const organizeBooks = document.querySelector("#organize-books");
const peruseBooks = document.querySelector("#peruse-books");
const bookShelf = document.querySelector("#bookshelf");
const computerScreen = document.querySelector("#computer-screen");

/*
 * Listen for UI interaction.
 */
addEventListener("load", (event) => {
  console.log("The page is fully loaded.");

  organizeBooks.addEventListener("click", organizeBookShelf);
  peruseBooks.addEventListener("click", queryAvailableBooks);
});

/*
 * Controllers respond to UI interaction.
 */

function organizeBookShelf() {
  bookShelf.classList.toggle("look-at-bookshelf");
}

function queryAvailableBooks() {
  computerScreen.classList.toggle("look-at-computer");
  populateStaticBooksList();
  displayLibraryBooks();
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

// function addBookToLibrary() {
//   myLibrary.push(theHobbit);
//   myLibrary.push(lionWitchWardrobe);
// }

function populateStaticBooksList() {
  myLibrary.push(theHobbit);
  myLibrary.push(lionWitchWardrobe);
}

function displayLibraryBooks() {
  myLibrary.forEach(displayBook);
}

function displayBook(book) {
  console.table(book);
}
