import Realm from 'realm'
import ClientsSchema from './ClientsSchema'

export const GetRealm = async () =>
	await Realm.open({
		path: 'clientsDb_path2',
		schema: [ClientsSchema],
	})
