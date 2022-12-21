const knex = require('../database/knex');

class TagsController {
  async index(req, res) {

    const user_id = req.params.user_id;

    const tags = await knex('tags')
      .where('user_id', user_id)
      .select('name')
      .groupBy('name')
      .orderBy('name');

    res.json(tags);
  }
}

module.exports = TagsController;