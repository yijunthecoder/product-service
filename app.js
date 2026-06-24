const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products'); //Import the module
const requestLogger = require('./middleware/logger'); // Import requestLogger middleware

// Load config
dotenv.config(); 

const app = express(); //creates the express app
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(requestLogger);

// Mount the routes
// Any request to /api/products will be handled by productRoutes
app.use('/api/products', productRoutes);

// Error handling for requestLogger (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Internal Server Error"});
});

app.listen(port, () => {
    console.log(`${process.env.SERVICE_NAME} running on http://localhost:${port}`);
});