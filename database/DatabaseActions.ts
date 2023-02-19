import { GetRealm } from './GetRealm'
import { TClientData, TPaymentHistory } from '../types'

export const writeClient = async (
	data: TClientData
): Promise<TClientData | undefined> => {
	const realm = await GetRealm()
	data.created_at = new Date()
	let result

	try {
		realm.write(() => {
			result = realm.create('ClientsSchema', data).toJSON()
		})
	} catch (error) {
		console.error(error)
	}

	return result
}

export const getClientFromDatebase = async (selectedId: string) => {
	const realm = await GetRealm()
	try {
		const response = realm
			.objectForPrimaryKey('ClientsSchema', selectedId)
			?.toJSON()



		return response
	} catch (error) {
		console.error(error)

	}
}

export const updateClientData = async (selectedId: string, data: any) => {
	const realm = await GetRealm()

	try {
		const response: TClientData | undefined | null = realm.objectForPrimaryKey(
			'ClientsSchema',
			selectedId
		)
		if (response) {
			realm.write(() => {
				response._id = data._id
				response.name = data.name
				response.user = data.user
				response.pass = data.pass
				response.server = data.server
				response.plan = data.plan
				response.planPrice = data.planPrice
				response.paymentPerson = data.paymentPerson
				response.device = data.device
				response.app = data.app
				response.whatsapp = data.whatsapp
			})
		}
		return response
	} catch (error) {
		console.error(error)
	}
}

type TDataToUpdate = {
	expirationDate: Date
	dataFromForm: TPaymentHistory
}

export const updatePayment = async (
	selectedId: string,
	data: TDataToUpdate
) => {
	const realm = await GetRealm()
	try {
		const response: {
			paymentHistory: Set<TPaymentHistory>
			expirationDate: Date
		} | null = realm.objectForPrimaryKey('ClientsSchema', selectedId)
		if (response) {
			realm.write(() => {
				response.expirationDate = data.expirationDate
				response.paymentHistory.add(data.dataFromForm)
			})
		}

		return response
	} catch (error) {
		console.error(error)

	}
}

export const removePayment = async (
	selectedId: string,
) => {

	const realm = await GetRealm()

	try {
		const response: {
			paymentHistory: Set<TPaymentHistory>,
			expirationDate: Date | null
		} | null = realm.objectForPrimaryKey('ClientsSchema', selectedId)
		if (response) {
			realm.write(() => {
				response.paymentHistory.clear()
				response.expirationDate = null
			})
		}
		return response
	} catch (error) {
		console.error(error)
	}
}

export const deleteClient = async (primaryKey: string) => {
	const realm = await GetRealm()

	try {
		const response = realm.objectForPrimaryKey('ClientsSchema', primaryKey)
		if (response) {
			realm.write(() => {
				realm.delete(response)
			})
		}
	} catch (error) {
		console.log('ERRO: Erro ao excluir cliente\n', error)

	}
}


export const updateStatus = async (
	selectedId: string,
	status: string
) => {
	const realm = await GetRealm()
	try {
		const response: TClientData | undefined | null = realm.objectForPrimaryKey('ClientsSchema', selectedId)
		if (response) {
			realm.write(() => {
				response.status = status
			})
		}
		return response
	} catch (error) {
		console.error(error)
	}
}