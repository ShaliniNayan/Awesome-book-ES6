/* eslint-disable import/extensions */
// Form local storage availability checker function
import Bookshelf, { isStorageAvailable } from './modules/script.js';
import { DateTime } from './modules/luxon.js';

const getTime = () => {
  const dt = DateTime.now();
  return dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
};

const time = document.getElementById('time');
setInterval(() => {
  time.innerHTML = getTime();
}, 1000);

const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const form = document.querySelector('#form-add-book');

// Create a variable to contain local data
let books = [];
// If there's local data available,
if (isStorageAvailable('localStorage')) {
  const data = JSON.parse(localStorage.getItem('bookList'));
  // and if it's not empty, update it
  if (data) {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
}

const newbook = new Bookshelf(books);

// On submit
form.onsubmit = () => {
  // Add the book
  newbook.addBook(title, author);
  // Update the html
  newbook.updateBookList();
  // Reset form
  form.reset();
};

// Don't forget to call the function when the page loads as well
newbook.updateBookList();

// eslint-disable-next-line no-unused-vars
const remove = (id) => {
  newbook.remove(id);
};
window.remove = remove;

// Single page navigation
const allBooks = document.querySelector('.all-books');
const addBook = document.querySelector('.add-book');
const contact = document.querySelector('.contact');
const navList = document.querySelector('#list');
const navAdd = document.querySelector('#add');
const navContact = document.querySelector('#contact');

navList.onclick = () => {
  navList.style.color = 'rgb(53, 137, 255)';
  navAdd.style.removeProperty('color');
  navContact.style.removeProperty('color');
  allBooks.classList.remove('hide');
  addBook.classList.add('hide');
  contact.classList.add('hide');
};

navAdd.onclick = () => {
  navAdd.style.color = 'rgb(53, 137, 255)';
  navList.style.removeProperty('color');
  navContact.style.removeProperty('color');
  addBook.classList.remove('hide');
  allBooks.classList.add('hide');
  contact.classList.add('hide');
};

navContact.onclick = () => {
  navContact.style.color = 'rgb(53, 137, 255)';
  navList.style.removeProperty('color');
  navAdd.style.removeProperty('color');
  contact.classList.remove('hide');
  addBook.classList.add('hide');
  allBooks.classList.add('hide');
};
