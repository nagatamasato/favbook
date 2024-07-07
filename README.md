# Favbook CLI Application

Favbook is a simple Command-Line Interface (CLI) application for managing a collection of books. The application allows you to list, add, edit, and delete books in your collection. This README provides an overview of the application and instructions on how to run and use it.

## Features

- **List Books**: Display all the books in your collection.
- **Add Book**: Add a new book to your collection.
- **Edit Book**: Modify the details of an existing book.
- **Delete Book**: Remove a book from your collection.
- **Exit**: Exit the application.

## Prerequisites

- Deno: Ensure that you have Deno installed on your system. You can download and install it from [deno.land](https://deno.land/).

## How to Run

1. Clone the repository or download the source code.
2. Navigate to the directory containing the source code.
3. Run the application using the following command:

   ```sh
   deno run --allow-read --allow-write main.ts

## Usage

- Upon running the application, you will be presented with a menu with the following options:

1. List Books:
- Displays a list of all books currently in the collection.
- If there are no books, a message indicating that no books were found will be displayed.

2. Add Book:
- Prompts you to enter the title and author of the book you wish to add.
- Adds the book to the collection and confirms the addition.

3. Edit Book:
- Prompts you to enter the ID of the book you wish to edit.
- If the book is found, you can update its title and author.
- Confirms the update or notifies you if the book was not found.

4. Delete Book:
- Prompts you to enter the ID of the book you wish to delete.
- If the book is found, it is removed from the collection and the deletion is confirmed.
- Notifies you if the book was not found.

5. Exit:
- Exits the application with a goodbye message.

## Code Explanation

The application is written in TypeScript and uses Deno for runtime. Below is a brief overview of the key parts of the code:

- Book Interface: The Book interface defines the structure of a book object, which includes an id, title, and author.

- Global Variables:
    - books: An array to store the collection of books.
    - currentId: A counter to assign unique IDs to new books.

- Main Menu Function:
    - Displays the main menu and handles user input to navigate through different options.

- List Books Function:
    - Lists all books or notifies if no books are found.

- Add Book Function:
    - Prompts the user for book details and adds the book to the collection.

- Edit Book Function:
    - Prompts the user for the book ID and new details to update the book.

- Delete Book Function:
    - Prompts the user for the book ID and deletes the book if found.

- Prompt Function:
    - A helper function to get user input from the command line.

- Infinite Loop:
    - Continuously displays the main menu until the user chooses to exit.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

This README provides a comprehensive overview of the Favbook CLI application, including its features, how to run it, and a brief explanation of the code. Adjust the content as needed based on any additional specifics or customizations you may have.

# Changelog

## v1.1

- Implemented data persistence using JSON files
- Added functionality to save and load book data from a JSON file

## v1.0

- Initial release
- Basic book management functionality
  - Add books
  - Edit books
  - Delete books
  - List books