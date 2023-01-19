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
npm i express express-session mongoose ejs bcrypt cookie-parser
```
- express
- express session
- mongoose
- ejs
- bcrypt
- cookie-parser

## Authentication vs. Authorization
- Authentication - Authentication is used by the server to verify who is accessing their web services. Typically, authentication is done with a username/password combination, but it can also be done with security questions, face recognition, fingerprint identification, etc.

- Authorization - Authorization is a process by which a server determines if the client has permission to use a resource or access a file on a web page. Generally, authorization is coupled with authentication. This includes verifying if a specific user has the permission to delete all posts on a website(are they admin/not an admin), delete all comments made by other users etc.

## Authentication
Let's look at authentication on an express app, by using the username/password combination to authenticate a user. A username and a password will need to be provided to access specific pages on our website.
## Passwords
- We will use a "salted one-way" hashing to ensure secure handling and non-storage of raw user passwords within a database.
  
- How to (not) store passwords. When storing passwords, It is generally considered inadvisable to store user passwords in their raw form within the database due to inherent security risks associated with the storage of sensitive information in an unencrypted format.
- One way to correctly store a user password to securely handle and store passwords within our database is through encryption. 
- We encrypt passwords by passing it to a hashing function then store the result on the database. This way, if someone tries to access the passwords they won't be able to read them.
- A hash function is a one way function, that maps data (of arbitrary size) to a unique fixed-sized string of characters, usually infeasible to invert. With hash functions, it is unlikely to find 2 outputs with the same value and a small change to the input, results in a large modification of the output.
- The output of the hash function is then stored within our database. We can add an extra layer of security on the output before storing it in our database by using "salts".
- A password salt is a randomly generated string of characters that is used as an additional input to our one-way hash function. 
- By adding a salt to our password, we fix the case where multiple users decided to use the same password. Before storing the passwords, we generate password salts, which will be different for every user, then add them to the input of our hashing function. 
- This will hash a different output which can then be stored on the database as a unique password for a specific user.
## Authorization
The basic use-case of Authorization that will be covered is selective access of pages on a web app. For this, we will use cookies and sessions. 
- Cookies are small blocks of data, sent by a web server to a client, that are stored in a client's browser when browsing a particular website.
- Once a website sends a cookie to a client, the browser will store and send back the cookie on every subsequent request to the website.
- We will use this functionality to employ authorization on our webapp. Once a client is successfully authenticated, a cookie will be sent to the client as part of the response.
- This cookie will be used everytime the user makes a request to our web app, as it will be part of the request.
- Instead of storing data using cookies in the browser, we will store the data on the server-side and then send the browser a cookie that can be used to retrieve the data. This will be done by using sessions.

## WorkFlow 
Ensure MongoDB is installed before following along. Install MongoDB on Windows [here](https://youtu.be/FwMwO8pXfq0).
### Install Dependacies

```
npm install express express-session bcrypt mongoose cookie-parser ejs ejs-mate
```
Create a directory that will host our application

```
mkdir app
cd app
``` 

Create the server.js file
```
touch server.js
```
All the necessary files that will be used have been added to the the followAlong folder. 