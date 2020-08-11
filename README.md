[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Hype-Board Client

Hype-Board is a message board application built using a React frontend framework.

To sign up for an account, a user simply needs to provide an email and password.

Once signed-in, the authenticated user can navigate the page to create a post, view all posts, and view all other users and their posts on the app.

- When a user clicks on the title of a specific post, they are redirected to another page that displays the post with all its comments.

- Additionally, the user has the option to update the post, delete the post, or add a comment.

- However, any actions that involve manipulating a specific resource (posts, comments) must be owned by the user.


## Setup Instructions
1. Fork and clone this repository.
2. Run ```npm install``` to install all dependencies.
3. Run ```npm start``` to open up the development enviornment

## Links
-   Deployed Client: https://andrew-chun.github.io/hype-board-client/
-   Hype-Board API Repo: https://github.com/Andrew-Chun/hype-board-api
-   Deployed Hype-Board API: https://hype-board.herokuapp.com/

## Planning Story
The MVP for this project was to have authenticated users be able to CRUD posts.

I started by adding a Create Post form with a authenticated route/link in the navbar. Then, I made an Index Posts route in the navbar to show/retrieve all the posts in the database. I added a link to the title of each post to redirect to the PostShow component, where Users have the option to update or delete the specified post.

Once meeting the requirements for MVP, I decided to add comments to specific posts to enable more functionality for the user. Rather than creating another route in the navbar, I chose to add comments directly into the PostShow component so that the comments would appear directly below the specific post.

Then, I added a feature for users to view all other users on the platform and view the specific posts made by the selected user.

Perhaps the most challenging part of this project was making API requests to a Django backend server from a React frontend framework. Furthermore, routing and passing props between components became quite a challenge when having to keep track of numerous authenticated routes.

### User Stories
-   As a user, I would like to sign in with email and password.
-   As a user, I would like to change password and sign out.
-   As a user, I would like to create, view, update, and delete my posts to the message board.
-   As a user, I want to be able to make comments on other user’s posts
-   As a user, I would like to see all my posts on the message board.
-   As a user, I would like to view all other users' posts on the message board.
-   As a user, I would like to comment on other users' posts on the message board.
-   As a user, I would like to edit/delete my comment on other users' posts on the message board.

### List of Technologies Used
-   HTML
-   CSS
-   JavaScript
-   React
-   Axios
-   Boostrap

### Future Iterations
-Allowing users to comment on comments

-Adding categories or topics and add posts to specific category or topic

-Allow users to tag posts

## Images
App Screenshot:
![Hype-Board Screenshot](https://i.imgur.com/9wh9jJD.png)
![Hype-Board Screenshot2](https://i.imgur.com/qv8wQA5.png)

![Hype-Board Landing Page](https://i.imgur.com/flcSDv2.png)

![Hype-Board Main Page](https://i.imgur.com/A2w4YeE.png)
