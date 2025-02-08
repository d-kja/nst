import type { ImageSourcePropType, ImageStyle } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface EmojiStickerProps {
  source: ImageSourcePropType;
  style?: ImageStyle;
  size: number;
}

export const EmojiSticker = ({
  source,
  style = {},
  size,
}: EmojiStickerProps) => {
  const scale = useSharedValue(size);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const iconStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scale.value),
      height: withSpring(scale.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
    };
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      const double = size * 2;

      if (scale.value >= double) {
        scale.value = size;
        return;
      }

      scale.value = double;
    });

  const drag = Gesture.Pan().onChange((event) => {
    const { changeX, changeY } = event;

    translateX.value += changeX;
    translateY.value += changeY;
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -250, left: 165 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            resizeMode="contain"
            source={source}
            style={[iconStyle, style]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
};
