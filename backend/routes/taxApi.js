const express = require("express");
const router = express.Router();
const TaskController = require("../controller/taskController");

router.get("/tasks", TaskController.getAll);
router.get("/tasks/:id", TaskController.detail);
router.post("/tasks", TaskController.insert);
router.put("/tasks/:id", TaskController.update);
router.delete("/tasks/:id", TaskController.delete);

module.exports = router;
