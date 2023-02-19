import { StyleSheet, View, TouchableOpacity  } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchBar from '../components/SearchBar'

import ListItemClient from '../components/ListItemClient'
import { TClientData } from '../types'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { GetRealm } from '../database/GetRealm'

interface RouterProps {
	navigation: NavigationProp<any, 'Home'>
}

export default function Home({ navigation }: RouterProps) {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
	const [clientState, setClientState] = useState<any[] | TClientData[]>([])

	const fetchClients = async () => {
		const realm = await GetRealm()
		try {
			const response = realm
				.objects<TClientData[]>('ClientsSchema')
				.sorted('_id')
				.toJSON()

			setClientState(response)
			realm.close()
		} catch (error) {
			console.error(error)
		}
	}

	const searchClients = async () => {
		const realm = await GetRealm()
		try {
			const response = realm
				.objects<TClientData[]>('ClientsSchema')
				.sorted('_id')
				.filtered(`name CONTAINS[c] "${searchQuery}"`)
				.toJSON()

			setClientState(response)
			realm.close()
		} catch (error) {
			console.error(error)
		}
	}

	const changeHeaderBar = () => {
		let options = null

		if (showSearchBar) {
			options = {
				headerTitle: () => (
					<SearchBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
				),
				headerRight: () => (
					<View style={styles.bntsSearchOpen}>
						<TouchableOpacity  onPress={searchClients}>
							<Icon name="search" size={20} color="#ffffff" />
						</TouchableOpacity >
						<TouchableOpacity 
							onPress={() => {
								setShowSearchBar(false)
								setSearchQuery('')
							}}
						>
							<Icon name="close" size={24} color="white" />
						</TouchableOpacity >
					</View>
				),
			}
		} else {
			options = {
				headerTitle: null,
				headerRight: () => (
					<TouchableOpacity  onPress={() => setShowSearchBar(true)}>
						<Icon name="search" size={20} color="#ffffff" />
					</TouchableOpacity >
				),
			}
		}
		navigation.setOptions(options)
	}

	useFocusEffect(
		useCallback(() => {
			fetchClients()
		}, [])
	)

	useEffect(() => {
		changeHeaderBar()
	}, [searchQuery, showSearchBar])

	return (
		<View style={styles.container}>
			<ScrollView>
				{clientState.map((client) => (
					<TouchableOpacity 
						key={client.primaryKey}
						onPressIn={() =>
							navigation.navigate('ClientPage', {
								primaryKey: client.primaryKey,
							})
						}
					>
						<ListItemClient clientData={client} />
					</TouchableOpacity >
				))}
			</ScrollView>

			<View style={styles.fabContainer}>
				<TouchableOpacity 
					style={styles.fab}
					onPressIn={() => navigation.navigate('Register')}
				>
					<Icon name="add" size={24} color="white" />
				</TouchableOpacity >
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
	bntsSearchOpen: {
		flexDirection: 'row',
		width: 56,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})
