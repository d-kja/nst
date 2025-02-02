import { StyleSheet, Text, View } from "react-native";
import { Link, Stack } from "expo-router";

const Page = () => {
	return (
		<>
			<Stack.Screen options={{ title: "Page not found!" }} />

			<View style={styles.container}>
				<Text style={styles.text}>404 Not Found!</Text>

				<Link href="/" style={styles.button}>
					Home page
				</Link>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#fff",
	},
	button: {
		fontSize: 20,
		textDecorationLine: "underline",
		color: "#fff",
	},
});

export default Page;
