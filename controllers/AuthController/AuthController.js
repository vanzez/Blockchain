var Account = require('../../models/Account');
var Bcrypt = require('../../Utilities/BCrypt');
var jwt = require('../../Utilities/JWToken')

class AuthController {
   static doLogin(req, res, next){
       var username = req.body.username;
       var password = req.body.password;

       Account.findOne({username:username}, (err, account)=>{
           if(err) throw new Error(err)
           if(!account){
               res.send({
                   success: false,
                   message:'Authentication failed. User not found.'
               });
           } else {
               Bcrypt.compare(password, account.password, (err, isMatch) => {
                   if(isMatch) {
                       if(!account.isActivated)
                           res.status(200).json({success: false, message: 'Account has not activated yet'})
                       else{
                           const payload = {
                               user: account
                           }
                           var token = jwt.create({username: account.username, _id:account._id});
                           res.send({
                               success: true,
                               message: 'Authentication success',
                               token: token
                           })
                       }

                   } else{
                       res.send({
                           success: false,
                           message: 'Authentication fail, wrong password'
                       })
                   }
               })
           }
       })
   }

   static doActivate(req, res, next){

   }
}

module.exports = AuthController;