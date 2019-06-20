const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => 
    res.json({msg:`Welcome to the Contact Keeper API`}));

//Init Middleware:
app.use(express.json({extended:false}));

//Connect to database:
connectDB();

//Define Routes:
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT,  () => console.log(`Server started on port ${PORT}`));