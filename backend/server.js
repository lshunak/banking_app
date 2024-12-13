// server.js
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
require('dotenv').config();

const { app } = require('./app');

// Swagger setup
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database connection
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Export for testing
module.exports = { app };