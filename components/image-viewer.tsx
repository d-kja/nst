import { Image, type ImageProps } from "expo-image";
import { StyleSheet } from "react-native";

interface ImageViewerProps extends Omit<ImageProps, "style"> {}

export const ImageViewer = ({ ...rest }: ImageViewerProps) => {
	return <Image style={styles.image} {...rest} />;
};

const styles = StyleSheet.create({
	image: {
		width: 360,
		height: 440,
		borderRadius: 18,
	},
});
