import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const Page = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Project following Expo's tutorial about React Native. You can find the
				tutorial by clicking on the following link: {" "}
				<Link style={styles.button} href="https://docs.expo.dev/tutorial">
					Reference link
				</Link>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 32,
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		backgroundColor: "#25292e",
		alignItems: "center",
	},
	text: {
		color: "#fff",
	},
	button: {
		textDecorationLine: "underline",
		color: "#fff",
	},
});

export default Page;
