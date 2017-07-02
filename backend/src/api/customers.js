import resource from 'resource-router-middleware';
import Customer from '../models/customer';
import Plan from '../models/plan';
import Subscription from '../models/subscription';
import {failure} from '../lib/util';

export default ({config, db}) => resource({

  id: 'customer',

  // Preloads resource for requests with :id placeholder
  async load(req, id, callback) {
    const customer = await Customer.findById(id);
    const errorCode = customer ? null : '404';

    callback(errorCode, customer);
  },

  // GET / - List all entities
  async index(req, res) {
    const searchParams = req.query.domain ? {domain: req.query.domain} : {};

    const customers = await Customer.find(searchParams);
    res.json(customers);
  },

  // GET /:id - Return a given entity
  async read({customer}, res) {
    res.json(customer);
  },

  // PUT /:id - Update a given entity
  async update({customer, body}, res) {
    for (let key in body) {
      if (key !== '_id' && body.hasOwnProperty(key)) {
        customer[key] = body[key];
      }
    }

    await Customer.update(customer);

    res.status(200).send(customer);
  },

  // POST / - Create a new entity
  async create({body}, res) {
    let {name, domain} = body;

    try {
      await new Customer({name: name, domain: domain}).save();
    } catch (error) {
      failure(res, 'Failed to persist new customer', 500, error.errors ? error.errors : error.toString());
    }

    res.sendStatus(200);
  },

  // DELETE /:id - Delete a given entity
  async delete({customer}, res) {
    await Customer.remove(customer);
    res.sendStatus(202);
  }
})

// GET /:id/subscriptions - List of customer's subscriptions
  .get('/:id/subscriptions', async (req, res) => {
    const customerId = req.params.id;

    const persistedCustomer = await Customer.findById(customerId).populate('subscriptions');
    if (!persistedCustomer) {
      res.sendStatus(404);
      return;
    }

    res.send(persistedCustomer.subscriptions);
  })

  // POST /:id/members - Creates new subscription
  .post('/:customerId/subscriptions', async (req, res) => {
    const customerId = req.params.customerId;
    const {planId, paymentMethod} = req.body;

    if (!planId || !customerId) {
      failure(res, 'No plan or customer found with given ids', 404);
      return;
    }

    const persistedCustomer = await Customer.findById(customerId);
    if (!persistedCustomer) {
      failure(res, 'No customer found with given id', 404);
      return;
    }

    const persistedPlan = await Plan.findById(planId);
    if (!persistedPlan) {
      failure(res, 'No plan found with given id', 404);
      return;
    }

    const persistedSubscription = await new Subscription({
      plan: persistedPlan._id,
      paymentMethod: paymentMethod
    }).save();

    persistedCustomer.subscriptions.push(persistedSubscription._id);
    await Customer.update(persistedCustomer);

    res.sendStatus(200);
  })

  // DELETE /:id/members/:username - Removes user from the user group
  .delete('/:customerId/subscriptions/:subscriptionId', async (req, res) => {
    let {customerId, subscriptionId} = req.params;

    if (!subscriptionId || !customerId) {
      failure(res, 'No subscription or customer found with given ids', 404);
      return;
    }

    const persistedCustomer = await Customer.findById(customerId);
    if (!persistedCustomer) {
      failure(res, 'No customer found with given id', 404);
      return;
    }

    const subscriptionIndex = persistedCustomer.subscriptions.indexOf(subscriptionId);
    if (subscriptionIndex === -1) {
      res.sendStatus(304); // Not Modified
      return;
    }

    persistedCustomer.subscriptions.splice(subscriptionIndex, 1);
    await Customer.update(persistedCustomer);

    res.sendStatus(202);
  });
