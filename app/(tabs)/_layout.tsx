import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

const Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#25292e",
					borderColor: "#25292e",
				},
				headerStyle: {
					backgroundColor: "#25292e",
				},
				headerShadowVisible: false,
				headerTintColor: "#fafafa",
				tabBarActiveTintColor: "#fafafa",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "home-sharp" : "home-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: "About",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={
								focused ? "information-circle" : "information-circle-outline"
							}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default Layout;
