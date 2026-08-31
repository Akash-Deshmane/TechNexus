const JWT = require('jsonwebtoken');

const key = process.env.JWT_SECRET || "TechNexusSecretKey";

function createToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload,key);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,key);
    return payload;
}

module.exports ={
    validateToken,
    createToken
};