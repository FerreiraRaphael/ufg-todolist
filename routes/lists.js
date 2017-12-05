const router = require('express').Router({ mergeParams: true });
const { List, Task, Activity } = require('../models');
const taskRoutes = require('./tasks');
const { authMiddlaware, isCurrentUserMiddlaware } = require('./middlawares');

router
  .route('/')
  .get([
    ...authMiddlaware,
    isCurrentUserMiddlaware,
    async function fetchLists(req, res) {
      const lists = await List.findAll({
        where: { ...req.params }
      });
      res.json(lists);
    }
  ])
  .post([
    ...authMiddlaware,
    isCurrentUserMiddlaware,
    async function createList(req, res) {
      const list = await List.create({ ...req.body, ...req.params });
      await Activity.create({
        model: 'List',
        owner: list.id,
        description: `A lista ${list.title} foi criada`
      });
      res.json(list);
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
      const list = await List.find({ where: { id } });
      const result = await List.update(req.body, { where: { id } });
      await Activity.create({
        model: 'List',
        owner: list.id,
        description: `A lista ${list.title} foi editada`
      });
      res.json(result);
    }
  ])
  .delete([
    ...authMiddlaware,
    isCurrentUserMiddlaware,
    async function deleteList(req, res) {
      const id = req.params.ListId;
      const list = await List.find({ where: { id } });
      const result = await List.destroy({ where: { id } });
      await Activity.create({
        model: 'List',
        owner: list.id,
        description: `A lista ${list.title} foi deletada`
      });
      res.json(result);
    }
  ]);

router.route('/:ListId/activity').get([
  ...authMiddlaware,
  isCurrentUserMiddlaware,
  async function fetchList(req, res) {
    const id = req.params.ListId;
    res.json(
      await Activity.findAll({
        where: { owner: id },
        order: [['createdAt', 'DESC']]
      })
    );
  }
]);

router.use('/:ListId/task', taskRoutes);

module.exports = router;
