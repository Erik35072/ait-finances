const { Router } = require("express");

const { getGroups, addGroup, removeGroup, getGroup, updateGroup } = require("../controllers/group-controller");

// const requireAuth = require("../middleware/require-auth");

const router = Router();

// router.use(requireAuth);

router.get("/:id", getGroups);
router.get("/:id/:groupId", getGroup);
router.post("/:id", addGroup);
router.delete("/:id/:groupId", removeGroup);
router.patch("/:id/:groupId", updateGroup);

module.exports = router;
