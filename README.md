# Book Practice

A sign-up/login page followed by a landing page displaying books. Users can favorite books by clicking them!

## Setup

Make sure to install the dependencies:

```bash
npm install
```

To run the GUI:

```bash
npm run dev
```

The API:

https://github.com/book-io/web-interview-project-signup-wizard

## Usage
First time users will need to sign up w/ a username and password. Returning users can choose instead to login using exisiting username and password. Books page offers many titles which can be added to a users favorites by clicking.

## The Future

- Better signup feedback, validation for username availability, password length, add a "confirm password" field with icons verifying a match
- Hashing user passwords
- Better login feedback, error for invalid or incorrect username, failed login request. Loading state while fetching books, favoroites etc.
- Rework favoriting functionality. Outline heart icon on all books to give user an indication of the favoriting functionality. Pop up w/ text or animation on click.
- Address bug where a logged in user w/ a known favorite book cannot un-favorite that book (visually, in that initial rendering) w/o favoriting another book, backing out of the page and revisiting
- Persist logged in state, provide breadcrumbs for logging out, allow revisiting books page w/o it going blank
- Either eliminate ability to favorite multiple books or (better) update the api to accept multiple favorites
- Responsive design
- Sorting functionality for books, alphabetical, author name, favorites etc.

