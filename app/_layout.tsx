import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="+not-found" />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>

			<StatusBar style="light" />
		</>
	);
};

export default Layout;
