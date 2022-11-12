const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken');

const authJWT = (req,res,next) => {
    const authHeader = req.headers.authorization+'';
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,tokenSecret, (err,user)=>{
            if(err){ //Also checks if token is expired or not
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }else{
        res.sendStatus(401);
    }
}

module.exports = authJWT;