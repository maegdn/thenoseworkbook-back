const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 4444;

// middlewares
app.use(cors());
app.use(express.json());

// db connect
require('./models/connection'); 
require('./models/User');

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


// app.use((req, res, next) => {})

// Routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);

})
