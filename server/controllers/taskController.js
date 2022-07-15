const {Task} = require('../models/models');

class ProductController {

  async create(req, res, next) {
    try {
      let { title, date, priority, marks, description } = req.body
      const task = await Task.create({
        title,
        date,
        priority,
        marks,
        description,
      });
      return res.json(task)
    } catch (e) {
      console.error(e);
    }
  }

  async update(req, res, next) {
    try {
      let { id, title, date, priority, marks, description } = req.body
      const task = await Task.update(
      {
        title,
        date,
        priority,
        marks,
        description,
      },
      {
        where: { id: id } 
      });
      return res.json(task)
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req, res, next) {
    try {
      let { id } = req.body
      const result = await Task.destroy({where: { id: id }})
      return res.json(result)
    } catch(e) {
      console.error(e);
    }
  }

  async getAll (req, res) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 10
  
      const task = await Task.findAndCountAll();
      return res.json(task);
    } catch (error) {
      console.error(error);
    }
  }
} 

module.exports = new ProductController()
