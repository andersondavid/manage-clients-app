import { ObjectSchema } from 'realm'

const ClientsSchema: ObjectSchema = {
	name: 'Clients',
	properties: {
		_id: 'int',
		status: 'string',
		name: 'string',
		user: 'string',
		pass: 'string',
		plan: 'string',
		server: 'string',
		app: 'string',
		paymentMethod: 'string',
		paymentPerson: 'string',
		activationDate: 'string',
		lastPayment: 'string',
		daysLeft: 'int',
		device: 'string',
		whatsapp: 'string',
		totalValue: 'int',
		creditedValue: 'int',
		profitValue: 'int',
	},
	primaryKey: '_id'
}

export default ClientsSchema