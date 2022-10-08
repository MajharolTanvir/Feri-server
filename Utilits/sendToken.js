const sendToken = (user , statusCode , res) =>{
      const token = user.getJWTtoken()
      // options for cookie
        
          res.status(statusCode).json({
            success: true,
            user,
            token,
          });

}

module.exports = sendToken