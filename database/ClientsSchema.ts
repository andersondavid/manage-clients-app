import { ObjectSchema } from 'realm'

const ClientsSchema: ObjectSchema = {
	name: 'Clients7',
	properties: {
		_id: 'string',
		status: 'string?',
		name: 'string',
		user: 'string',
		pass: 'string',
		plan: 'string?',
		server: 'string?',
		app: 'string?',
		paymentMethod: 'string?',
		paymentPerson: 'string?',
		activationDate: 'string?',
		lastPayment: 'string?',
		daysLeft: { type: 'int', default: 0 },
		device: 'string?',
		whatsapp: 'string?',
		totalValue: { type: 'int', default: 0 },
		creditedValue: { type: 'int', default: 0 },
		profitValue: { type: 'int', default: 0 },
		created_at: 'date'
	},
	primaryKey: '_id'
}

export default ClientsSchema