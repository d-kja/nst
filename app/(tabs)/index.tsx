import { StyleSheet, Text, View } from "react-native";
import { ImageViewer } from "@/components/image-viewer";
import { Button } from "@/components/button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Picker from "expo-image-picker";
import { useState } from "react";

const placeholder = require("@/assets/images/background-image.png") as string;

// Outside of the export to avoid unnecessary re-renders, once the reference
// in the memory is created, the component is going to be using the same pointer
const pickImage = async () => {
	const response = await Picker.launchImageLibraryAsync({
		mediaTypes: ["images"],
		allowsEditing: true,
		quality: 1,
	});

	if (response.canceled) {
		return;
	}

	return response.assets?.at(0);
};

const Page = () => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleUseDefault = () => setSelectedImage(placeholder);
	const handleImagePicker = async () => {
		const image = await pickImage();
		const uri = image?.uri;

		if (!uri?.length) {
			return;
		}

		setSelectedImage(uri);
	};

	const handleReset = () => setSelectedImage(null);
  const handleAddSticker = () => {
    // TODO: implement
  }
  const handleSaveSelected = () => {
    // TODO: implement
  }

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<ImageViewer source={selectedImage ?? placeholder} />
			</View>

			{selectedImage ? (
				<View style={styles.footerAlt}>
					<Button theme="icon" onPress={handleReset}>
						<MaterialIcons name={"refresh"} size={24} color="#fff" />
						<Text style={styles.labelAlt}>Reset</Text>
					</Button>

					<Button theme="rounded" onPress={handleReset}>
						<MaterialIcons name="add" size={38} color="#25292e" />
					</Button>

					<Button theme="icon" onPress={handleReset}>
						<MaterialIcons name={"save-alt"} size={24} color="#fff" />
						<Text style={styles.labelAlt}>Save</Text>
					</Button>
				</View>
			) : (
				<View style={styles.footer}>
					<Button theme="primary" onPress={handleImagePicker}>
						<FontAwesome
							name="picture-o"
							size={18}
							color="#25292e"
						/>

						<Text style={styles.label}>Choose a photo</Text>
					</Button>

					<Button theme="default" onPress={handleUseDefault}>
						<Text style={styles.labelAlt}>Use this photo</Text>
					</Button>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 28,
	},
	wrapper: {
		flex: 1,
	},
	footer: {
		flex: 1 / 2,
		alignItems: "center",
	},
	footerAlt: {
		flex: 1 / 1.1,
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
	},
	label: {
		color: "##25292e",
		fontSize: 16,
	},
	labelAlt: {
		color: "#fff",
		fontSize: 16,
	},
});

export default Page;
