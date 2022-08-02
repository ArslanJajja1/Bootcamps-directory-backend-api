const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const errorHandler = require("../middleware/error");

//*  @ Description Register User
//*  @ Route       POST /api/v1/auth/register
//*  @ Access      Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    // Create token
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
});

//*  @ Description Login User
//*  @ Route       POST /api/v1/auth/login
//*  @ Access      Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    // Validate email and password
    if (!email || !password) {
        return next(
            new ErrorResponse(`Please provide email and password`, 400)
        );
    }
    // Check if user exists or not
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }
    // Check if password matches or not
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }
    // Create token
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
});
