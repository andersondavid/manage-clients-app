import { ObjectSchema } from 'realm'

const ClientsSchema: ObjectSchema = {
	name: 'ClientsSchema',
	properties: {
		_id: 'string',
		primaryKey: 'string',
		created_at: 'date',
		name: 'string',
		user: 'string',
		pass: 'string',
		status: 'string?',
		whatsapp: 'string?',
		plan: 'string',
		planPrice: 'string',
		server: 'string',
		app: 'string',
		device: 'string',
		paymentPerson: 'string?',
		activationDate: 'date?',
		expirationDate: 'date?',
		creditHistory: 'string<>',
		paymentHistory: 'PaymentHistorySchema<>'
	},
	primaryKey: 'primaryKey',
}

const PaymentHistorySchema: ObjectSchema = {
	name: 'PaymentHistorySchema',
	properties: {
		price: 'int',
		date: 'date',
		method: 'string'
	}
}
export {ClientsSchema, PaymentHistorySchema}