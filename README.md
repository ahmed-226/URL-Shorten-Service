# URL Shortening Service

This is a URL shortening service built with Node.js, Express, and MongoDB. It allows users to shorten long URLs and redirect to the original URLs using the shortened codes.

## Features

- Shorten long URLs
- Redirect to original URLs using shortened codes
- MongoDB for storing URLs
- Mongoose for schema validation and indexing

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ahmed-226/URL-Shorten-Service.git
    cd URL-Shorten-Service
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following environment variables:
    ```env
    DB_NAME='TinyURL'
    MONGODB_URI=<database uri>
    PORT=<port>
    ```

4. Start the MongoDB server:
    ```sh
    mongod
    ```

5. Start the application:
    ```sh
    npm start
    ```

## API Endpoints

  
### Shorten URL

- **POST /api/shorten**

    Shortens a long URL.


    ```http
    POST http://localhost:3000/api/shorten
    Content-Type: application/json

    {
      "longUrl": "https://www.example.com"
    }
    ```

    Response:
    ```json
    {
      "shortCode": "sha256example"
    }
    ```
    

### Redirect to Long URL

- **GET /api/:shortCode**

    Redirects to the original long URL using the shortened code.

    ```http
    GET http://localhost:3000/api/abc1234
    ```
