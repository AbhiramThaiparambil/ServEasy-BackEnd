import mongoose from 'mongoose'
const mongoDburl ="mongodb://localhost:27017/ServEasy"
async function dbConnect(){
    try {
       const crr=await mongoose.connect(mongoDburl)
       console.log(crr.connection.host);
       
    } catch (error) {
        
    }
}

export default dbConnect