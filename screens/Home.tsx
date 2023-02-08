import { StyleSheet, View, Pressable } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchBar from '../components/SearchBar'

import ListItemClient from '../components/ListItemClient'
import { TClientData } from '../types'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { GetRealm } from '../database/GetRealm'

interface RouterProps {
	navigation: NavigationProp<any, 'Home'>;
}

export default function Home({ navigation }: RouterProps) {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
	const [clientState, setClientState] = useState<any[] | TClientData[]>([])

	
	const fetchClients = async () => {
		const realm = await GetRealm()
		try {
			const response = realm
				.objects<TClientData[]>('Clients5')
				.sorted('created_at')
				.toJSON()
			console.log('dataaaaaa\n\n', response)

			setClientState(response)
		} catch (error) {
			console.error(error)
		}
	}


	const changeHeaderBar = () => {
		let options = null

		if (showSearchBar) {
			options = {
				headerTitle: () => (
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				),
				headerRight: () => (
					<Pressable
						onPress={() => {
							setShowSearchBar(false)
							setSearchTerm('')
						}}
					>
						<Icon name="close" size={24} color="white" />
					</Pressable >
				),
			}

		} else {
			options = {
				headerTitle: null,
				headerRight: () => (
					<Pressable onPress={() => setShowSearchBar(true)}>
						<Icon name="search" size={20} color="#ffffff" />
					</Pressable>
				),
			}
		}
		navigation.setOptions(options)
	}

	useFocusEffect(useCallback(() => {
		fetchClients()
	}, []))

	useEffect(() => {
		changeHeaderBar()
	}, [searchTerm, showSearchBar])

	return (
		<View style={styles.container}>
			<ScrollView>
				{clientState.map(client => (
					<Pressable
						key={client._id}
						onPressIn={() =>
							navigation.navigate('ClientPage', { id: client._id })
						}
					>
						<ListItemClient clientData={client} />
					</Pressable>
				))}
			</ScrollView>

			<View style={styles.fabContainer}>
				<Pressable
					style={styles.fab}
					onPressIn={() => navigation.navigate('Register')}
				>
					<Icon name="add" size={24} color="white" />
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
	},
	fabContainer: {
		position: 'absolute',
		bottom: 16,
		right: 15,
	},
	fab: {
		backgroundColor: '#2233FF',
		height: 56,
		width: 56,
		borderRadius: 28,
		elevation: 5,
		padding: 16,
	},
})
