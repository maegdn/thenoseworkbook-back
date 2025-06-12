const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { connectTimeoutMS : 2000} )
.then(() => { console.log("Database connected successfully"); })
.catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
});