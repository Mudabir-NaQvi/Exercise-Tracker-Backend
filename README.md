# Exercise-Tracker-Backend

## Description
This is the Exercise Tracker Application backend in which we have implemented rest api jwt authentication using MongoDB, Express, and Node JS. 

## Features
- User registration and login with JWT(Json Web Token) authentication.
- CRUD (Create, Read, Update, Delete) operations for exercises.
- User-specific exercising tracking and logging.
- Data persistance using MongoDB as the database.
- Api endpoints for interacting with frontend application.


## Technologies Used
- Node JS
  - A JavaScript runtime environment
- Express
  - Web framework for Node JS
- MongoDB
  - NoSQL database for data storage
- Mongoose
  - Object Data Modeling (ODM) to structure the data.
- JWT
  - Json Web Token (JWT) for authentication
- REST API
  - Api endpoint with POST, GET, PUT, and DELETE.
- Bcrypt
  - Used for hashing password to store in the db.
- jsonwebtoken
  - For JWT authentication
- cookie-parser
  - For storing cookie on the backend
- cors
  - Used to allow cross origin requests
- dotenv
  - Used for storing environment variables
- moment
  - Used to format date and time
## Getting Started

---
git clone https://github.com/Mudabir-NaQvi/Exercise-Tracker-Backend.git

```
// install dependenacies
npm install

```
```
// Configure environment variables
MONGO_URI="your URI here"
JWT_SECRET="your secret key"
```

## Features
- JWT authentication
- Created user api 
- Created activity api
- Categorized activities with it's activity types
- CRUD (Create, Read, Update, Delete) operations
- Created recent activities api
