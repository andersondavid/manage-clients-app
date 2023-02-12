import { View, Text, TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet } from 'react-native'
import {
	useController,
	useFormContext,
	UseControllerProps
} from 'react-hook-form'

interface TextInputProps extends RNTextInputProps, UseControllerProps {
	label: string
	defaultValue?: string //ADD DEFAULT VALUE TO PROPS
}

const ControlledInput = (props: TextInputProps) => {
	const { label, name, rules, defaultValue, ...inputProps  } = props
	const { field } = useController({ name, rules })
	
	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.formInputLabel}>{label}</Text>}
			<RNTextInput
				placeholderTextColor={'#777'}
				onChangeText={field.onChange}
				onBlur={field.onBlur}
				value={field.value}
				defaultValue={defaultValue}
				style={styles.formInputField}
				{...inputProps}
			/>
			{rules?.required && <Text style={styles.isRequired}>*</Text>}
		</View>
	)
}

export const TextInputEl = (props: TextInputProps) => {
	const { name } = props
	const formContext = useFormContext()

	if (!formContext || !name) {
		const msg = !formContext ? 'TextInput must be wrapped by the FormProvider' : 'Name must be defined'
		console.error(msg)
		return null
	}
	return <ControlledInput {...props} />
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
