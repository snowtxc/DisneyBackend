const jwt = require("jsonwebtoken");
function verifyToken(request,response,next){
    const token = request.headers.authorization;
    
    if(token == null){
        response.status(401).send("No authorization!");
    }

    if(token == ''){
        response.status(401).send("No authorization!");
    }

    const decoded = jwt.decode(token,"user_key");

    console.log(decoded);

    if(decoded == null){
        response.status(401).send("No authorization");
    }

    next();

}

module.exports = verifyToken;