import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
	Modal,
	type ModalProps,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

interface EmojiPickerProps extends ModalProps {
	onClose: VoidFunction;
}

export const EmojiPicker = ({
	children,
	onClose,
	...rest
}: EmojiPickerProps) => {
	return (
		<Modal animationType="fade" transparent {...rest}>
			<Pressable style={styles.backdrop} onPress={onClose} />

			<View style={styles.modal}>
				<View style={styles.header}>
					<Text style={styles.text}>Choose a sticker</Text>

					<Pressable onPress={onClose}>
						<MaterialIcons name="close" color="#fff" size={24} />
					</Pressable>
				</View>

				{children}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: "rgba(0,0,0,0.25)",
		position: "absolute",
		inset: 0,
	},
	modal: {
		height: "35%",
		width: "100%",
		backgroundColor: "#25292e",
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: "absolute",
		bottom: 0,
	},
	header: {
		height: "16%",
		backgroundColor: "#464C55",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		color: "#fff",
		fontSize: 16,
	},
});
