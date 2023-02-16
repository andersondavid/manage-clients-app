import { View, StyleSheet, Pressable, Text, Alert, ScrollView } from 'react-native'
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, FieldValues } from 'react-hook-form'

import { TextInputEl } from '../components/TextInputEl'
import { updatePayment } from '../database/DatabaseActions'
import { RootStackParamList, TPaymentHistory } from '../types'
import { PickerEl } from '../components/PickerEl'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const paymentMethods = [
	{
		text: 'PIX',
		value: 'pix'
	},
	{
		text: 'Especie',
		value: 'money'
	},
	{
		text: 'Boleto',
		value: 'boleto'
	}
]

type RouterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function UpdatePayment({ route }: RouterProps) {
	const currentClientID = route.params.primaryKey

	const { ...methods } = useForm()
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const dataFromForm: TPaymentHistory = {
			price: data.getPaymentValue,
			method: data.getPaymentMethod,
			date: data.getPaymentDate,
		}

		const dataToUpdate = { dataFromForm, expirationDate: data.expirationDate }
		updatePayment(currentClientID, dataToUpdate)
			.then(data => Alert.alert('Sucesso', 'Pagamento registrado.'))
			.catch(err => Alert.alert('Erro', 'houve algum erro durante a operação.'))
	}

	const onError: SubmitErrorHandler<FieldValues> = (errors) => {
		const missingRequiredFields: string[] = Object.keys(errors)
		const FieldsName: { [property: string]: string } = {
			getPaymentValue: 'Valor',
			getPaymentMethod: 'Metodo de Pagamento',
			getPaymentDate: 'Data do Pagamento',
			expirationDate: 'Data do Vencimento'
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
						label={'Valor'}
						name={'getPaymentValue'}
						placeholder={'R$ 20,00'}
						keyboardType={'numeric'}
						rules={{ required: true }}
					/>
					<PickerEl
						label={'Metodo de Pagamento'}
						name={'getPaymentMethod'}
						options={paymentMethods}
						value={'pix'}
						rules={{ required: 'Metodo is required!' }}
					/>
					<TextInputEl
						label={'Data do Pagamento'}
						name={'getPaymentDate'}
						placeholder={'01/02/2023'}
						keyboardType={'default'}
						rules={{ required: 'Senha is required!' }}
					/>
					<TextInputEl
						label={'Data do Vencimento'}
						name={'expirationDate'}
						placeholder={'01/02/2023'}
						keyboardType={'default'}
						rules={{ required: 'Data do Pagamento is required!' }}
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
