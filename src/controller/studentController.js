const result = require("../model/studentModel")


// add data // update Data
exports.addDataUpdateData = async (req,res) => {
    try{
        let {Name , Subject, Marks} = req.body
        let check = await result.findOne({
            where : { Name : Name , Subject : Subject},
        });
        if(check == null){
            let addData = await result.create(req.body)  // Create
            return res.status(201).send({status : true, message : "data added successfully", data : addData})
        }else{
            let marks = check.Marks + Marks
            await result.update(                         // Update
                { Marks : marks },
                {where: {Name : Name , Subject : Subject} 
            })
            let resultData = await result.findOne({ where : { Name : Name , Subject : Subject}})  //Get

            return res.status(200).send({status : true , message : `Marks of ${Marks} added to existing student` ,data : resultData})
        }

    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, err : err.message})
    }
}


// Get all students details
exports.findStudents = async function(req, res){
    try{
          let getStudentsDetails = await result.findAll();
        res.status(200).send({status : true,message : "List of all students details", data : getStudentsDetails})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, err : err.message})
    }
}



// delete students with name and subject
exports.deleteStudent = async function(req, res) {
    try{
        await result.destroy({where : {Name : req.body.Name , Subject : req.body.Subject}})
        res.status(200).send({status : true , message : `Student of name ${req.body.Name} and subject ${req.body.Subject} deleted Successfully`})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false , err : err.message})
    }
}