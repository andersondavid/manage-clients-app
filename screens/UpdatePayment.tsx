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
import DatePicker from 'react-native-date-picker'
import { useEffect, useState } from 'react'

import { TextInputEl } from '../components/TextInputEl'
import { RootStackParamList, TPaymentHistory } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { formatDate } from '../utils/formatDate'
import { PickerEl } from '../components/PickerEl'
import { useMainContext } from '../context/RealmContext'
import { rand } from '@jsweb/randkey'

type TDataToUpdate = {
	expirationDate: Date
	dataFromForm: TPaymentHistory
}

const paymentMethods = [
	{
		text: 'PIX',
		value: 'pix',
	},
	{
		text: 'Especie',
		value: 'money',
	},
	{
		text: 'Boleto',
		value: 'boleto',
	},
]

type RouterProps = NativeStackScreenProps<RootStackParamList, 'UpdatePayment'>

export default function UpdatePayment({ navigation, route }: RouterProps) {
	const realm = useMainContext()
	const currentClientID = route.params._id

	const [paymentDay, setPaymentDay] = useState(new Date())
	const [modalPaymentDay, setModalPaymentDay] = useState(false)

	const [expireDay, setExpireDay] = useState(
		new Date(new Date().setMonth(paymentDay.getMonth() + 1))
	)
	const [modalExpireDay, setModalExpireDay] = useState(false)

	useEffect(() => {
		setExpireDay(new Date(new Date().setMonth(paymentDay.getMonth() + 1)))
	}, [paymentDay])

	const updatePayment = async (selectedId: string, data: TDataToUpdate) => {
		try {
			if (realm) {
				const response: {
					paymentHistory: Set<TPaymentHistory>
					expirationDate: Date
				} | null = realm.objectForPrimaryKey('ClientsSchema', selectedId)
				if (response) {
					realm.write(() => {
						response.expirationDate = data.expirationDate
						response.paymentHistory.add(data.dataFromForm)
					})
				}

				return response
			}
		} catch (error) {
			console.error(error)
		}
	}

	const { ...methods } = useForm()
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const dataFromForm: TPaymentHistory = {
			_uniq_id: currentClientID,
			_id: rand(36),
			price: parseInt(data.getPaymentValue),
			method: data.getPaymentMethod,
			date: paymentDay,
			creditHistory: parseInt(data.getCreditValue),
		}

		const dataToUpdate = {
			dataFromForm,
			expirationDate: expireDay,
		}

		updatePayment(currentClientID, dataToUpdate)
			.then(() =>
				Alert.alert('Sucesso', 'Pagamento registrado.', [
					{
						text: 'Abrir Cliente',
						onPress: () => navigation.goBack(),
					},
				])
			)
			.catch(() => Alert.alert('Erro', 'houve algum erro durante a opera????o.'))
	}

	const onError: SubmitErrorHandler<FieldValues> = (errors) => {
		const missingRequiredFields: string[] = Object.keys(errors)
		const FieldsName: { [property: string]: string } = {
			getPaymentValue: 'Valor',
			getPaymentMethod: 'Metodo de Pagamento',
			getPaymentDate: 'Data do Pagamento',
			expirationDate: 'Data do Vencimento',
		}

		Alert.alert(
			'Campos Obrigatorios Faltantes',
			missingRequiredFields
				.flatMap((field): string => `${FieldsName[field]} ?? obrigatorio`)
				.join('\n')
		)
		return null
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<FormProvider {...methods}>
					<TextInputEl
						label={'Valor'}
						name={'getPaymentValue'}
						placeholder={'R$ 20,00'}
						keyboardType={'numeric'}
						rules={{ required: true }}
					/>
					<PickerEl
						label={'Metodo'}
						name={'getPaymentMethod'}
						options={paymentMethods}
						value={'pix'}
						rules={{ required: 'Metodo is required!' }}
					/>
					<Text style={styles.formInputLabel}>Data do Pagamento</Text>
					<TouchableOpacity
						style={styles.formInputField}
						onPress={() => setModalPaymentDay(true)}
					>
						<Text style={styles.buttonModalDate}>{formatDate(paymentDay)}</Text>
					</TouchableOpacity>

					<Text style={styles.formInputLabel}>Data do Vecimento</Text>
					<TouchableOpacity
						style={styles.formInputField}
						onPress={() => setModalExpireDay(true)}
					>
						<Text style={styles.buttonModalDate}>{formatDate(expireDay)}</Text>
					</TouchableOpacity>

					<TextInputEl
						label={'Credito'}
						name={'getCreditValue'}
						placeholder={'R$ 10,00'}
						keyboardType={'numeric'}
						rules={{ required: true }}
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
			<DatePicker
				modal
				mode="date"
				locale="pt-BR"
				open={modalPaymentDay}
				date={paymentDay}
				onConfirm={(date) => {
					setModalPaymentDay(false)
					setPaymentDay(date)
				}}
				onCancel={() => {
					setModalPaymentDay(false)
				}}
			/>
			<DatePicker
				modal
				mode="date"
				locale="pt-BR"
				open={modalExpireDay}
				date={expireDay}
				onConfirm={(date) => {
					setModalExpireDay(false)
					setExpireDay(date)
				}}
				onCancel={() => {
					setModalExpireDay(false)
				}}
			/>
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
	formInputLabel: {
		fontSize: 13,
		color: '#aaa',
		marginTop: 5,
	},
	textBtn: {
		lineHeight: 18,
		fontSize: 16,
		color: '#fff',
	},
	formInputField: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: '#3337',
		width: '100%',
	},
	buttonModalDate: {
		fontSize: 16,
		lineHeight: 18,
		color: '#fff',
	},
})
