import mongoose from 'mongoose';

const connectDB = async () => {

    try {

        //Connection to DB
        const connection = await mongoose.connect(process.env.MONGO_URI);

        const url = `${connection.connection.host}:${connection.connection.port}`;

        console.log(`Mongo DB Conectado en: ${url}`);
        
    } catch (error) {
        console.log(`$error: ${error.message}`);
        process.exit(1);
    }

}

export default connectDB;