import { createContext, useContext, useEffect, useState } from 'react'
import { GetRealm } from '../database/GetRealm'

export const RealmContext = createContext<Realm | undefined>(undefined)

const RealmContextProvider = ({ children }: { children: any }) => {
	const [realmState, setRealmState] = useState<Realm | undefined>(undefined)

	useEffect(() => {
		if (!realmState) {
			(async () => {
				const realm = await GetRealm()
				setRealmState(realm)
			})()
		}
	}, [])

	return (
		<RealmContext.Provider value={realmState}>{children}</RealmContext.Provider>
	)
}

export const useMainContext = () => useContext(RealmContext)

export default RealmContextProvider
