const Userdb = require('../models/model');

// Create and Save user
exports.create = (req,res)=>{
   // validate request
   if(!req.body){
    res.status(400).send({message:"Content can not be empty!"});
    return;
   }

// New User
   const user = new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
   })
   //Save user in the database
   user
   .save(user)
   .then(data=>{
   //  res.send(data)
   res.redirect('/add-user')
   })
   .catch(err=>{
    res.status(500).send({
        message:err.message || "Some Error Occurred!"
    })
   })
}

//Retrieve And return all users/single user
exports.find =(req,res)=>{
   if(req.query.id){
      const id = req.query.id;
      Userdb.findById(id)
      .then(data=>{
         if(!data){
            res.status(404).send({message:"Not found User with id ="+id})
         }else{
            res.send(data)
         }
      })
      .catch(err=>{
         res.status(500).send({message:"Error retrieving with id = "+id})
      })
   }else{
     Userdb.find()
      .then(user=>{
         res.send(user)
      })
      .catch(err=>{
         res.status(500).send({message:err.message ||"error occurred!" })
      })
   }
  
}


// Update a new identified user by user id
exports.update =(req,res)=>{
   if(!req.body){
     return res.status(400).send({message:"Data to update can not be empty!"});
     }

     const id = req.params.id;
     Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
     .then(data=>{
      if(!data){
         res.status(404).send({message:`Cannot Update User with ${id}.Maybe User Not found`})
      }else{
         res.send(data)
      }
     })
     .catch(err=>{
      res.status(500).send({message:"Error Occurred!"})
     })
}

// delete a user with a specify user id in the request
exports.delete = (req,res)=>{
   const id = req.params.id;

   Userdb.findByIdAndDelete(id)
   .then(data=>{
      if(!data){
         res.status(404).send({message:`Cannot Delete with id ${id}.May be id is Wrong`})
      }else{
         res.send({message:"User Was Deleted Successfully!"})
      }
   })
   .catch(err=>{
      res.status(500).send({message:"Could not delete User with id =" +id});
   });
}