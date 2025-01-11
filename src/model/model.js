import { addBookToShelf } from "../controller/controller";

/*
 *  Create new book objects.
 */
export default class LibraryBook {
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
