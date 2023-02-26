import Realm from 'realm'
import { ClientsSchema, PaymentHistorySchema } from './ClientsSchema'

export const GetRealm = async () => {
	const app = new Realm.App({
		id: 'application-0-oazbn',
	})

	const credentials = Realm.Credentials.anonymous()
	const user = await app.logIn(credentials)

	return await Realm.open({
		path: 'clientsDb_1',
		schema: [ClientsSchema, PaymentHistorySchema],
		schemaVersion: 5,
		sync: {
			user: user,
			partitionValue: 'all',
		},
	})
}
