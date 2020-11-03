const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

// config hort
const port = process.env.PORT ||3000;
const DB = process.env.DATABASE;


const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
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