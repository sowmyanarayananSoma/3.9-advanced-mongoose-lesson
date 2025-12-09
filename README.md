# **Lesson 9 — Advanced Mongoose (Validation, Querying, Embedding, Referencing, Populate)**

### **Library Database Example: Authors • Books • Members**

This lesson teaches advanced Mongoose operations using a clean, realistic example: a **Library Management System** with three catalogs:

* **Authors**
* **Books**
* **Members**

Each section explains not only *what* the code does, but *why* these concepts matter in real applications.

---

# **SECTION 1 — Validation in Mongoose**

Validation ensures that the data entering your database is **correct, clean, and predictable**.
Mongoose provides several validation options built directly into your schema.

We demonstrate this using the **Author**, **Book**, and **Member** models.

---

## **1.1 Author Schema — Understanding Basic Validation**

```js
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,          // The author must have a name
    minlength: 3             // Prevents extremely short or meaningless names
  },
  birthYear: {
    type: Number,
    min: 1000,                // No one was born in year 200
    max: new Date().getFullYear() // Cannot be in the future
  },
  nationality: {
    type: String,
    enum: ["American", "Canadian", "Indian", "British", "Other"],
    default: "Other"
  }
});
```

### **Why this matters**

* `required` ensures critical fields are not empty.
* `min` and `max` prevent unrealistic or invalid data.
* `enum` restricts values to known categories.
* Real systems depend on trustworthy data — validation enforces that.

---

## **1.2 Book Schema — Combining Validation, Embedding, and Referencing**

```js
const reviewSchema = new mongoose.Schema({
  reviewerName: { type: String, minlength: 2 },
  rating: { type: Number, min: 1, max: 5 },
  message: { type: String }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  publishedYear: {
    type: Number,
    min: 1450,
    max: new Date().getFullYear(),
  },
  genre: {
    type: String,
    enum: ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Fantasy", "Poetry"],
  },
  pages: {
    type: Number,
    min: 1
  },

  // Referencing
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  },

  // Embedding
  reviews: [reviewSchema]
});
```

### **Why this matters**

* Books demonstrate **multiple validation types**.
* Books also demonstrate **complex data structures**:

  * **Referencing** (linking to an Author)
  * **Embedding** (storing reviews inside a Book document)
* This mirrors how real applications structure relational but semi-flexible data.

---

## **1.3 Member Schema — Practical Real-World Validation**

```js
const memberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, "Invalid email format"]
  },

  phone: {
    type: String
  },

  membershipId: {
    type: String,
    required: true,
    unique: true
  },

  postalCode: {
    type: String
  },

  joinedAt: {
    type: Date,
    default: Date.now
  },

  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }
  ]
});
```

### **Why this matters**

* Members introduce **identity fields**, **timestamps**, and **referencing books**.
* This is very close to how real membership systems work.
* Shows how validation + relationships work together.

---

# **SECTION 2 — Querying with `.find()`**

Querying allows us to retrieve specific data from our collections.
The most important method is **`.find()`**.

---

## **2.1 What `.find()` Does**

`.find()` searches a collection and returns all documents that match the filter.

### **No filter → returns everything**

```js
Book.find();
```

### **Filter by a field**

```js
Book.find({ genre: "Sci-Fi" });
```

### **Filter by a referenced field**

```js
Book.find({ author: authorId });
```

### **Why `.find()` is essential**

* All advanced search features (pagination, filtering, sorting) are built on it.
* You use it in every project involving a database.

---

# **SECTION 3 — Sorting, Filtering & Pagination**

Real web apps rarely return all data at once.
They return:

* filtered results,
* in a useful order,
* in chunks (pages).

---

## **3.1 Sorting**

```js
Book.find().sort({ publishedYear: -1 });
```

Meaning:

* `-1` = descending
* `1` = ascending

---

## **3.2 Pagination (skip + limit)**

```js
Book.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

This is exactly how Instagram, Netflix, YouTube, and Amazon load more items.

### Example

* page = 3
* limit = 10

Skip = `(3 - 1) * 10 = 20` → skip first 20 docs.

---

# **SECTION 4 — Understanding `.populate()`**

MongoDB stores only **IDs** when referencing documents.
Populate fetches the actual object and replaces the ID with full data.

---

## **4.1 Basic populate example**

```js
Book.find().populate("author");
```

### Without populate

```json
{
  "title": "Dune",
  "author": "67abc9123f..."
}
```

### With populate

```json
{
  "title": "Dune",
  "author": {
    "name": "Frank Herbert",
    "birthYear": 1920,
    "nationality": "American"
  }
}
```

---

## **4.2 Populate for Members Borrowing Books**

```js
Member.find().populate("borrowedBooks");
```

This transforms:

```json
"borrowedBooks": ["67ab...", "67cd..."]
```

into:

```json
"borrowedBooks": [
  { "title": "Dune", "genre": "Sci-Fi" },
  { "title": "The Hobbit", "genre": "Fantasy" }
]
```

### Why populate is powerful

* It simulates JOINs from relational databases.
* It makes API responses human-friendly.
* Essential for any project involving relationships.

---

# **SECTION 5 — Embedding vs Referencing**

These are the two main ways to structure related data in MongoDB.
Our Library example uses **both**, making it ideal for teaching.

---

## **5.1 Embedding (Reviews inside Books)**

```js
reviews: [reviewSchema]
```

### When to embed

* The child belongs ONLY to the parent.
* Child documents are **small and limited**.
* Fast read performance is required.

### Real-world examples

* Product → reviews
* Post → comments
* Order → list of purchased items

---

## **5.2 Referencing (Authors inside Books, Books inside Members)**

```js
author: { type: ObjectId, ref: "Author" }
```

```js
borrowedBooks: [{ type: ObjectId, ref: "Book" }]
```

### When to reference

* The child may be shared across many parents.
* The child is large and should not be duplicated.
* You need to query the child independently.

### Real-world examples

* Users → Orders
* Movies → Actors
* Books → Authors
* Members → Borrowed Books

---

# **SECTION 6 — In-Class Practice**

These exercises reinforce everything from today’s lesson.

---

## **Exercise 1: Create Authors and Books**

* Add two authors
* Add four books referencing those authors
* Add at least one embedded review to a book

---

## **Exercise 2: Querying Practice**

* Find all Sci-Fi books
* Find all books published after 2000
* Sort books by title
* Paginate the results

---

## **Exercise 3: Populate Practice**

* Show all books with author details
* Show members with borrowed books populated

---

## **Exercise 4: Borrowing System**

Create a route:

```js
PATCH /members/:id/borrow/:bookId
```

Students must:

* Add a book to a member’s borrowed list
* Return the updated member with populated books

---

# **Summary of What Students Learned**

By the end of this lesson, learners understand:

* How Mongoose validation works
* How to model real applications using embedding and referencing
* How `.find()` retrieves data and how to filter it
* How to implement sorting and pagination
* How `.populate()` joins related documents for meaningful API responses
* How to apply these concepts in a practical Library System

This example provides everything needed to build, query, and relate real-world data structures.
