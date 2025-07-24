//your JS code here. If required.
let books = [];

      // Get form elements
      const form = document.getElementById("book-form");
      const titleInput = document.getElementById("title");
      const authorInput = document.getElementById("author");
      const isbnInput = document.getElementById("isbn");
      const bookList = document.getElementById("book-list");

      // Add book function
      function addBook(title, author, isbn) {
        const book = {
          id: Date.now(), // Simple ID generation
          title: title,
          author: author,
          isbn: isbn,
        };

        books.push(book);
        renderBooks();
      }

      // Remove book function
      function removeBook(id) {
        books = books.filter((book) => book.id !== id);
        renderBooks();
      }

      // Render books in table
      function renderBooks() {
        if (books.length === 0) {
          bookList.innerHTML = `
                    <tr class="empty-state">
                        <td colspan="4">
                            <div class="book-icon">📚</div>
                            <div>No books added yet. Start building your library!</div>
                        </td>
                    </tr>
                `;
          return;
        }

        bookList.innerHTML = books
          .map(
            (book) => `
                <tr class="fade-in">
                    <td>${escapeHtml(book.title)}</td>
                    <td>${escapeHtml(book.author)}</td>
                    <td>${escapeHtml(book.isbn)}</td>
                    <td>
                        <button class="btn delete" onclick="removeBook(${
                          book.id
                        })">
                            Clear
                        </button>
                    </td>
                </tr>
            `
          )
          .join("");
      }

      // Escape HTML to prevent XSS
      function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      // Form submit handler
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const isbn = isbnInput.value.trim();

        if (title && author && isbn) {
          addBook(title, author, isbn);

          // Clear form
          titleInput.value = "";
          authorInput.value = "";
          isbnInput.value = "";

          // Focus back to first input
          titleInput.focus();
        }
      });

      // Initial focus
      titleInput.focus();