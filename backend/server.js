// Import/require modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware
const YAML = require('yamljs'); 
const swaggerUi = require('swagger-ui-express');
const path = require('path'); // Node.js path module
require('dotenv').config(); // Load environment variables

// Import routes
const authRoutes = require('./routes/authentication');
const dashboardRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies

// Serve Swagger UI
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Use routes with /authentication prefix
app.use('/authentication', authRoutes); // Routes for authentication
app.use('/user', dashboardRoutes); // Routes for user dashboard
app.use('/account', accountRoutes); // Routes for account


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
