import { StyleSheet, View, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import SearchBar from '../components/SearchBar'
import ListItemClient from '../components/ListItemClient'
import { IClientData } from '../types'
import { getTasks, writeTask } from '../database/DatabaseActions'

export default function Home({ navigation }: any) {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filter, setFilter] = useState<IClientData[]>()
	const [showSearchBar, setShowSearchBar] = useState<boolean>(false)

	/*useEffect(() => {
		 if (searchTerm != null) {
			 const clientsAfterFilter = allClientes.filter(
				 (client) =>
					 client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					 client.id.toString() === searchTerm
			 );
			 setFilter(clientsAfterFilter);
		 }

 let options = null;

 if (showSearchBar) {
	 options = {
		 headerTitle: () => (
			 <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
		 ),
		 headerRight: () => (
			 <Pressable
				 onPress={() => {
					 setShowSearchBar(false);
					 setSearchTerm("");
				 }}
			 >
				 { <Ionicons name="ios-close-sharp" size={24} color="#ffffff" /> }
			 </Pressable >
		 ),
	 };
navigation.setOptions(options);
 } else {
 options = {
	 headerTitle: null,
	 headerRight: () => (
		 <Pressable onPress={() => setShowSearchBar(true)}>
			 { <Ionicons name="ios-search-sharp" size={20} color="#ffffff" /> }
		 </Pressable>
	 ),
 };
 navigation.setOptions(options);
}

	}, [searchTerm, showSearchBar]);*/

	return (
		<View style={styles.container}>
			<ScrollView>
				{filter?.map((client) => (
					<Pressable
						key={client.id}
						onPressIn={() =>
							navigation.navigate('ClientPage', { id: client.id })
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
					{/* <Entypo name="plus" size={24} color="white" /> */}
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
