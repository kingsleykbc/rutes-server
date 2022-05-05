# RUTES SERVER

GraphQL API server for the RUTES project. Src code includes schemas, data types, query ressolvers, and more.

## Tools used

| Tool          | Type     | Purpose                                 | Reference                                                                              |
| ------------- | -------- | --------------------------------------- | -------------------------------------------------------------------------------------- |
| JavaScript    | Language | Core language used for web applications |
| GraphQL       | Language | Querying the database                   | GraphQL (2022). graphql (16.3.0). https://github.com/graphql/graphql-js                |
| Firebase      | Service  | Chat server and database (Firestore)    | Google (2022). Firebase (v9.6.11). https://firebase.google.com/                        |
| Apollo Server | Library  | GraphQL implementation                  | Apollo (2022). apollo-server-express (v3.6.5). https://www.apollographql.com/          |
| Mongoose      | Library  | Schema definition for MongoDB           | Automattic (2022). mongoose (v6.2.11). https://mongoosejs.com/                         |
| Bcrypt        | Module   | Password encryption                     | Bcrypt (2022). bcrypt (5.0.1). https://github.com/kelektiv/node.bcrypt.js              |
| Jsonwebtoken  | Module   | Jsonwebtoken implementation             | Jsonwebtoken (2022). jsonwebtoken (v8.5.1). https://github.com/auth0/node-jsonwebtoken |
| Node mailer   | Module   | Sending emails                          | Node mailer (2022). nodemailer (v6.7.3). https://nodemailer.com/about/                 |

## Getting Started

Download or clone the repo, install dependencies with **`npm install`**, and run the server using node **`node index.js`** the below instructions:

Open [http://localhost:8080](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
