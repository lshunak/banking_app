// Import/require modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware
const YAML = require('yamljs'); 
const swaggerUi = require('swagger-ui-express');
const path = require('path'); // path module to work with file and directory paths
require('dotenv').config(); // Load environment variables

// Import routes
const authRoutes = require('./routes/authentication'); 
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const transactionRoutes = require('./routes/transaction');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (for frontend to access backend)
app.use(bodyParser.json()); // Parse JSON bodies, to get data from POST requests

// Serve Swagger UI
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // makes the Swagger UI accessible at the /api-docs URL path.


// Routes. Middleware to handle requests
app.use('/authentication', authRoutes); // Routes for authentication
app.use('/user', userRoutes); // Routes for user dashboard
app.use('/account', accountRoutes); // Routes for account
app.use('/transaction', transactionRoutes); // Routes for account


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
