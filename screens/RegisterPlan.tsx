import { View, StyleSheet, TouchableOpacity, Text, Alert, ScrollView } from 'react-native'
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, FieldValues } from 'react-hook-form'

import { TextInputEl } from '../components/TextInputEl'
import { writeClient } from '../database/DatabaseActions'
import { TClientData } from '../types'
import { PickerEl } from '../components/PickerEl'

const devicesEnums = [
	{ value: 'smarttv', text: 'TV SMART' },
	{ value: 'tvaoc', text: 'TV AOC' },
	{ value: 'tvlg', text: 'TV LG' },
	{ value: 'tvsamsung', text: 'TV SANSUNG' },
	{ value: 'tvphilips', text: 'TV PHILIPS' },
	{ value: 'tvtcl', text: 'TV TCL' },
	{ value: 'tvbox', text: 'TV BOX' },
	{ value: 'pc', text: 'PC/COMPUTADOR' }
]

const plansEnums = [
	{ value: 'sigle_screen', text: '1 TELA' },
	{ value: 'dual_screen', text: '2 TELAS' },
]


export default function RegisterPlan() {

	const { ...methods } = useForm()
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		data._id = parseInt(data._id)
		writeClient(data as TClientData)
			.then(data => Alert.alert('Sucesso', `Cliente ${data?.name} cadastrado.`))
			.catch(err => Alert.alert('Erro', 'houve algum erro durante a operação.'))
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
			<ScrollView>
				<FormProvider {...methods}>
					<TextInputEl
						label={'Nome'}
						name={'name'}
						placeholder={'Flavio'}
						keyboardType={'default'}
						rules={{ required: 'ID is required!' }}
					/>
					<TextInputEl
						label={'Usuario'}
						name={'user'}
						placeholder={'flavio01'}
						keyboardType={'default'}
						rules={{ required: 'Usuario is required!' }}
					/>
					<TextInputEl
						label={'Senha'}
						name={'pass'}
						placeholder={'senha123'}
						keyboardType={'default'}
						rules={{ required: 'Senha is required!' }}
					/>
					<TextInputEl
						label={'Servidor'}
						name={'server'}
						placeholder={'http://...'}
						keyboardType={'default'}
					/>
					<PickerEl
						label={'Plano'}
						name={'plan'}
						options={plansEnums}
						value={'sigle_screen'}
						rules={{ required: false }}
					/>
					<TextInputEl
						label={'Nome do pagante'}
						name={'paymentPerson'}
						placeholder={'Flavio ...'}
						keyboardType={'default'}
						rules={{ required: false }}
					/>
					<PickerEl
						label={'Dispositivo'}
						name={'device'}
						options={devicesEnums}
						value={'smarttv'}
						rules={{ required: false }}
					/>
					<TextInputEl
						label={'Aplicativo'}
						name={'app'}
						placeholder={'IP Tv'}
						keyboardType={'default'}
						rules={{ required: false }}
					/>
					<TextInputEl
						label={'WhatsApp'}
						name={'whatsapp'}
						placeholder={'99 98765-4231'}
						keyboardType={'default'}
						rules={{ required: false }}
					/>
				</FormProvider>
				<View style={[styles.form, styles.formLoad]}>
					<TouchableOpacity onPress={methods.handleSubmit(onSubmit, onError)}>
						<View style={styles.squareBtn}>
							<Text style={styles.textBtn}>REGISTRAR</Text>
						</View>
					</TouchableOpacity>
				</View>


			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
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
