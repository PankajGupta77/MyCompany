const mongoose=require('mongoose');
require('dotenv').config();
const connectdb=async ()=>{
    try{
    const db=await mongoose.connect(process.env.movie)
      // console.log('connect',db)
    }
    catch(err){
        console.log(err);
        process.exit(1);

    }
}
module.exports=connectdb