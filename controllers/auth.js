const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const errorHandler = require("../middleware/error");

//*  @ Description Register User
//*  @ Route       POST /api/v1/auth/register
//*  @ Access      Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(200).json({ success: true });
});
