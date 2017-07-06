import Customer from '../models/customer'
import { failure } from '../lib/util'

export default async ({ body }, res) => {

	let { name, domain } = body;

	try {
		const persistedCustomer = await new Customer({ name: name, domain: domain }).save();

		res.status(200).send(persistedCustomer);
	} catch (error) {
		failure(res, 'Failed to persist new customer', 500, error.errors ? error.errors : error.toString());
	}
}