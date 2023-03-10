import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native'
import { TClientData, TPaymentHistory } from '../types'
import { useCallback, useState } from 'react'
import { formatDate } from '../utils/formatDate'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect } from '@react-navigation/native'
import { calculateDates } from '../utils/calculateDates'
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

const PaymentHistoryTable = (props: { paymentHistory: TPaymentHistory[] }) => {
	const { paymentHistory } = props
	return (
		<View>
			{paymentHistory.map((item, index) => {
				return (
					<View key={index} style={styles.itensContainer}>
						<Text style={styles.itemClient}>{item.price}</Text>
						<Text style={styles.itemClient}>{formatDate(item.date)}</Text>
						<Text style={styles.itemClient}>{item.method}</Text>
						<Text style={styles.itemClient}>
							{item.price - item.creditHistory}
						</Text>
					</View>
				)
			})}
		</View>
	)
}

export default function ClientPage({ route, navigation }: any) {
	const currentClientID = route.params._id
	const [clientData, setClientData] = useState<any | TClientData>({})
	const realm = useMainContext()

	const {
		shareKey,
		status,
		name,
		user,
		pass,
		plan,
		server,
		activationDate,
		device,
		whatsapp,
		paymentPerson,
		created_at,
		app,
		planPrice,
		_id,
		expirationDate,
		paymentHistory = [],
	}: TClientData = clientData

	const removeClient = () => {
		Alert.alert(
			'Apagar Cliente',
			'Deseja remover esse cliente dos registros?\nO processo ?? inreversivel',
			[
				{
					text: 'Cancelar',
					onPress: () => console.log('Cancel Pressed'),
				},
				{
					text: 'Apagar',
					onPress: () => {
						navigation.goBack(), deleteClient(currentClientID)
					},
				},
			]
		)
	}

	const removeLastPayment = () => {
		Alert.alert(
			'Apagar Cliente',
			'Deseja limpar os dados de pagamento?\nO processo ?? inrevessivel\nAltera????es ser??o visiveis ao atualizar a tela',
			[
				{
					text: 'Cancelar',
					onPress: () => console.log('Cancel Pressed'),
				},
				{
					text: 'Apagar',
					onPress: () => {
						removePayment(currentClientID)
					},
				},
			]
		)
	}

	const changeStatus = () => {
		Alert.alert(
			'Atualizar Status',
			'Altera????es ser??o visiveis ao atualizar a tela',
			[
				{
					text: 'Cancelar',
				},
				{
					text: 'Ativo',
					onPress: () => updateStatus(currentClientID, 'ATIVO'),
				},
				{
					text: 'Inativo',
					onPress: () => updateStatus(currentClientID, 'INATIVO'),
				},
			]
		)
	}

	const updateStatus = async (selectedId: string, status: string) => {
		try {
			if (realm) {
				const response: TClientData | undefined | null =
					realm.objectForPrimaryKey('ClientsSchema', selectedId)
				if (response) {
					realm.write(() => {
						response.status = status
					})
				}
				return response
			}
		} catch (error) {
			console.error(error)
		}
	}

	const removePayment = async (selectedId: string) => {
		try {
			if (realm) {
				const response: {
					paymentHistory: Set<TPaymentHistory>
					expirationDate: Date | null
				} | null = realm.objectForPrimaryKey('ClientsSchema', selectedId)
				if (response) {
					realm.write(() => {
						response.paymentHistory.clear()
						response.expirationDate = null
					})
				}
				return response
			}
		} catch (error) {
			console.error(error)
		}
	}

	const deleteClient = async (_id: string) => {
		try {
			if (realm) {
				const response = realm.objectForPrimaryKey('ClientsSchema', _id)
				if (response) {
					realm.write(() => {
						realm.delete(response)
					})
				}
			}
		} catch (error) {
			console.log('ERRO: Erro ao excluir cliente\n', error)
		}
	}

	const setNavigationOptions = () => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('Register', {
							_id: currentClientID,
							isEditMode: true,
						})
					}
				>
					<Icon name="create" size={22} color="white" />
				</TouchableOpacity>
			),
		})
	}

	useFocusEffect(
		useCallback(() => {
			try {
				if (realm && currentClientID) {
					const response = realm
						.objectForPrimaryKey('ClientsSchema', currentClientID)
						?.toJSON()
					if (response) {
						setClientData(response)
					}
				}
			} catch (error) {
				console.error(error)
			}
			setNavigationOptions()
		}, [])
	)

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.nameContainer}>
					<Text style={styles.clientName}>{name}</Text>
				</View>

				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Usuario</Text>
					<Text style={styles.itemClient}>{user}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Senha</Text>
					<Text style={styles.itemClient}>{pass}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>ID</Text>
					<Text style={styles.itemClient}>{shareKey}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>WhatsApp</Text>
					<Text style={styles.itemClient}>{whatsapp}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Cadastrado em </Text>
					<Text style={styles.itemClient}>
						{created_at && formatDate(created_at)}
					</Text>
				</View>

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Plano</Text>
				</View>

				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Plano</Text>
					<Text style={styles.itemClient}>
						{plansEnums.find((item) => item.value == plan)?.text}
					</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Status</Text>
					<Text style={styles.itemClient}>{status}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Pre??o do Plano</Text>
					<Text style={styles.itemClient}>{planPrice}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Aparelho</Text>
					<Text style={styles.itemClient}>
						{devicesEnums.find((item) => item.value == device)?.text}
					</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Aplicativo</Text>
					<Text style={styles.itemClient}>{app}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Servidor</Text>
					<Text style={styles.itemClient}>{server}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Data da Ativa????o</Text>
					<Text style={styles.itemClient}>
						{activationDate && formatDate(activationDate)}
					</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Expira em</Text>
					<Text style={styles.itemClient}>
						{expirationDate && formatDate(expirationDate)}
					</Text>
				</View>

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Status do Pagamento</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Nome do Pagador</Text>
					<Text style={styles.itemClient}>{paymentPerson}</Text>
				</View>
				<View style={styles.itensContainer}>
					<Text style={styles.itemClient}>Dias restantes</Text>
					{clientData.expirationDate && (
						<Text style={styles.itemClient}>
							{calculateDates(clientData.expirationDate)}
						</Text>
					)}
				</View>

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Hist??rico de Pagamento</Text>
				</View>

				<View style={styles.itensContainer}>
					<Text style={[styles.itemClient, styles.textBold]}>Valor</Text>
					<Text style={[styles.itemClient, styles.textBold]}>Data</Text>
					<Text style={[styles.itemClient, styles.textBold]}>Metodo</Text>
					<Text style={[styles.itemClient, styles.textBold]}>Lucro</Text>
				</View>

				{paymentHistory.length != 0 ? (
					<PaymentHistoryTable paymentHistory={paymentHistory} />
				) : (
					<View style={styles.itensContainer}>
						<Text style={styles.itemClient}>Nenhum registro encontrado</Text>
					</View>
				)}

				<View style={[styles.form, styles.formLoad]}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('UpdatePayment', {
								_id,
							})
						}}
					>
						<View style={styles.squareBtn}>
							<Text style={styles.textBtn}>ATUALIZAR PAGAMENTO</Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={[styles.form, styles.formLoad]}>
					<TouchableOpacity onPress={changeStatus}>
						<View style={styles.squareBtn}>
							<Text style={styles.textBtn}>MUDAR STATUS</Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={[styles.form, styles.formLoad]}>
					<TouchableOpacity onPress={removeClient}>
						<View style={[styles.squareBtn, { backgroundColor: '#ff2233' }]}>
							<Text style={styles.textBtn}>APAGAR CLIENTE</Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={[styles.form, styles.formLoad]}>
					<TouchableOpacity onPress={removeLastPayment}>
						<View style={[styles.squareBtn, { backgroundColor: '#ff2233' }]}>
							<Text style={styles.textBtn}>LIMPAR PAGAMENTOS</Text>
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
		backgroundColor: '#121212',
	},
	nameContainer: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		backgroundColor: '#2233FF',
	},
	clientName: {
		fontSize: 18,
		color: '#fff',
	},
	itemHeader: {
		backgroundColor: '#2233FF',
		padding: 4,
	},
	itemHeaderText: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
	},
	textBold: {
		fontWeight: 'bold',
	},
	itensContainer: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: '#fff2',
		borderBottomWidth: 0.5,
	},
	itemClient: {
		fontSize: 14,
		color: '#fff',
	},
	form: {
		flex: 1,
		padding: 16,
		paddingBottom: 0,
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
