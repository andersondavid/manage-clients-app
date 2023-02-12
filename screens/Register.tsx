import { View, StyleSheet, Pressable, Text, Alert, ScrollView } from 'react-native'
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, FieldValues } from 'react-hook-form'

import { TextInputEl } from '../components/TextInputEl'
import { getClientFromDatebase, writeClient } from '../database/DatabaseActions'
import { TClientData } from '../types'
import { PickerEl } from '../components/PickerEl'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { useEffect, useState } from 'react'

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


type RouterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation, route }: RouterProps) {

	//EDIT MODE Pegar parametros da rota, principalmente _id e isEditMode
	const params = route.params
	//EDIT MODE State para valores default e para popular os campos no edit mode
	const [clientValues, setClientValues] = useState<any | TClientData>()
	// AMBOS hook obrigatorio para usar o form e preencher os valores default
	const { ...methods } = useForm({
		defaultValues: {
			_id: clientValues?._id,
			...clientValues
		}
	})
	
	//EDIT MODE função para buscar dados do cliente para preencher os campos no edit mode
	const loadClient = async (_id: string) => {
		getClientFromDatebase(_id)
			.then((data) => setClientValues(data))
			.catch(err => console.log('Erro ao carregar cliente para edição', err))
	}

	//EDIT MODE  Checa se estar no edit mode e usar o _id vindo dos parametros para buscar dados do cliente
	useEffect(() => {
		if (params?.isEditMode) {
			// chama a funcão para buscar dados do cliente
			loadClient(params?._id)
		} else {
			console.log('REGISTER MODE: Não veio _id e isEditMode nos parametros')
		}
	}, [])

	// AMBOS Se os campos estiverem preenchidos corretamente, grava o cliente no banco de dados
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		writeClient(data as TClientData)
			.then(data => {
				Alert.alert('Sucesso', `Cliente ${data?.name} ${params?.isEditMode ? 'atualizado' : 'cadastrado'}`, [
					{ text: 'Abrir Cliente', onPress: () => navigation.navigate('ClientPage', { _id: data?._id }) }
				])
			})
			.catch((error) => {Alert.alert('Erro', 'houve algum erro durante a operação.'); console.log(error)})
	}
	// AMBOS Se os campos estiverem preenchidos incorretamente, indica quais campos não foram preenchidos
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
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<FormProvider {...methods}>
					<TextInputEl
						label={'ID'}
						name={'_id'}
						defaultValue={clientValues?._id}
						placeholder={'1, 2, 3, ...'}
						keyboardType={'default'}
						rules={{ required: 'ID is required!' }}
					/>
					<TextInputEl
						label={'Nome'}
						name={'name'}
						defaultValue={clientValues?.name}
						placeholder={'Flavio'}
						keyboardType={'default'}
						rules={{ required: 'ID is required!' }}
					/>
					<TextInputEl
						label={'Usuario'}
						defaultValue={clientValues?.user}
						name={'user'}
						placeholder={'flavio01'}
						keyboardType={'default'}
						rules={{ required: 'Usuario is required!' }}
					/>
					<TextInputEl
						label={'Senha'}
						name={'pass'}
						defaultValue={clientValues?.pass}
						placeholder={'senha123'}
						keyboardType={'default'}
						rules={{ required: 'Senha is required!' }}
					/>
					<TextInputEl
						label={'Servidor'}
						name={'server'}
						defaultValue={clientValues?.server}
						placeholder={'http://...'}
						keyboardType={'default'}
					/>
					<PickerEl
						label={'Plano'}
						name={'plan'}
						defaultValue={clientValues?.plan}
						options={plansEnums}
						value={'sigle_screen'}
						rules={{ required: false }}
					/>
					<TextInputEl
						label={'Nome do pagante'}
						name={'paymentPerson'}
						defaultValue={clientValues?.paymentPerson}
						placeholder={'Flavio ...'}
						keyboardType={'default'}
						rules={{ required: false }}
					/>
					<PickerEl
						label={'Dispositivo'}
						name={'device'}
						defaultValue={clientValues?.device}
						options={devicesEnums}
						value={'smarttv'}
						rules={{ required: false }}
					/>
					<TextInputEl
						label={'Aplicativo'}
						name={'app'}
						defaultValue={clientValues?.app}
						placeholder={'IP Tv'}
						keyboardType={'default'}
						rules={{ required: false }}
					/>
					<TextInputEl
						label={'WhatsApp'}
						name={'whatsapp'}
						defaultValue={clientValues?.whatsapp}
						placeholder={'99 98765-4231'}
						keyboardType={'default'}
						rules={{ required: false }}
					/>
				</FormProvider>
				<View style={[styles.form, styles.formLoad]}>
					<Pressable onPress={methods.handleSubmit(onSubmit, onError)}>
						<View style={styles.squareBtn}>
							<Text style={styles.textBtn}>REGISTRAR</Text>
						</View>
					</Pressable>
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
