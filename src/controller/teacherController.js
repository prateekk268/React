const User = require("../model/teacherModel");

const bcrypt = require('bcrypt')

// --------------------------------------------------------------------------------------------------------
exports.createUser = async function (req, res){
    try{
        const hashedPassword = await bcrypt.hash(req.body.PASSWORD, 10)

        const userData = {
            UserName: req.body.Name,
            Password : hashedPassword,
        }
        let saveUser = await User.create(userData);
        res.status(201).send({status : true, message : "data Inserted Successfully", data : saveUser})

    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, err : err.message})
    }
}


//---------------------------------------------------------------------------------------------------------------------------------------
const jwt = require("jsonwebtoken");
const { and } = require("sequelize");


exports.loginUser = async function(req, res){
    try{
        let {UserName, Password} = req.body
        let check = await User.findOne({
            where : {UserName : UserName}
        });
        if(check == null) return res.status(404).send({status : false , message : "No such user, Please enter valid credential"});

        let compare = await bcrypt.compare(Password, check.Password);
        if (!compare) return res.status(404).send({ status: false, message: "Password is incorrect" })

        let token = jwt.sign({ id: check.id }, "tailWebs", { expiresIn: '3600s' });
        res.status(200).send({ status: true, message: "User login successfully", bearerToken: token });


    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, err : err.message})
    }
}