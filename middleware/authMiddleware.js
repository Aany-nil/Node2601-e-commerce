const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
 try {
    const { acc_tkn } = req.cookies;
    console.log(acc_tkn);

   const decoded = jwt.verify(acc_tkn, process.env.JWT_SEC);
   if(decoded) {
    req.user = decoded;
      next()
   } else{
    res.status(401).send({ message: "Unauthorized request" })
   }

 } catch (error) {
    res.status(401).send({ message: "Unauthorized request" })
 }
}

module.exports = { authMiddleware }