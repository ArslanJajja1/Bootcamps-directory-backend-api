const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const errorHandler = require("../middleware/error");

//*  @ Description Register User
//*  @ Route       POST /api/v1/auth/register
//*  @ Access      Public
exports.register = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true });
});
