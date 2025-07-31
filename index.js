const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./queries");
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const port = 3000;

app.use(cors());

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const error = new Error('Something went wrong');
  next(error);
});
// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send('Internal Server Error');
});

app.get("/", (req, res) =>
  res.json({ info: "Node.js, Express, and Postgres API" })
);
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);



passport.use(new LocalStrategy(
    function(username, password, done) {
        // Verify username and password
        // Call done(null, user) if authentication is successful
    }
));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
      return next();
  } else {
      return res.status(403).json({ message: 'Permission denied' });
  }
}

const { body, validationResult } = require('express-validator');

app.post('/users', [
    // add validation rules
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // Process the request
});