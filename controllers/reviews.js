const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Reviews");
const Bootcamp = require("../models/Bootcamp");
//*  @ Description Get Reviews
//*  @ Route       Get /api/v1/reviews
//*  @ Route       Get /api/v1/bootcamps/:bootcampId/reviews
//*  @ Access      Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId });
        return res
            .status(200)
            .json({ success: true, count: reviews.length, data: reviews });
    } else {
        res.status(200).json(res.advancedResults);
    }
});
//*  @ Description Get Single Review
//*  @ Route       Get /api/v1/reviews/:id
//*  @ Access      Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description",
    });
    if (!review) {
        return next(
            new ErrorResponse(`No review find with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: review });
});
