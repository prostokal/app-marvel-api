
### Link https://app-marvel-api.vercel.app/

#### Marvel Catalog (Characters and Comics)

This application was created to view information about characters and comics. The application’s structure is well-organized, and the code has been optimized, resulting in the creation of a custom hook responsible for server requests (in this case, requests to the **Marvel API**). This hook also includes functionality for handling loading and errors during requests (`loading, error` and internal states responsible for these).

The file structure is divided into the following folders:

**components** - responsible for the UI component;

**hooks** - custom hooks that minimize boilerplate code;

**resources** - static images that do not change;

**services** - files responsible for processing server requests.

This application handles component states: when no character is selected, a skeleton is displayed; during loading, a *Spinner* is shown; and when loading is complete, the content is displayed. 
This application uses routing that directs to different **URL**s. There are two main URLs: **main** and **/comics**. (
To navigate to individual comics, routing is based on **ID**; **example**: `/comics/:id`).
A **404** error is also handled, which redirects to a page notifying the user of an invalid **URL**



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### `npm start`

The page will reload when you make changes.\
You may also see any lint errors in the console.
### `npm run build`
