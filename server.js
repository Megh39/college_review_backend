const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./config/db');  // Import connectDB function
console.log(__dirname);
console.log(require.resolve('./config/db'));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB before starting the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => console.error('Failed to start server:', err));
