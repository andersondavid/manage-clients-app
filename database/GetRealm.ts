import Realm from 'realm'
import { ClientsSchema, PaymentHistorySchema } from './ClientsSchema'

export const GetRealm = async () => {
	const app = new Realm.App({
		id: 'appclientiptv-ygebk',
	})

	const credentials = Realm.Credentials.anonymous()
	const user = await app.logIn(credentials)

	return await Realm.open({
		path: 'clientsDb_1',
		schema: [ClientsSchema, PaymentHistorySchema],
		schemaVersion: 9,
		sync: {
			user: user,
			partitionValue: 'all'
		},
	})
}

// "paymentHistory": {
//   "bsonType": "array",
//   "uniqueItems": true,
//   "items": {
//     "type": "object"
//   }
// }
