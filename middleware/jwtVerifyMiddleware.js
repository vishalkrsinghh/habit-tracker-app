let jwt= require("jsonwebtoken");
let userCollection= require("../model/userModel");

// for every request cookies comes with that request so this function/logic is for verify that cookie's token which is save at the time of login of the user. 
module.exports.auth= async (req,res,next)=>{

    try {
        let tokenFromClient= req.cookies.jwtToken;
        if(tokenFromClient){
            //// Verify the token 
            let decodedDataOfToken=await jwt.verify(tokenFromClient,process.env.JWT_SECRET_KEY);
            /// check user is exist or not.
            let isUser =await userCollection.findOne({_id:decodedDataOfToken._id});

            if(isUser){
                next();
            }else{
                res.redirect("/");
                // res.status(400).json({
                //     message:"invalid Token/ Unauthorised"
                // }) 
            }

        }
        else{
            res.redirect("/");
            // res.status(400).json({
            //     message:"Token not found/ Unauthorised "
            // })
        }
    } catch (error) {
        res.status(500).json({
            message:"Authentication Failed/Unauthorised"
        })
    }

}