const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

// config hort
const port = process.env.PORT ||3000;
const DB = process.env.MONGO_URL;


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, (database) => console.log('Connected Database'));
    } catch (error) {
        console.log(error);
    }
};

connectDB();

app.listen(port,() =>{
    console.log(`App running port ${port}`);
});