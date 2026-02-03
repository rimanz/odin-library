// Storage Management:
const localLibrary = localStorage.getItem("library");
const saveToLocal = (k, v) => localStorage.setItem(k, JSON.stringify(v));
let library = localLibrary ? JSON.parse(localLibrary) : [];

// DOM Nodes:
const showcase = document.querySelector(".showcase");
const addBookBtn = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const dialogClose = document.querySelector("dialog .btn-close");
const dialogSubmit = document.querySelector("dialog button[type=Submit]");

// Event Listeners:
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  console.log(dialog.returnValue);
});

dialogClose.addEventListener("click", () => {
  dialog.close();
});

dialogSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");

  if (title.value && author.value && pages.value) {
    addToLibrary(title.value, author.value, pages.value, read.checked);
    [title.value, author.value, pages.value, read.checked] = ["", "", "", ""];
    recreateBooks();

    dialog.close();
  }
});

// Object Classes & Regular Function Declarations:
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

// Utility functions:
function addToLibrary(title, author, pages, read = false) {
  // take params, create a book then store it in the array
  if (title && author && pages) {
    const book = new Book(title, author, pages);
    book.id = crypto.randomUUID();
    book.read = read;
    library.push(book);
    saveToLocal("library", library);
  }
}

function displayBook(book) {
  const title = document.createElement("div");
  title.textContent = book.title;
  title.classList.add("title");

  const author = document.createElement("div");
  author.textContent = book.author;
  author.classList.add("author");

  const pages = document.createElement("div");
  pages.textContent = `${book.pages} pages`;
  pages.classList.add("pages");

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete";
  btnDelete.classList.add("btn-delete");
  btnDelete.addEventListener("click", deleteBook);

  const btnStatus = document.createElement("button");
  btnStatus.textContent = book.read ? "Unread" : "Read";
  btnStatus.classList.add("btn-read-status");
  btnStatus.addEventListener("click", toggleStatus);

  const bookElement = document.createElement("div");
  bookElement.setAttribute("data-id", book.id);
  bookElement.classList.add("book");
  bookElement.appendChild(title);
  bookElement.appendChild(author);
  bookElement.appendChild(pages);
  bookElement.appendChild(btnStatus);
  bookElement.appendChild(btnDelete);
  showcase.appendChild(bookElement);
}

function displayBooks() {
  library.forEach((book) => {
    displayBook(book);
  });
}

function recreateBooks() {
  showcase.innerHTML = ""; // removes all existing books
  displayBooks(); // recreates them from the source again
  showcase.appendChild(addBookBtn);
}

function toggleStatus(e) {
  const bookEl = e.target.parentNode;
  const bookID = bookEl.getAttribute("data-id");

  library.forEach((book) => {
    if (book.id === bookID) {
      book.toggleReadStatus();
      e.target.textContent = book.read ? "Unread" : "Read";
    }
  });

  saveToLocal("library", library);
}

function deleteBook(e) {
  const bookEl = e.target.parentNode;
  const bookID = bookEl.getAttribute("data-id");
  library = library.filter((book) => book.id !== bookID);
  bookEl.remove();
  saveToLocal("library", library);
}

displayBooks(); // initiates initial refresh
