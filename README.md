# Expense Tracker API

A simple REST API built using **Node.js, Express.js, and MongoDB** to manage daily expenses.

## Features

- Add a new expense
- View all expenses
- View an expense by ID
- Update an expense
- Delete an expense
- Filter expenses by date
- Pagination support
- View expense summary using aggregation
- Input validation and error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator
- dotenv


## API Endpoints

Base URL: `http://localhost:5000/api/notes`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all expenses |
| GET | `/:id` | Get an expense by ID |
| POST | `/` | Add a new expense |
| PUT | `/:id` | Update an expense |
| DELETE | `/:id` | Delete an expense |
| GET | `/summary` | Get expense summary |

### Example: Add an Expense

Send a `POST` request to `/api/notes` with this JSON body:

```json
{
  "amount": 500,
  "category": "Food",
  "date": "2026-10-24"
}
```

### Example: Get Expense Summary

Send a `GET` request to:

```text
http://localhost:5000/api/notes/summary
```

The summary includes total expenses, expense count, and average expense.

### Example: Filter by Date

```text
GET /api/notes?date=2026-10-24
```

### Example: Pagination

```text
GET /api/notes?page=1&limit=10
```

## Project Structure

```text
Exprense App/
├── middleware/
│   └── errorHandle.js
├── models/
│   └── Exp.js
├── routes/
│   └── notes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Author

Developed as a backend development project for learning REST APIs, CRUD operations, MongoDB, and Express.js.