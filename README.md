# CodingChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Libraries

- [Angular material](https://github.com/angular/components) for material UI and components;
- [Angular Flex-layout](https://github.com/angular/flex-layout) to use a flex layout in pair with angular material;
- [ngx-avatar](https://github.com/HaithemMosbahi/ngx-avatar) to create an avatar based on user name initials;

## Auth

- username: **test@martinofenu.it**
- password: **1q2w3e4r**

## Coding Challenge

This project is based on an actual coding challenge for a job interview. It was required to use [jsonplaceholder](https://jsonplaceholder.typicode.com/) to build a blog with a login page to see the content.

### Requirements

- A simple login page with a form (username, password, and login button) that allows a user to authenticate, and prevent unauthorized users to navigate to other pages.
- A page that shows the list of all posts, in particular only the post’s title and the name of the author, and a preview of the body (one line). By clicking on a post, the user is redirected to the post’s details page.
- A page that shows the details of a post including title, author name, body, and the list of the related comments.
- A form with a text area and a button at the bottom of the post’s details page to allow the user to insert a new comment. The new comment must be sent to the server using the right POST API and then added after the other comments.
- Use Flexbox for styling the application layout.
- Use a loader indicator or the skeleton pattern to handle the loading state (e.g. data fetch via API).
- Handle error and empty states of API calls.
- Use services to encapsulate the business logic of the application.

### Development

To overcome some of the limitations of JSONplaceholder the author name for every comment is chosen random from the user list of the API (this is later used to generate an avatar based on the user name).
The API `/photos` endpoint is used to give an image to every post (association made on id).

### Authentication

Authentications is handled with firebase API. A token is stored in localstorage to auto-login the user on another visit or on a page reload.
It was not required to use a database so, to post a new comment, the authenticated user is hardcoded and the comments are not persistent.




