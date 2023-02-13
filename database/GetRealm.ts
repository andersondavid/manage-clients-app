import Realm from 'realm'
import {ClientsSchema, PaymentHistorySchema} from './ClientsSchema'

export const GetRealm = async () =>
	await Realm.open({
		path: 'clientsDb_1',
		schema: [ClientsSchema, PaymentHistorySchema],
		schemaVersion: 2
	})
