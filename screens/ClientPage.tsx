import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import { ScrollView } from 'react-native'
import { TClientData, TPaymentHistory } from '../types'
import { useCallback, useEffect, useState } from 'react'
import {
	deleteClient,
	getClientFromDatebase,
	removePayment,
	updateStatus,
} from '../database/DatabaseActions'
import { formatDate } from '../utils/formatDate'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect } from '@react-navigation/native'

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
	const currentClientID = route.params.primaryKey
	const [clientData, setClientData] = useState<any | TClientData>({})

	const {
		_id,
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
		primaryKey,
		expirationDate,
		paymentHistory = [],
	}: TClientData = clientData

	const [statusState, setStatusState] = useState(status)

	const removeClient = () => {
		Alert.alert(
			'Apagar Cliente',
			'Deseja remover esse cliente dos registros?\nO processo é inreversivel',
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
			'Deseja remover esse cliente dos registros?\nO processo é inreversivel',
			[
				{
					text: 'Cancelar',
					onPress: () => console.log('Cancel Pressed'),
				},
				{
					text: 'Apagar',
					onPress: () => {
						removePayment(currentClientID, paymentHistory)
					},
				},
			]
		)
	}

	const changeStatus = () => {
		Alert.alert('Atualizar Status', 'Alterações serão visiveis ao atualizar a tela', [
			{
				text: 'Ativo',
				onPress: () => updateStatus(currentClientID, 'ATIVO'),
			},
			{
				text: 'Inativo',
				onPress: () => updateStatus(currentClientID, 'INATIVO'),
			},
		])
	}

	const setNavigationOptions = () => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable
					onPress={() =>
						navigation.navigate('Register', {
							primaryKey: currentClientID,
							isEditMode: true,
						})
					}
				>
					<Icon name="create" size={22} color="white" />
				</Pressable>
			),
		})
	}

	useFocusEffect(
		useCallback(() => {
			const loadClient = async () => {
				const clientDataResult = await getClientFromDatebase(currentClientID)
				setClientData(clientDataResult)
			}
			loadClient()
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
					<Text style={styles.itemClient}>{_id}</Text>
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
					<Text style={styles.itemClient}>Preço do Plano</Text>
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
					<Text style={styles.itemClient}>Data da Ativação</Text>
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

				<View style={styles.itemHeader}>
					<Text style={styles.itemHeaderText}>Histórico de Pagamento</Text>
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
					<Pressable
						onPress={() => {
							navigation.navigate('UpdatePayment', {
								primaryKey,
							})
						}}
					>
						<View style={styles.squareBtn}>
							<Text style={styles.textBtn}>ATUALIZAR PAGAMENTO</Text>
						</View>
					</Pressable>
				</View>

				<View style={[styles.form, styles.formLoad]}>
					<Pressable onPress={changeStatus}>
						<View style={styles.squareBtn}>
							<Text style={styles.textBtn}>MUDAR STATUS</Text>
						</View>
					</Pressable>
				</View>

				<View style={[styles.form, styles.formLoad]}>
					<Pressable onPress={removeClient}>
						<View style={[styles.squareBtn, { backgroundColor: '#ff2233' }]}>
							<Text style={styles.textBtn}>APAGAR CLIENTE</Text>
						</View>
					</Pressable>
				</View>

				<View style={[styles.form, styles.formLoad]}>
					<Pressable onPress={removeLastPayment}>
						<View style={[styles.squareBtn, { backgroundColor: '#ff2233' }]}>
							<Text style={styles.textBtn}>LIMPAR PAGAMENTOS</Text>
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
