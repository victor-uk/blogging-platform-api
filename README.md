# Blogging Platform API

A RESTful API for a blogging platform built with Node.js and Express.

## Project Structure

```
blogging-platform-api/
├── app.js                 # Main application file
├── controllers/
│   └── useControllers.js  # Controller functions for post operations
├── routes/
│   ├── postsApi.js        # Routes for post operations
│   └── queryApi.js        # Routes for query operations
├── dummy-data.js          # Sample data for testing
├── date.js               # Utility for date operations
└── README.md             # Project documentation
```

## API Endpoints

### Posts API (`/api/v1/posts`)

- `GET /` - Get all posts
- `GET /:id` - Get a single post by ID
- `POST /` - Create a new post
- `PUT /:id` - Update a post
- `DELETE /:id` - Delete a post

### Query API (`/api/v1/query`)

- `GET /` - Search and filter posts
  - Query Parameters:
    - `search`: Search across all string fields
    - `tag`: Filter by tags
    - `category`: Filter by category

## Features

- RESTful API design
- CRUD operations for blog posts
- Search and filter functionality
- Error handling
- Input validation
- Case-insensitive search
- Tag-based filtering
- Category-based filtering

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. The API will be available at `http://localhost:5000`

## API Usage Examples

### Create a Post
```bash
POST /api/v1/posts
{
  "title": "My First Post",
  "content": "This is the content of my first post",
  "category": "Technology",
  "tags": ["javascript", "nodejs"]
}
```

### Search Posts
```bash
GET /api/v1/query?search=javascript&tag=nodejs&category=Technology
```

## Error Handling

The API includes proper error handling for:
- Invalid input data
- Not found resources
- Duplicate posts
- Missing required fields

## Response Format

All responses follow a consistent format:
```json
{
  "success": true/false,
  "data": [...],
  "msg": "Optional message"
}
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Technologies Used

- Node.js
- Express.js
- Nodemon (for development)

## License

ISC 