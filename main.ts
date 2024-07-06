import { Book } from "./book.ts";

let books: Book[] = [];
let currentId = 1;

async function mainMenu() {
    console.log("\nFavbook");
    console.log("1. List Books");
    console.log("2. Add Book");
    console.log("3. Edit Book");
    console.log("4. Delete Book")
    console.log("5. Exit");

    const choice = await prompt("Choose an option: ");
    switch (choice) {
        case "1":
            listBooks();
            break;
        case "2":
            await addBook();
            break;
        case "3":
            await editBook();
            break;
        case "4":
            await deleteBook();
            break;
        case "5":
            console.log("Goodbye!");
            Deno.exit(0);
        default:
            console.log("Invalid choice");
    }
}

function listBooks() {
    if (books.length === 0) {
        console.log("No books found.");
    } else {
        console.log("\nList of Books: ");
        books.forEach((book) => {
            console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}`);
        });
    }
}

async function addBook() {
    const title = await prompt("Enter book title: ");
    const author = await prompt("Enter book author: ");

    const newBook: Book = { id: currentId++, title, author };
    books.push(newBook);
    console.log("Book added successfully.");
}

async function editBook() {
    const id = parseInt(await prompt("Enter book ID to edit: "));
    const book = books.find((b) => b.id === id);

    if (book) {
        const title = await prompt(`Enter new title (current: ${book.title}): `);
        const author = await prompt(`Enter new author (current: ${book.author}): `);

        book.title = title || book.title;
        book.author = author || book.author;
        console.log("Book updated successfully.");
    } else {
        console.log("Book not found.");
    }
}

async function deleteBook() {
    const id = parseInt(await prompt("Enter book ID to delete: "));
    const index = books.findIndex((b) => b.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        console.log("Book deleted successfully.");
    } else {
        console.log("Book not found.");
    }
}

async function prompt(question: string): Promise<string> {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode(question));
    const n = <number>await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n)).trim();
}

while (true) {
    await mainMenu();
}