// insert_books.js - Script to populate MongoDB with sample book data using African authors

const { MongoClient } = require('mongodb');

// Connection URI (change this if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data with African authors
const books = [
  {
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    genre: 'Fiction',
    published_year: 1958,
    price: 14.99,
    in_stock: true,
    pages: 209,
    publisher: 'Heinemann'
  },
  {
    title: 'So Long a Letter',
    author: 'Mariama Bâ',
    genre: 'Epistolary Fiction',
    published_year: 1979,
    price: 12.50,
    in_stock: true,
    pages: 96,
    publisher: 'Heinemann'
  },
  {
    title: 'Weep Not, Child',
    author: 'Ngũgĩ wa Thiong\'o',
    genre: 'Historical Fiction',
    published_year: 1964,
    price: 10.99,
    in_stock: true,
    pages: 136,
    publisher: 'East African Publishing House'
  },
  {
    title: 'Purple Hibiscus',
    author: 'Chimamanda Ngozi Adichie',
    genre: 'Coming-of-age Fiction',
    published_year: 2003,
    price: 18.00,
    in_stock: false,
    pages: 307,
    publisher: 'Algonquin Books'
  },
  {
    title: 'Season of Migration to the North',
    author: 'Tayeb Salih',
    genre: 'Postcolonial Fiction',
    published_year: 1966,
    price: 13.50,
    in_stock: true,
    pages: 139,
    publisher: 'Heinemann'
  },
  {
    title: 'The Hairdresser of Harare',
    author: 'Tendai Huchu',
    genre: 'Literary Fiction',
    published_year: 2010,
    price: 11.99,
    in_stock: true,
    pages: 212,
    publisher: 'Weaver Press'
  },
  {
    title: 'Americanah',
    author: 'Chimamanda Ngozi Adichie',
    genre: 'Fiction',
    published_year: 2013,
    price: 20.00,
    in_stock: true,
    pages: 477,
    publisher: 'Knopf'
  },
  {
    title: 'Half of a Yellow Sun',
    author: 'Chimamanda Ngozi Adichie',
    genre: 'Historical Fiction',
    published_year: 2006,
    price: 17.50,
    in_stock: true,
    pages: 433,
    publisher: 'Fourth Estate'
  },
  {
    title: 'The Beautyful Ones Are Not Yet Born',
    author: 'Ayi Kwei Armah',
    genre: 'Political Fiction',
    published_year: 1968,
    price: 12.00,
    in_stock: false,
    pages: 183,
    publisher: 'Heinemann'
  },
  {
    title: 'Kintu',
    author: 'Jennifer Nansubuga Makumbi',
    genre: 'Epic Fiction',
    published_year: 2014,
    price: 19.99,
    in_stock: true,
    pages: 446,
    publisher: 'Transit Books'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Drop collection if it already exists
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already has ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

