import type { ReactNode } from "react";
import {
	Pressable,
	type PressableProps,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";

interface ButtonProps extends Omit<PressableProps, "style"> {
	theme?: "default" | "primary" | "rounded" | "icon";
	children: ReactNode;
}

export const Button = ({
	children,
	theme = "default",
	...rest
}: ButtonProps) => {
	const themeVariants = variants[theme];

	return (
		<View
			style={{
				...styles.container,
				...themeVariants.container,
			}}
		>
			<Pressable
				style={{
					...styles.button,
					...themeVariants.button,
				}}
				{...rest}
			>
				{children}
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 360,
		height: 68,
		marginHorizontal: 20,
		justifyContent: "center",
		alignItems: "center",
		padding: 3,
	},
	button: {
		borderRadius: 10,
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: 12,
	},
});

const variants: Record<
	NonNullable<ButtonProps["theme"]>,
	Record<string, ViewStyle>
> = {
	default: {
		container: {},
		button: {},
	},
	primary: {
		container: {
			borderWidth: 2,
			borderRadius: 16,
			borderColor: "rgba(255, 255, 255, 0.4)",
		},
		button: {
			backgroundColor: "#fff",
		},
	},
	rounded: {
		container: {
			width: 84,
			height: 84,
			marginHorizontal: 0,
			borderWidth: 4,
			borderColor: "#ffd33d",
			borderRadius: 42,
			padding: 3,
		},
		button: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 42,
			backgroundColor: "#fff",
		},
	},
	icon: {
		container: {
			width: 64,
			maxHeight: 120,
		},
		button: {
			gap: 12,
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
	},
};
