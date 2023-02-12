import { GetRealm } from './GetRealm'
import { TClientData } from '../types'

export const writeClient = async (data: TClientData): Promise<TClientData | undefined> => {
	const realm = await GetRealm()
	data.created_at = new Date()
	let result

	try {
		realm.write(() => {
			result = realm.create('Clients7', data)
				.toJSON()
		})
	} catch (error) {
		console.error(error)
	}
	
	realm.close()
	return result
}

export const getClientFromDatebase = async (selectedId: string) => {
	const realm = await GetRealm()
	try {
		const response = realm
			.objectForPrimaryKey('Clients7', selectedId)
			?.toJSON()

		realm.close()

		return response

	} catch (error) {
		console.error(error)
	}
}