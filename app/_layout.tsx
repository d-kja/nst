import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="+not-found" />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
