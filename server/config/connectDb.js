import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async () => {
    try {
        let mongooseConnect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        let connectionState = mongooseConnect.connection.readyState;
        if (connectionState === mongooseConnect.ConnectionStates.connected) {
            console.log(`Database Connected`.bgGreen);
            console.log(`Database Server Running On ${mongoose.connection.host}`.bgCyan.white);
        }

    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}

export default connectDb ;