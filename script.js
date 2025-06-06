// DOM Elements:
let library = [];
const showcase = document.querySelector('.showcase');
const addBook = document.querySelector('.add-book');
const dialog = document.querySelector('dialog');
const dialogClose = document.querySelector('dialog .btn-close');
const dialogSubmit = document.querySelector('dialog button[type=Submit]');

// Event Listeners:
addBook.addEventListener('click', () => {
  dialog.showModal();
})

dialog.addEventListener('close', () => {
  console.log(dialog.returnValue);
})

dialogClose.addEventListener('click', () => {
  dialog.close();
})

dialogSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');
  addToLibrary(title.value, author.value, pages.value, read.value);
  displayBook(library[library.length - 1]);

  [title.value, author.value, pages.value, read.value] = ['', '', '', ''];
  dialog.close();
})

// Constructor & Regular Function Declarations:
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
  console.log(this);
}

function addToLibrary(title, author, pages, read=false) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages);
  book.id = crypto.randomUUID();
  book.read = read;
  library.push(book);
}

function displayBook(book) {
  const title = document.createElement('div');
  title.textContent = book.title;
  title.classList.add('title');

  const author = document.createElement('div');
  author.textContent = book.author;
  author.classList.add('author');

  const pages = document.createElement('div');
  pages.textContent = `${book.pages} pages`;
  pages.classList.add('pages');

  const btnDelete = document.createElement('button');
  btnDelete.textContent = 'Delete';
  btnDelete.classList.add('btn-delete');
  btnDelete.addEventListener('click', deleteBook);

  const btnStatus = document.createElement('button');
  btnStatus.textContent = book.read ? 'Unread' : 'Read';
  btnStatus.classList.add('btn-read-status');
  btnStatus.addEventListener('click', toggleStatus);

  const bookElement = document.createElement('div');
  bookElement.setAttribute('data-id', book.id);
  bookElement.classList.add('book');
  bookElement.appendChild(title);
  bookElement.appendChild(author);
  bookElement.appendChild(pages);
  bookElement.appendChild(btnStatus);
  bookElement.appendChild(btnDelete);
  showcase.appendChild(bookElement);
}

function displayBooks() {
  library.forEach(book => {
    displayBook(book);
  })
}

function toggleStatus(e) {
  const bookEl = e.target.parentNode;
  const bookID = bookEl.getAttribute('data-id');

  library.forEach(book => {
    console.log(book.id, bookID);
    if (book.id === bookID) {
      book.toggleReadStatus();
      e.target.textContent = book.read ? 'Unread' : 'Read';
      console.log(book);
    }
  })
}

function deleteBook(e) {
  const bookEl = e.target.parentNode;
  const bookID = bookEl.getAttribute('data-id');

  library = library.filter(book => book.id !== bookID);
  bookEl.remove();
}

// Taste Codes:
addToLibrary('Who Cares?', 'Hu Nouz', 347);

displayBooks();