const router = require('express').Router({ mergeParams: true });
const { List, Task } = require('../models');
const taskRoutes = require('./tasks');
const { authMiddlaware, isCurrentUserMiddlaware } = require('./middlawares');

router
  .route('/')
  .get([
    ...authMiddlaware,
    isCurrentUserMiddlaware,
    async function fetchLists(req, res) {
      const lists = await List.findAll({
        where: { ...req.params },
        include: [Task]
      });
      res.json(lists);
    }
  ])
  .post([
    ...authMiddlaware,
    isCurrentUserMiddlaware,
    async function createList(req, res) {
      res.json(await List.create({ ...req.body, ...req.params }));
    }
  ]);

router
  .route('/:ListId')
  .get([
    ...authMiddlaware,
    isCurrentUserMiddlaware,
    async function fetchList(req, res) {
      const id = req.params.ListId;
      res.json(await List.find({ where: { id }, include: [Task] }));
    }
  ])
  .put([
    ...authMiddlaware,
    isCurrentUserMiddlaware,
    async function updateList(req, res) {
      const id = req.params.ListId;
      const result = await List.update(req.body, { where: { id } });
      res.json(result);
    }
  ])
  .delete([
    ...authMiddlaware,
    isCurrentUserMiddlaware,
    async function deleteList(req, res) {
      const id = req.params.ListId;
      const result = await List.destroy({ where: { id } });
      res.json(result);
    }
  ]);

router.use('/:ListId/task', taskRoutes);

module.exports = router;
