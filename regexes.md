# **Lesson — Understanding Regular Expressions (Regex) in JavaScript**

### A Practical Introduction for Students Coming from Python/Java Backgrounds

Regex is one of the most powerful tools for working with text. While the core concepts remain the same across languages, JavaScript has its own syntax and style you must understand.

This lesson will give you a **step‑by‑step explanation**, starting from the basics and moving into practical patterns.

---

# ⭐ **1. What is Regex?**

Regex (Regular Expression) is a pattern used to search, validate, or extract text.

You already know this from Python/Java—but in JavaScript, regex is written using **slashes** instead of string literals.

### **JavaScript Regex Syntax**

```js
const pattern = /abc/;
```

No quotes required.

---

# ⭐ **2. Matching a Simple Word**

### Pattern

```js
/hello/
```

### Usage

```js
"hello world".match(/hello/);   // matches "hello"
```

If the word exists anywhere in the string → regex finds it.

---

# ⭐ **3. Character Sets: Choosing One Character From Several**

Character sets let you match ONE character out of many options.

### Pattern

```js
/[abc]/
```

Matches: **a**, **b**, or **c**.

### Example

```js
"cat".match(/[abc]/);  // matches "c"
```

### Ranges

```js
/[a-z]/   // any lowercase letter
/[A-Z]/   // any uppercase letter
/[0-9]/   // any digit
```

---

# ⭐ **4. Anchors — Start and End of Line**

These are critical for **exact format validation**.

### **^ — Start of string**

```js
/^hello/
```

Matches only if the string **starts** with "hello".

### **$ — End of string**

```js
/world$/
```

Matches only if the string **ends** with "world".

### Example

```js
/^hello world$/.test("hello world");  // true
/^hello world$/.test("well hello world!"); // false
```

---

# ⭐ **5. Quantifiers — One or More, Zero or More, Exact Counts**

Quantifiers control **how many times** something can repeat.

### **+ → One or More**

```js
/a+/   // "a", "aa", "aaa", ...
```

### **Example**

```js
"aaa".match(/a+/);   // matches "aaa"
```

---

### *** → Zero or More**

```js
/a*/   // "", "a", "aa", "aaa" ...
```

### Example

```js
"bbb".match(/a*/);   // matches "" (empty string)
```

---

### **? → Zero or One**

```js
/colou?r/
```

Matches:

* "color"
* "colour"

---

### **{n} → Exactly n times**

```js
/[0-9]{4}/   // exactly 4 digits
```

### **{n,} → At least n times**

```js
/[a-z]{3,}/  // 3 or more letters
```

### **{n,m} → Between n and m times**

```js
/[A-Z]{2,5}/ // between 2 and 5 uppercase letters
```

---

# ⭐ **6. Dot (.) — Match ANY Single Character**

```js
/a.b/
```

Matches:

* "acb"
* "a-b"
* "a1b"

Does NOT match:

* "ab"
* "abb" (too many characters in between)

---

# ⭐ **7. Escaping Special Characters**

Characters like `.` `+` `?` `*` `{` `}` `(` `)` `[` `]` `^` `$` `|` `/` have special meaning.
To match them literally, add a backslash:

### Example

```js
/\./     // matches a period
/\?/     // matches a question mark
/\$/     // matches the dollar sign
```

---

# ⭐ **8. Using Regex in JavaScript Code**

### **`test()`** → Returns true/false

```js
/hello/.test("hello world");  // true
```

### **`match()`** → Returns the match or null

```js
"hello world".match(/world/); // ["world"]
```

### **`replace()`** → Replace matched text

```js
"hello world".replace(/world/, "JS"); // "hello JS"
```

---

# ⭐ **9. Flags in JavaScript Regex**

Flags modify how a regex behaves.

### **i — Case‑insensitive**

```js
/hello/i
```

Matches: "HELLO", "Hello", "hElLo"

### **g — Global (match all occurrences)**

```js
/\d/g
```

Matches every digit in the string.

### **m — Multiline**

Useful for text with multiple lines.

### Example using flags

```js
"Hello HELLO hello".match(/hello/gi);
// ["Hello", "HELLO", "hello"]
```

---

# ⭐ **10. Practical Patterns for Students**

### Match an email (simplified)

```js
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Match a 10‑digit phone number

```js
/^\d{10}$/
```

### Match a password with at least 1 digit

```js
/^(?=.*\d).+$/

/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%])[A-Za-z09!@#$%]{8,}$/
```

### Match YYYY-MM-DD date

```js
/^\d{4}-\d{2}-\d{2}$/
```

---

# ⭐ **11. Key Differences from Python/Java**

### **1. JavaScript uses slashes, not strings**

Python:

```python
pattern = r"hello"
```

JavaScript:

```js
/hello/
```

### **2. No raw string prefix**

Python uses `r""` to escape less.
JavaScript uses `/regex/` literal = fewer escapes.

### **3. Methods are attached to Strings and RegExp objects**

* JS: `"abc".match(/a/)`
* Python: `re.match(pattern, string)`

### **4. Flags are added after the last slash**

```js
/hello/gi
```

---

# ⭐ **12. Summary**

By the end of this lesson, learners understand:

* How to match words and patterns
* Character sets and ranges
* Anchors (^ and $)
* Quantifiers (+, *, ?, {n})
* Dot operator for "any character"
* Escaping special characters
* JavaScript regex flags
* Using regex with `.match()`, `.test()`, `.replace()`
* Differences from Python/Java

This forms a complete foundation for using Regex confidently in JavaScript projects.
