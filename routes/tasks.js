const router = require("express").Router({ mergeParams: true });
const { Task } = require("../models");
// const SaveController = require("../controllers/save.controller");
// const { currentUser } = require("../middlewares");

router.route("/").post(async function createTask(req, res) {
  const task = await Task.create({
    ...req.params,
    done: false,
    title: req.body.title
  });
  res.json(task);
});
router
  .route("/:TaskId")
  .put(async function updateTask(req, res) {
    const id = req.params.TaskId;
    const result = await Task.update(req.body, { where: { id } });
    res.json(result)
  })
  .delete(async function deleteTask(req, res) {
    const id = req.params.TaskId;
    const result = await Task.destroy({ where: { id } });
    res.json(result);
  });

module.exports = router;
