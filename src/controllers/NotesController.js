const knex = require('../database/knex');

class NotesController {
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    try {
      const note_id = await knex('notes').insert({
        title,
        description,
        user_id,
      }).returning('id');

      const linksInsert = links.map(link => ({ note_id, url: link }));
      await knex('links').insert(linksInsert);

      const tagsInsert = tags.map(name => ({ note_id, name, user_id }));
      await knex('tags').insert(tagsInsert);

      res.json({ message: 'Note created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const note = await knex('notes').where('id', id).first();
      const tags = await knex('tags').where('note_id', id).orderBy('name');
      const links = await knex('links').where('note_id', id).orderBy('created_at');

      res.json({
        ...note,
        tags,
        links,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await knex('notes').where('id', id).del();
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async index(req, res) {
    const { user_id, title, tags } = req.query;

    try {
      let notes;

      if (tags) {
        const tagsArray = tags.split(',').map(tag => tag.trim());

        notes = await knex('tags')
          .select([
            'notes.id',
            'notes.title',
            'notes.user_id',
          ])
          .where('notes.user_id', user_id)
          .whereLike('notes.title', `%${title}%`)
          .whereIn('name', tagsArray)
          .innerJoin('notes', 'notes.id', 'tags.note_id')
          .orderBy('notes.created_at', 'desc');
      } else {
        notes = await knex('notes').where('user_id', user_id).whereLike('title', `%${title}%`).orderBy('created_at', 'desc');
      }

      const userTags = await knex('tags').where('user_id', user_id).orderBy('name');
      const notesWithTags = notes.map(note => {
        const tags = userTags.filter(tag => tag.note_id === note.id);

        return {
          ...note,
          tags,
        };
      });

      res.json(notesWithTags);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = NotesController;


