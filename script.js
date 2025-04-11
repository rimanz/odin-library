const library = [];
const showcase = document.querySelector('.showcase');
const dialog = document.querySelector('dialog');

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addToLibrary(title, author, pages) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages);
  book.id = crypto.randomUUID();
  library.push(book);
}

function displayBooks() {
  library.forEach(book => {
    const title = document.createElement('div');
    title.textContent = book.title;
    title.classList.add('title');

    const author = document.createElement('div');
    author.textContent = book.author;
    author.classList.add('author');

    const pages = document.createElement('div');
    pages.textContent = `${book.pages} pages`;
    pages.classList.add('pages');

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.appendChild(title);
    bookElement.appendChild(author);
    bookElement.appendChild(pages);
    showcase.appendChild(bookElement);
  })

}

// Taste Codes:
library.push(
  {
    title: 'Who Cares?',
    author: 'Hu Nouz',
    pages: 347,
  }
)

displayBooks();
dialog.showModal();