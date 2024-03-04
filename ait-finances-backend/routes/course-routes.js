const { Router } = require("express");
const { getCourses, addCourse, removeCourse, updateCourse, getCourse } = require("../controllers/course-controller");

// const requireAuth = require("../middleware/require-auth");

const router = Router();

// router.use(requireAuth);

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", addCourse);
router.delete("/:id", removeCourse);
router.patch("/:id", updateCourse);

module.exports = router;
