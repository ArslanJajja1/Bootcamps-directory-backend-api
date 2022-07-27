const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ success: true, message: "Show all bootcamps" });
});
router.get("/:id", (req, res) => {
    res.json({
        success: true,
        message: `Show single bootcamp with id ${req.params.id}`,
    });
});
router.post("/", (req, res) => {
    res.json({ success: true, message: "Create a new bootcamp" });
});
router.put("/:id", (req, res) => {
    res.json({
        success: true,
        message: `Update a bootcamp with id ${req.params.id}`,
    });
});
router.delete("/:id", (req, res) => {
    res.json({
        success: true,
        message: `Bootcamp deleted with id ${req.params.id}`,
    });
});
module.exports = router;
