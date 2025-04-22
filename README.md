# Blogging Platform API

This is my first backend project, a RESTful API for a blogging platform built with Node.js and Express. This project is based on the [roadmap.sh Blogging Platform API project](https://roadmap.sh/projects/blogging-platform-api).

## Features

- Create, read, update, and delete blog posts
- Support for post categories and tags
- Timestamp tracking for post creation and updates

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd blogging-platform-api
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

Start the development server:
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Posts

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a single post by ID
- `POST /posts` - Create a new post
  - Required fields: `title`, `content`
  - Optional fields: `category`, `tags`
- `PUT /posts/:id` - Update a post's content
- `DELETE /posts/:id` - Delete a post

### Search

- `GET /query` - Search posts with filters
  - Query parameters:
    - `query`: General search across all string fields
    - `tag`: Filter by tag
    - `title`: Filter by title
    - `category`: Filter by category

## Project Structure

```
blogging-platform-api/
├── app.js              # Main application file
├── routes/             # API routes
│   ├── postsApi.js     # Posts endpoints
│   └── queryApi.js     # Search endpoints
├── dummy-data.js       # Sample data
├── date.js            # Utility functions
└── package.json       # Project dependencies
```

## Technologies Used

- Node.js
- Express.js
- Nodemon (for development)

## License

ISC 