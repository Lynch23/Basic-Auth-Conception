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
In this repo, we will cover authentication on an express app, by using the username/password combination to authenticate a user.
