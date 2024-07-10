import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    try {
        // Extract token from headers
        const {token} = req.headers;

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: "Access denied. Token not provided." });
        }

        // Verify the token
        jwt.verify(token, "myNameMerna", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token", error: err.message });
            }
            
       
            // Attach decoded user information to the request object
            req.user = decoded;

            // Move to the next middleware or route handler
            next();
        });
    } catch (error) {
        console.error("Token/role verification error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export { verifyToken };
