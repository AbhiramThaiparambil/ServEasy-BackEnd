import { config } from 'dotenv';
import mongoose from 'mongoose'
config()
const mongoDburl =process.env.MONGOURL

async function dbConnect(){
    try {
       const crr=await mongoose.connect(mongoDburl+"")
       console.log(crr.connection.host);
       
    } catch (error) {
        console.log(error);
        
    }
}

export default dbConnect