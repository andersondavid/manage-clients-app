import { View, Text, StyleSheet } from 'react-native'
export default function FormInput(props: any) {
	const { label, children } = props

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.formInputPlaceholder}>{label}</Text>
			<Text style={styles.formInputField}>{children}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
	},
	formInputField: {
		paddingVertical: 10,
		borderRadius: 5,
		width: '100%',
		fontSize: 16,
		lineHeight: 18,
		color: '#fff',
	},
	formInputPlaceholder: {
		fontSize: 13,
		color: '#aaa',
	},
})
