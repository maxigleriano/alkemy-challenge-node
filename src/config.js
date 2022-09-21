require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    
    db: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST
    }
};