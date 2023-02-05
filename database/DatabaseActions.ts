import Realm from 'realm'
import { GetRealm } from './GetRealm'
import { IClientData } from '../types'


export type ITaskObject = IClientData & Realm.Object;

let createdTask: ITaskObject
export const writeTask = async (data: IClientData) => {
	const realm = await GetRealm()

	const data2 = realm.write(() => {
		createdTask = realm.create('Clients', data)
	})

	console.log(data2)
	

	return createdTask
}



export const getTasks = async () => {
	const realm = await GetRealm()

	try {
		const data = realm.objects<IClientData>('Clients')

		console.log(data)
	} catch (error) {
		console.log(error)
	}
}
