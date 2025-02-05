// config/db.js
const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db('college_review_db');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = {
    connectDB,   // Export the connectDB function
    getDB        // Export the getDB function
};
