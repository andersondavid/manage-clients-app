import { View, StyleSheet, Pressable, Text, Alert } from 'react-native'
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, FieldValues } from 'react-hook-form'

import { TextInputEl } from '../components/TextInputEl'
//import { IClientData } from '../types'

export default function RegisterForm() {

	const { ...methods } = useForm()
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data)
	}

	const onError: SubmitErrorHandler<FieldValues> = (errors) => {
		const missingRequiredFields: string[] = Object.keys(errors)
		const FieldsName: { [property: string]: string } = {
			id: 'ID',
			name: 'Nome',
			user: 'Usuario',
			pass: 'Senha'
		}

		Alert.alert(
			'Campos Obrigatorios Faltantes',
			missingRequiredFields.flatMap((field): string => `${FieldsName[field]} é obrigatorio`).join('\n')
		)
		return null
	}

	return (
		<View style={styles.container}>
			<FormProvider {...methods}>
				<TextInputEl
					label={'ID'}
					name={'id'}
					placeholder={'ID'}
					keyboardType={'default'}
					rules={{ required: 'ID is required!' }}
				/>
				<TextInputEl
					label={'Nome'}
					name={'name'}
					placeholder={'Nome'}
					keyboardType={'default'}
					rules={{ required: 'ID is required!' }}
				/>
				<TextInputEl
					label={'Usuario'}
					name={'user'}
					placeholder={'Usuario'}
					keyboardType={'default'}
					rules={{ required: 'Usuario is required!' }}
				/>
				<TextInputEl
					label={'Senha'}
					name={'pass'}
					placeholder={'Senha'}
					keyboardType={'default'}
					rules={{ required: 'Senha is required!' }}
				/>
				<TextInputEl
					label={'Nome do pagante'}
					name={'paymentPerson'}
					placeholder={'Nome do pagante'}
					keyboardType={'default'}
					rules={{ required: false }}
				/>
				<TextInputEl
					label={'Aparelho'}
					name={'device'}
					placeholder={'Aparelho'}
					keyboardType={'default'}
					rules={{ required: false }}
				/>
				<TextInputEl
					label={'appApp'}
					name={'app'}
					placeholder={'Aplicativo'}
					keyboardType={'default'}
					rules={{ required: false }}
				/>
				<TextInputEl
					label={'WhatsApp'}
					name={'whatsapp'}
					placeholder={'Senha'}
					keyboardType={'default'}
					rules={{ required: false }}
				/>
			</FormProvider>
			<View style={[styles.form, styles.formLoad]}>
				<Pressable onPress={methods.handleSubmit(onSubmit, onError)}>
					<View style={styles.squareBtn}>
						<Text style={styles.textBtn}>APERTAR</Text>
					</View>
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
	form: {
		flex: 1,
		padding: 16,
	},
	formLoad: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},


	squareBtn: {
		backgroundColor: '#2233FF',
		borderRadius: 5,
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	textBtn: {
		lineHeight: 18,
		fontSize: 16,
		color: '#fff',
	},
})
