

export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user; // assuming req.user is populated by your auth middleware
        if (user && user.role === requiredRole) {
            next(); // user has the required role, proceed to the next middleware or route handler
        } else {
            res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }
    };
};
