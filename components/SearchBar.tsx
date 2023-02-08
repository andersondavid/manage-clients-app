import { View, TextInput, StyleSheet } from 'react-native'

type PropTypes = {
	searchTerm: string,
  setSearchTerm: (value: string) => void,
}


export default function SearchBar(props: PropTypes) {
	const { searchTerm, setSearchTerm } = props
	
	return (
		<View style={styles.inputContainer}>
			<TextInput
				placeholderTextColor={'#777'}
				style={styles.formInputField}
				value={searchTerm}
				placeholder={'Pesquisar'}
				onChangeText={(terms) => setSearchTerm(terms)}
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
