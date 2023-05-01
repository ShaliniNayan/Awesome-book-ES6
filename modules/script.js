// Local storage function
export function isStorageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const library = '__storage_test__';
    storage.setItem(library, library);
    storage.removeItem(library);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      && (e.code === 22
        || e.code === 1014
        || e.name === 'QuotaExceededError'
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      && storage
      && storage.length !== 0
    );
  }
}

// Book add and remove

export const bookList = document.querySelector('.book-list');

// Classes
export default class Bookshelf {
  constructor(books) {
    this.books = books;
  }

  addBook(title, author) {
    const book = {
      id: Math.floor(Math.random() * 1000000),
      title: title.value,
      author: author.value,
    };

    this.books.push(book);

    if (isStorageAvailable('localStorage')) {
      localStorage.setItem('bookList', JSON.stringify(this.books));
    }
  }

  remove(id) {
    this.books = this.books.filter((book) => book.id !== parseInt(id, 10));
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.updateBookList();
  }

  updateBookList() {
    bookList.innerHTML = '';

    this.books.forEach((el) => {
      bookList.innerHTML += `<div>
      <p>"<span class="title">${el.title}</span>" by <span class="author">${el.author}</span></p>
      <button id="${el.title}" onclick="remove('${el.id}')" class="remove">Remove</button>
      </div>`;
    });
  }
}
