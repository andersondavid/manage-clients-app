import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Alert,
	ScrollView,
} from 'react-native'
import {
	useForm,
	FormProvider,
	SubmitHandler,
	SubmitErrorHandler,
	FieldValues,
} from 'react-hook-form'
import { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { rand } from '@jsweb/randkey'

import { TextInputEl } from '../components/TextInputEl'

import { TClientData } from '../types'
import { PickerEl } from '../components/PickerEl'
import { RootStackParamList } from '../types'
import { useMainContext } from '../context/RealmContext'

const devicesEnums = [
	{ value: 'smarttv', text: 'TV SMART' },
	{ value: 'tvaoc', text: 'TV AOC' },
	{ value: 'tvlg', text: 'TV LG' },
	{ value: 'tvsamsung', text: 'TV SANSUNG' },
	{ value: 'tvphilips', text: 'TV PHILIPS' },
	{ value: 'tvtcl', text: 'TV TCL' },
	{ value: 'tvbox', text: 'TV BOX' },
	{ value: 'pc', text: 'PC/COMPUTADOR' },
]

const plansEnums = [
	{ value: 'sigle_screen', text: '1 TELA' },
	{ value: 'dual_screen', text: '2 TELAS' },
]

const initialValues = {
	shareKey: '',
	_id: rand(36),
	created_at: new Date(),
	name: '',
	user: '',
	pass: '',
	status: '',
	whatsapp: '',
	plan: 'sigle_screen',
	planPrice: '',
	server: '',
	app: '',
	device: 'smarttv',
	paymentPerson: '',
	activationDate: new Date(),
	expirationDate: new Date(),
	creditHistory: [],
	paymentHistory: [],
}

type RouterProps = NativeStackScreenProps<RootStackParamList, 'Register'>

export default function Register({ navigation, route }: RouterProps) {
	const realm = useMainContext()
	//EDIT MODE Pegar parametros da rota, principalmente shareKey e isEditMode
	const params = route.params
	//EDIT MODE State para valores default e para popular os campos no edit mode
	const [clientValues, setClientValues] = useState<TClientData | any>(
		initialValues
	)
	// AMBOS hook obrigatorio para usar o form e preencher os valores default
	const { ...methods } = useForm({
		values: clientValues,
	})

	//EDIT MODE função para buscar dados do cliente para preencher os campos no edit mode
	const loadClient = async (_id: string) => {
		try {
			if (realm) {
				const response = realm
					.objectForPrimaryKey('ClientsSchema', _id)
					?.toJSON()

				setClientValues(response)
			}
		} catch (error) {
			console.log('Erro ao carregar cliente para edição', error)
		}
	}

	//EDIT MODE  Checa se estar no edit mode e usar o shareKey vindo dos parametros para buscar dados do cliente
	useEffect(() => {
		if (params?.isEditMode) {
			// chama a funcão para buscar dados do cliente
			loadClient(params?._id)
			navigation.setOptions({ title: 'Editar Cliente' })
		} else {
			console.log('REGISTER MODE: Não veio _id e isEditMode nos parametros\n')
		}
	}, [])

	// AMBOS confirmação de cadastro/atualização
	const updateCreateClientAlert = (data: TClientData | undefined | null) => {
		Alert.alert(
			'Sucesso',
			`Cliente ${data?.name} ${
				params?.isEditMode ? 'atualizado' : 'cadastrado'
			}`,
			[
				{
					text: 'Abrir Cliente',
					onPress: () => {
						navigation.navigate('ClientPage', { _id: data?._id })
					},
				},
			]
		)
	}
	
	// AMBOS Se os campos estiverem preenchidos corretamente, grava o cliente no banco de dados
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (!params?.isEditMode) {
			data.created_at = new Date()
			let result
			try {
				if (realm) {
					realm.write(() => {
						result = realm.create('ClientsSchema', data).toJSON()
					})
					updateCreateClientAlert(result)
				}
			} catch (error) {
				Alert.alert('Erro', 'houve algum erro durante a operação.')
				console.error(error)
			}
		} else if (params?.isEditMode) {
			try {
				if (realm) {
					const response: TClientData | undefined | null =
						realm.objectForPrimaryKey('ClientsSchema', params?._id)
					if (response) {
						realm.write(() => {
							response.shareKey = data.shareKey
							response.name = data.name
							response.user = data.user
							response.pass = data.pass
							response.server = data.server
							response.plan = data.plan
							response.planPrice = data.planPrice
							response.paymentPerson = data.paymentPerson
							response.device = data.device
							response.app = data.app
							response.whatsapp = data.whatsapp
						})
						updateCreateClientAlert(response)
					}
					return response
				}
			} catch (error) {
				console.error(error)
			}
		}
	}
	// AMBOS Se os campos estiverem preenchidos incorretamente, indica quais campos não foram preenchidos
	const onError: SubmitErrorHandler<FieldValues> = (errors) => {
		const missingRequiredFields: string[] = Object.keys(errors)
		const FieldsName: { [property: string]: string } = {
			shareKey: 'ID',
			name: 'Nome',
			user: 'Usuario',
			pass: 'Senha',
			whatsapp: 'WhatsApp',
			plan: 'Plano',
			planPrice: 'Preço do Plano',
			server: 'Servidor',
			app: 'Aplicativo',
			device: 'Aparelho',
			paymentPerson: 'Pagante',
		}
		Alert.alert(
			'Campos Obrigatorios Faltantes',
			missingRequiredFields
				.flatMap((field): string => `${FieldsName[field]} é obrigatorio`)
				.join('\n')
		)
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<FormProvider {...methods}>
					<TextInputEl
						label={'ID'}
						name={'shareKey'}
						placeholder={'1, 2, 3, ...'}
						keyboardType={'numeric'}
						rules={{ required: 'ID is required!' }}
					/>
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
						rules={{ required: 'Servidor is required!' }}
					/>
					<PickerEl
						label={'Plano'}
						name={'plan'}
						options={plansEnums}
						value={'sigle_screen'}
						rules={{ required: 'Plano is required!' }}
					/>
					<TextInputEl
						label={'Valor do Plano'}
						name={'planPrice'}
						placeholder={'R$ 0,00'}
						keyboardType={'numeric'}
						rules={{ required: 'Valor do Plano is required!' }}
					/>
					<TextInputEl
						label={'Nome do pagante'}
						name={'paymentPerson'}
						placeholder={'Flavio ...'}
						keyboardType={'default'}
						rules={{ required: 'Nome do pagante is required!' }}
					/>
					<PickerEl
						label={'Dispositivo'}
						name={'device'}
						options={devicesEnums}
						value={'smarttv'}
						rules={{ required: 'Dispositivo is required!' }}
					/>
					<TextInputEl
						label={'Aplicativo'}
						name={'app'}
						placeholder={'IP Tv'}
						keyboardType={'default'}
						rules={{ required: 'Aplicativo is required!' }}
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
