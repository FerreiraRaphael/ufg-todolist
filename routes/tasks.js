const router = require('express').Router({ mergeParams: true });
const { Task, Activity } = require('../models');
// const SaveController = require("../controllers/save.controller");
// const { currentUser } = require("../middlewares");

router.route('/').post(async (req, res) => {
  const task = await Task.create({
    ...req.params,
    done: false,
    title: req.body.title
  });
  await Activity.create({
    model: 'Task',
    owner: task.ListId,
    description: `A tarefa ${task.title} foi criada`
  });
  res.json(task);
});
router
  .route('/:TaskId')
  .put(async (req, res) => {
    const id = req.params.TaskId;
    const result = await Task.update(req.body, { where: { id } });
    const task = await Task.find({ where: { id } });
    await Activity.create({
      model: 'Task',
      owner: task.ListId,
      description: `A tarefa ${task.title} foi editada`
    });
    res.json(result);
  })
  .delete(async (req, res) => {
    const id = req.params.TaskId;
    const task = await Task.find({ where: { id } });
    const result = await Task.destroy({ where: { id } });
    await Activity.create({
      model: 'Task',
      owner: task.ListId,
      description: `A tarefa ${task.title} foi deletada`
    });
    res.json(result);
  });

module.exports = router;
