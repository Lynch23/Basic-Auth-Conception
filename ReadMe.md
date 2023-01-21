# Authentication & Authorization on a Web App.
 This repo will explain and demonstrate how to integrate basic authentication/authorization into a web app running on ExpressJS, NodeJS and MongoDB. This tutorial will set you to on a path to building your own secure apps. There will be an exercise at the end to apply the concepts discussed.

# Concepts
- Getting Started
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
  - Sessions and Cookies
- Auth Demo
  
# Gettiing Started
Ensure MongoDB is installed before following along. Install MongoDB on Windows [here](https://youtu.be/FwMwO8pXfq0). To follow along, fork this repository at the top of the page.
- Then create a clone of the fork onto your local machine.
```
git clone https://github.com/Your-Github-Username/Basic-Auth-Conception.git
```

- Install the dependancies inside the followAlong folder, "npm install" will automatically install all dependancies listed inside the package-json file (example with npm)

```
npm install
```

Or you can install them manually.
# Dependancies
```markdown
npm i express express-session mongoose ejs bcrypt cookie-parser
```
- express
- express session
- mongoose
- ejs
- bcrypt
- cookie-parser

# Authentication vs. Authorization
- Authentication - is used by the server to verify who is accessing their web services. Typically, authentication is done with a username/password combination, but it can also be done with security questions, face recognition, fingerprint identification, etc.

- Authorization - Authorization is a process by which a server determines if the client has permission to use a resource or access a file on a web page. Generally, authorization is coupled with authentication. This includes verifying if a specific user has the permission to delete all posts on a website(are they admin/not an admin), delete all comments made by other users etc.

# Authentication
Let's look at authentication on an express app, by using the username/password combination to authenticate a user. A username and a password will need to be provided to access specific pages on our website.

# Passwords
- We will use a "salted one-way" hashing to ensure secure handling and non-storage of raw user passwords within the database.
  
- How to (not) store passwords. When storing passwords, It is generally considered inadvisable to store user passwords in their raw form within the database due to inherent security risks associated with the storage of sensitive information in an unencrypted format.
- One way to correctly store passwords to securely handle them within a database is through encryption. 
- We encrypt passwords by passing them to a hashing function then storing the output on the database. This way, if someone tries to access the passwords they won't be able to read them.
- A hash function is a one way function, that maps data (of arbitrary size) to a unique fixed-sized string of characters, usually infeasible to invert. With hash functions, it is unlikely to find 2 outputs with the same value and a small change to the input, results in a large modification of the output.
- Before the password is passed to the hash function. We can add an extra layer of security on the input by using password "salts".
- A password salt is a randomly generated string of characters that is used as an additional input to our one-way hash function. Since this salt is a randomly generated string, It will be different for any passwords that coincide in the database.
- Hence by adding a salt to our password, we fix the case where multiple users decided to use the same password. Before storing the passwords, we generate password salts, which will be different for every user, then add them to the input of our hashing function. 
- This will hash a different output which can then be stored on the database as a unique password for a specific user.
# Authorization
The basic use-case of Authorization that will be covered is selective access of pages on a web app. For this, we will use cookies and sessions. 
- Cookies are small blocks of data, sent by a web server to a client, that are stored in a client's browser when browsing a particular website.
- Once a website sends a cookie to a client, the browser will store and send back the cookie on every subsequent request to the website.
- We will use this functionality to employ authorization on our webapp. Once a client is successfully authenticated, a cookie will be sent to the client as part of the response.
- This cookie will be used everytime the user makes a request to our web app, as it will be part of the request.
- Instead of storing data using cookies in the browser, we will store the data on the server-side and then send the browser a cookie that can be used to retrieve the data. This will be done by using sessions.

# Web Application Introduction
This web app is built on expressJS and NodeJs. The database is MongoDB and the library used is Mongoose.
We will implement authentiation and authorization to this web app. The app will require users to register and login, to have access to/view the secret page. We will ensure the following functionalities are implemented;

- The sign up funtionality and storage of passwords correctly in our database.
- The login functionality where users that have been authenticated should be redirected to the secret page.
- Users that have not been authenticated should remain on the login page.
- Lastly the stay logged-in functionality, a user can interact with the secret page as long as they stay logged in. 

# Implementing Authentication and Authorization on an Express App
- Inside the server.js file inside the followAlong, has GET routes already implemented and fully functional except the secret page GET route handler. The POST route handlers for registration, login and logout have to be configured by implementing Authentication and Authorization correctly.

## Sign Up functionality
In applying the concepts discussed in this repo, we will use a hash function called "bcrypt" to hash our passwords before storing in the database. The sign-up POST route below is defined inside the server.js file.
```
app.post('/register', (req, res) => {});
```
Inside the POST route
- Destructure the username and password from the req.body.user.
- Use the bcrypt function "bcrypt.hash(user_password, saltRound)" which returns a hashed password, to hash the user's password.
- Then store the username and hashed password onto our mongo database.
- Once the user is successfully registered, send them to the secret page.
  
## Login functionality
Apply the log in functionality to our app using the bcrypt function "bcrypt.compare(password, hashedPassword)" which takes in the password entered on the log in form as the first argument and the saved hashed password from the database and returns a boolean. The log in POST route is defined already inside our server.js file. For the login functionality, you are advised to write a function and use it inside the route handler.
```
app.post('/login', (req, res) => {});
```
Inside the POST route, the function should;
- Find and save to a variable the user info that matches the username entered by the user. Using mongoose, the code should resemble
  ```
  User.findOne({ username })
  ```
- Then using bcrypt, compare the two passwords, bcrypt will determine the salt used when hashing the saved password automatically then compare the two passwords and return true or false.
- If the user is authenticated successfully, they should be redirected to the secret page, otherwise they should remain on the login page.
## How to stay logged in
We will use cookies and sessions to leave a user logged in until they log out of the secret page.
For this, we will use express session(already imported and integrated into the server.js). 
- Applying the logic to express session will be done inside the log-in and sign-up POST route handlers. 
- When a user is successfully authenticated or registered, we will send back a particular cookie that should launch a session. In the case of authenticating a user(log in), we will set the user's id on the req.session object. 
  ```
  req.session.userId = foundUser._id
  ```
- In the case of registering, we will set this after the new user has been saved to the database
  ```
  req.session.userId = user._id
  ```
- The cookie sent by express session will be a session id, it will have to be specific to a user. So we use the user._id from the database.
-  Everytime the user sends a request to our server, express will check if that session id has been modified or not. This session id will be erased from our cookies whenever express verifies that it has been tampered with. 
## Protecting the Secret Page
To complete the authorization functionality, inside the secret page's GET route handler, we will protect the secret page by controlling the access to it when a request is made. First thing when a request is made to the route '/secret', will be to check if the "req.session.user_id" exists, only then we will render the secret page to the user. In the case where it does not exists, we will redirect the user to the login page. 
## Logout functionality
Lastly, the logout functionality will be implemented inside the log out POST route handler already defined inside the server.js file. To logout a user, we will need to destroy the session we created by using "req.session.destroy()" method. Alternatively, we can set the "req.sesson.userId" to null. Then redirecting to '/login'. By doing so, the user no longer has access to the protected secret page and is logged out.

Impliment this functionality and that will mark the completion of this basic tutorial on Authentication and Authorisation.

# Reference links to help avoid issues with PR requests
- Creating your first pull request [https://github.com/Roshanjossey/first-contributions](https://github.com/Roshanjossey/first-contributions)
- Managing your forked Repo [https://help.github.com/articles/fork-a-repo/](https://help.github.com/articles/fork-a-repo/)
- This repo will not receive any further updates, all forks will be in sync. 

# FAQs (Frequently Asked Questions)🗺️
- Who can contribute to this project?
   Anyone with a github account and ready to jump into the world of open source projects
- Who is the author of this project?
   See my profile [here](https://github.com/Lynch23) 
- How can I contact you?
   [Github](https://github.com/Lynch23) | [twitter](https://www.twitter.com/marvels_agent_A)
