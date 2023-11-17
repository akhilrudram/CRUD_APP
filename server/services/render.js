const axios = require('axios');

exports.homeRoutes = (req, res)=>{
    // Make a get request to /api/users
    axios.get('https://medisyncelite.onrender.com/api/users')
    .then((response) => {
        console.log('API Response:', response.data);
        res.render('index',{users:response.data});
    }).catch((err) => {
        console.log('API Error:', err);
        res.send(err)
    });
    
}

exports.add_user = (req,res)=>{
    res.render('add_user');
}
exports.update_user = (req,res)=>{
    const userId = req.query.id;
  
    console.log('Fetching user data for update. User ID:', userId);

    axios.get('https://medisyncelite.onrender.com/api/users',{ params : {id:userId}})
    .then(function(userdata){
        console.log('Fetched user data for update:', userdata.data);
        res.render("update_user",{user:userdata.data})
    })
    .catch(err=>{
        console.log('Error fetching user data for update:', err);
        res.send(err)
    })
}