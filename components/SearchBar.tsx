import { View, TextInput, StyleSheet } from 'react-native'

type PropTypes = {
	searchQuery: string,
  setSearchQuery: (value: string) => void,
}


export default function SearchBar(props: PropTypes) {
	const { searchQuery, setSearchQuery } = props
	
	return (
		<View style={styles.inputContainer}>
			<TextInput
				placeholderTextColor={'#777'}
				style={styles.formInputField}
				value={searchQuery}
				placeholder={'Pesquisar'}
				onChangeText={(querys) => setSearchQuery(querys)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		padding: 5,
		flex: 1
	},
	formInputField: {
		height: 46,
		width: '80%',
		fontSize: 16,
		lineHeight: 18,
		color: '#fff',
	},
})
