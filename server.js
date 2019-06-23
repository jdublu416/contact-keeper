const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();


//Init Middleware:
app.use(express.json({ extended: false }));

//Connect to database:
connectDB();

//Define Routes:
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production mode
if (process.env.NODE_ENV === 'production') {
  //set static folder to the build folder
  app.use(express.static('client/build'));
// use path to set the production path for index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
