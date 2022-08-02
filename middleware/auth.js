const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//* Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    //* Make sure token exits
    if (!token) {
        return next(new ErrorResponse(`Not authorized this route`, 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded._id);
        console.log("user", req.user);
        next();
    } catch (error) {
        return next(new ErrorResponse(`Not authorized this route`, 401));
    }
});

//* Give Access to specific roles

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `${req.user.role} not authorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};
