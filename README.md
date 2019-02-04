# Predicate Builder
*Chris Klein*

### Tips
- Ensure nothing is running on ports 3000 or 3001 before starting
- When entering list input, separate terms with a comma (,)
- Form validation will disallow empty fields and validate numbers and emails

### Library Usages
Libraries pulled into this project outside of the standard stack for a React / Express application include:
- **SqlString** was used to compose the SQL statements on the server to avoid potential SQL injection
- **Bootstrap** was used as the primary means of styling components
- **Highlight.js** was used to provide syntax highlighting for the output

A full list of dependencies can be seen in the dependencies section below.

### Installation
```sh
$ npm install
```

### Execution
The Express server will run on port 3001
```sh
$ node src/server.js
```
The React app will run on port 3000
```sh
$ npm start
```

### Dependencies
- **Body Parser** - https://www.npmjs.com/package/body-parser
- **Bootstrap** - https://www.npmjs.com/package/bootstrap
- **Express** - https://www.npmjs.com/package/express
- **Highlight.js** - https://www.npmjs.com/package/highlight.js
- **jQuery** - https://www.npmjs.com/package/jquery
- **Popper.js** - https://www.npmjs.com/package/popper.js
- **React** - https://www.npmjs.com/package/react
- **React Bootstrap** - https://www.npmjs.com/package/react-bootstrap
- **React Dom** - https://www.npmjs.com/package/react-dom
- **React Highlight** - https://www.npmjs.com/package/react-highlight
- **React Scripts** - https://www.npmjs.com/package/react-scripts
- **SqlString** - https://www.npmjs.com/package/sqlstring
