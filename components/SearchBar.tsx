import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar(props: any) {
	const { searchTerm, setSearchTerm } = props;
	
	return (
		<View style={styles.inputContainer}>
			<TextInput
				placeholderTextColor={"#777"}
				style={styles.formInputField}
				value={searchTerm}
				placeholder={"Pesquisar"}
				onChangeText={(terms) => setSearchTerm(terms)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		padding: 5,
		flex: 1
	},
	formInputField: {
		width: "800%",
		fontSize: 16,
		lineHeight: 18,
		color: "#fff",
	},
});
