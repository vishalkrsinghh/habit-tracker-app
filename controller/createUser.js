let userCollection = require("../model/userModel");

let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

module.exports.create = async (req, res) => {

    try {
        let { name, email, password, cnfpassword } = req.body;
        name = name.toLowerCase();
        email = email.toLowerCase();
        password = password.toLowerCase();
        cnfpassword = cnfpassword.toLowerCase();

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


                    let saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashPassword = bcrypt.hashSync(password, salt);
                    let abc = await userCollection.create({ name, email, password: hashPassword });

                    // jwt.sign({},{},expiresIn:)
                    res.status(201).json({
                        message: "Created SuccessFully",
                        data: { abc }
                    })

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
    } catch (error) {
        res.status(500).json({
            Error: "Error in Creating, Server Error Error in code",
            data: { error }
        })
    }
}

module.exports.login = async (req, res) => {
    // console.log("refresh");
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        password = password.toLowerCase();

        if (email && password) {

            let user = await userCollection.findOne({ email });
            if (user) {

                let dbPassword = user.password;
                let isPasswordEqual = bcrypt.compareSync(password, dbPassword);

                if (isPasswordEqual) {

                    // genetate token and store in cookie.

                    // after all refresh ek naya token generate ho raha hai.
                    let token = jwt.sign(
                        { email: user.email, _id: user._id },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "60m" }
                    )
                    // console.log("token set from backend",token);
                    res.cookie('jwtToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true });  // 1000 means 1 sec, this cookie expires in 20 minutes as token expires in 20 minutes.

                    // instead of send Json send home page.
                    // res.status(201).json({
                    //     message: "Login SuccessFully",
                    //     data: { token } 
                    // })

                    let date = new Date();

                    let todayDate = date.getDate();
                    let currentMonth = date.getMonth()+1;
                    let currentYear = date.getFullYear();
                    // res.redirect("/home");
                    res.redirect(`/date/${todayDate}/?year=${currentYear}&&month=${currentMonth}`);

                } else {
                    res.status(400).json({
                        Error: "Email or Password are incorrect.",
                        data: {}
                    })
                }

            }
            else {
                res.status(400).json({
                    Error: "Account doesn't exist .",
                    data: {}
                })
            }

        } else {
            res.status(400).json({
                Error: "All fields are required.",
                data: {}
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Error: "Error in login, Error in Code, Server Side Error .",
            data: { error }
        })
    }
}