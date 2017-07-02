import resource from 'resource-router-middleware';
import Plan from '../models/plan';

export default ({config, db}) => resource({

  id: 'plan',

  // Preloads resource for requests with :id placeholder
  async load(req, id, callback) {
    const plan = await Plan.findById(id);
    const errorCode = plan ? null : '404';

    callback(errorCode, plan);
  },

  // GET / - List all entities
  async index({}, res) {
    const plans = await Plan.find();
    res.json(plans);
  },

  // GET /:id - Return a given entity
  async read({plan}, res) {
    res.json(plan);
  },

  // POST / - Create a new entity
  async create({body}, res) {
    let {name, price, feedbackLimit, userLimit, advancedSupport} = body;

    await new Plan({
      name: name,
      price: price,
      feedbackLimit: feedbackLimit,
      userLimit: userLimit,
      advancedSupport: advancedSupport
    }).save();

    res.sendStatus(200);
  },

  // PUT /:id - Update a given entity
  async update({plan, body}, res) {
    for (let key in body) {
      if (key !== '_id' && body.hasOwnProperty(key)) {
        plan[key] = body[key];
      }
    }

    await Plan.update(plan);

    res.sendStatus(200);
  },

  // DELETE /:id - Delete a given entity
  async delete({plan}, res) {
    await Plan.remove(plan);
    res.sendStatus(204);
  }
});
