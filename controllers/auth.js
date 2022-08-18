const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const errorHandler = require("../middleware/error");

//*  @ Description Register User
//*  @ Route       POST /api/v1/auth/register
//*  @ Access      Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    sendTokenResponse(user, 200, res);
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
    sendTokenResponse(user, 200, res);
});

//*  @ Description Get Logged in User
//*  @ Route       POST /api/v1/auth/me
//*  @ Access      Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, data: user });
});

//*  @ Description Forgot Password
//*  @ Route       POST /api/v1/auth/forgotpassword
//*  @ Access      Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse("This user does not exist", 404));
    }
    //Get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/resetpassword/${resetToken}`;
    const message = `You are recieving this email because we have recieved request for reset password . Make a PUT request to : \n \n ${resetUrl}`;
    try {
        await sendEmail({
            email: user.email,
            subject: "Reset Password Token",
            message,
        });
        res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse("Email could not be sent", 500));
    }
});

//* Get Token from model,create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }
    res.status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, token });
};
