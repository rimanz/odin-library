const library = [];

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

