import { Image, type ImageSource } from "expo-image";
import { useMemo } from "react";
import { FlatList, Platform, Pressable, StyleSheet } from "react-native";

interface EmojiListProps {
  onClose: VoidFunction;
  onSelect: (sticker: ImageSource) => void;
}

export const EmojiList = ({ onSelect, onClose }: EmojiListProps) => {
  const emojis: ImageSource[] = useMemo(
    () => [
      require("../assets/images/emoji1.png"),
      require("../assets/images/emoji2.png"),
      require("../assets/images/emoji3.png"),
      require("../assets/images/emoji4.png"),
      require("../assets/images/emoji5.png"),
      require("../assets/images/emoji6.png"),
    ],
    [],
  );

  const handleAddEmoji = (emoji: ImageSource) => {
    onSelect(emoji);
    onClose();
  };

  return (
    <FlatList
      horizontal
      data={emojis}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      renderItem={({ item, index }) => {
        return (
          <Pressable onPress={() => handleAddEmoji(item)}>
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 85,
    height: 85,
    marginRight: 24,
  },
});
