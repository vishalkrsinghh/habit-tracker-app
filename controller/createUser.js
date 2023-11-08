let userCollection = require("../model/userModel");

let bcrypt = require("bcrypt");

module.exports.create = async (req, res) => {
    console.log(req.body);
    let { name, email, password, cnfpassword } = req.body;

    if (name && email && password && cnfpassword) {

        let user = await userCollection.findOne({ email });

        if (user) {
            res.status(400).json({
                Error: "Email already exist, Please use different Email.",
                data: {}
            })
        }
        else {
            if (password == cnfpassword) {

                try {
                    let saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashPassword = bcrypt.hashSync(password, salt);
                    let abc = await userCollection.create({ name, email, password: hashPassword });
                    console.log(abc);

                    // jwt.sign({},{},expiresIn:)
                    res.status(200).json({
                        message: "Created SuccessFully",
                        data: { abc }
                    })

                } catch (error) {
                    res.status(400).json({
                        Error: "Error in Creating",
                        data: { error }
                    })
                }
            }
            else {
                res.status(400).json({
                    Error: "Password and Confirm password are not equal.",
                    data: {}
                })
            }
        }
    }
    else {
        res.status(400).json({
            Error: "All fields are Required.",
            data: {}
        })
    }
}