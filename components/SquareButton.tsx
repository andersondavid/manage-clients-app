import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function SquareButton(props: any) {
	const { children, handlerForm } = props

	return (
		<TouchableOpacity onPress={handlerForm}>
			<View style={styles.squareBtn}>
				<Text style={styles.textBtn}>{children}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
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
