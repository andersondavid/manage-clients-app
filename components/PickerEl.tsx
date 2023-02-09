import Picker from '@ouroboros/react-native-picker'
import { StyleSheet, Text, View } from 'react-native'
import {
	useController,
	UseControllerProps
} from 'react-hook-form'

interface PropTypes extends UseControllerProps {
	label: string,
	value: string,
	// onChange: (value: string) => void,
	options: {value: string, text: string}[]
}

export const PickerEl = (props: PropTypes) => {
	const { options, label, value, name	} = props
	const { field } = useController({ name, defaultValue: value })

	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.formInputLabel}>{label}</Text>}
			<Picker
				onChanged={field.onChange}
				options={options}
				style={styles.formInputField}
				value={field.value}
			/>
		</View>
	)
}


const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		position: 'relative',
	},
	formInputField: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: '#3337',
		width: '100%',
		fontSize: 16,
		lineHeight: 18,
		color: '#fff',
	},
	formInputLabel: {
		fontSize: 13,
		color: '#aaa',
		marginTop: 5,
	},
	isRequired: {
		position: 'absolute',
		bottom: 16,
		right: 10,
		color: '#fff'
	}
})