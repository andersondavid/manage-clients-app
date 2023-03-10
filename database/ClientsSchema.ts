import { ObjectSchema } from 'realm'

const ClientsSchema: ObjectSchema = {
	name: 'ClientsSchema',
	properties: {
		shareKey: 'string',
		_id: 'string',
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
		paymentHistory: 'PaymentHistorySchema<>'
	},
	primaryKey: '_id',
}

const PaymentHistorySchema: ObjectSchema = {
	name: 'PaymentHistorySchema',
	primaryKey: '_id',
	properties: {
		_uniq_id: 'string',
		_id: 'string',
		price: 'double',
		date: 'date',
		method: 'string',
		creditHistory: 'double'
	}
}
export {ClientsSchema, PaymentHistorySchema}