# Chat App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Running Locally

In the project directory, install dependencies with:

### `yarn`

Then start the application with:
### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Notes

- File structure follows Redux Toolkit's [suggested structure](https://redux.js.org/faq/code-structure)
- `activeMessageId` is used to toggle between _new message_ and _edit message_ modes.
- For efficiency, threads and messages are sorted on the initial page load, and then only when updates are made - so as not to sort on every render cycle.

## Improvements
If I had a bit more time, obvious improvements include:
 - Unit tests for the `chatsSlice` and `sortByRecent` util function.
 - Better solution for date formatting - using [Day.js](https://day.js.org/).
 - Make threads and messages messages tabbable - for keyboard navigation.
- Perhaps, do not re-sort messages when one is edited, as it could be confusing to flow of conversation. Instead, apply _edited_ badge/style to indicate that it has been edited, and keep messages in original order.
