import {
    populateStaticBooksList,
    displayLibraryBooks,
    addBookMode,
    lookAtBooks,
    lookAtCatalogue,
} from '../controller/controller';

/*
 * Reference DOM nodes for dynamic updates.
 */

const organizeBooks = document.querySelector('#organize-books');
const peruseBooks = document.querySelector('#peruse-books');

/*
 * Execute logic after the DOM has loaded.
 */
addEventListener('load', () => {
    console.log(
        'The page is fully loaded and application logic can be safely executed.',
    );

    initLibraryCollection();
});

/*
 * Initialize library.
 */
function initLibraryCollection() {
    populateStaticBooksList();
    displayLibraryBooks();
    addBookMode();
    organizeBooks.addEventListener('click', lookAtBooks);
    peruseBooks.addEventListener('click', lookAtCatalogue);
}
