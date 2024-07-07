import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db: DB;

async function initializeDatabase() {
    db = new DB("books.db");
    await db.query(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT
        )
    `);
}

async function mainMenu() {
    console.log("\nFavbook");
    console.log("1. List Books");
    console.log("2. Add Book");
    console.log("3. Edit Book");
    console.log("4. Delete Book");
    console.log("5. Exit");

    const choice = await prompt("Choose an option: ");
    switch (choice) {
        case "1":
            await listBooks();
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

async function listBooks() {
    const books = await db.query("SELECT * FROM books");
    
    if (books.length === 0) {
        console.log("No books found.");
    } else {
        console.log("\nList of Books: ");
        books.forEach((book) => {
            console.log(`ID: ${book[0]}, Title: ${book[1]}, Author: ${book[2]}`);
        });
    }
}

async function addBook() {
    const title = await prompt("Enter book title: ");
    const author = await prompt("Enter book author: ");

    await db.query("INSERT INTO books (title, author) VALUES (?, ?)", [title, author]);
    console.log("Book added successfully.");
}

async function editBook() {
    const id = parseInt(await prompt("Enter book ID to edit: "));
    const book = await db.query("SELECT * FROM books WHERE id = ?", [id]);

    if (book.length > 0) {
        const newTitle = await prompt(`Enter new title (current: ${book[0][1]}): `) || book[0][1];
        const newAuthor = await prompt(`Enter new author (current: ${book[0][2]}): `) || book[0][2];

        await db.query("UPDATE books SET title = ?, author = ? WHERE id = ?", [newTitle, newAuthor, id]);
        console.log("Book updated successfully.");
    } else {
        console.log("Book not found.");
    }
}

async function deleteBook() {
    const id = parseInt(await prompt("Enter book ID to delete: "));
    const result = await db.query("DELETE FROM books WHERE id = ?", [id]);

    if (result) {
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

await initializeDatabase();
while (true) {
    await mainMenu();
}
