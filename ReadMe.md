# Fundamentals of Authentication & Authorization on a web app.
 This repo will explain and demonstrate how to integrate basic authentication/authorization into a web app running on ExpressJS, NodeJS and mongoDB. There will be an assignment at the end to apply all the concepts discussed.

## Concepts
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
Auth Demo

## Authentication vs. Authorization

- Authentication - This is verifying who the particular user is. Typically, authentication is done with a username/password combo, but it can also be done with security questions, face recognition, fingerprint identification, etc.

- Authorization - This is verifying what a particular user has access to. Generally, authorization is done after a user has been authenticated. This includes verifying if a specific user has the permission to delete all posts on a website(are they admin/not an admin), delete all comments made by other users etc.

## Authentication


