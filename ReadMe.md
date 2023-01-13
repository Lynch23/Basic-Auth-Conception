# Authentication & Authorization on a Web App. (Incomplete) Scheduled to be live on the 20 of January 2023 :(
 This repo will explain and demonstrate how to integrate basic authentication/authorization into a web app running on ExpressJS, NodeJS and mongoDB. This will set you to on a path to building your own secure apps. There will be an assignment at the end to apply all the concepts discussed.

## Concepts
- Dependacies
- Authentication vs. Authorization
- Authentication
- Passwords
  - How to (Not) Store Passwords
  - Understanding Hashing Functions
  - Basics of Bcrypt.
  - Bcrypt and Hashing functions
  - Password Salts
- Authorization
        - Sessions and Cookies (Brief explaination)
- Auth Demo

## Dependacies
To follow along make sure you have an in empty folder with these dependancies installed:
```markdown
npm i express express-session mongoose ejs bcrypt
```
- express
- express session
- mongoose
- ejs
- bcrypt

## Authentication vs. Authorization
- Authentication - This is verifying who the particular user is. Typically, authentication is done with a username/password combination, but it can also be done with security questions, face recognition, fingerprint identification, etc.

- Authorization - This is verifying what a particular user has access to. Generally, authorization is done after a user has been authenticated. This includes verifying if a specific user has the permission to delete all posts on a website(are they admin/not an admin), delete all comments made by other users etc.

## Authentication
Let's look at authentication on an express app, by using the username/password combination to authenticate a user. A username and a password will be needed to access specific pages on our website.
## Passwords
- Use a salted one-way hashing to ensure secure handling and non-storage of raw user passwords within a database.
When storing passwords, It is generally considered inadvisable to store user passwords in their raw form within the database due to inherent security risks associated with the storage of sensitive information in an unencrypted format. 
- One way to correctly store a user password
To securely handle and store passwords within our database we can use encryption. We encrypt passwords by using a hashing function before we store them on the database. This way, if someone tries to access the passwords they won't be able to read them.
- Hashing functions
A hash function is a one way function that, is infeasible to invert, that maps data (of arbitrary size) to a unique fixed-sized string of characters. Unlikely to find the 2 outputs with the same value and a small change to the input, results in a large modification of the output. The output of the hash function is then stored within our database. We can add an extra layer of security on the output before storing it in our database by using "Salts".
- Password salts


