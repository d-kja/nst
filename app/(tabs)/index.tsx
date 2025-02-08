import { Button } from "@/components/button";
import { EmojiList } from "@/components/emoji-list";
import { EmojiPicker } from "@/components/emoji-picker";
import { EmojiSticker } from "@/components/emoji-sticker";
import { ImageViewer } from "@/components/image-viewer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { ImageSource } from "expo-image";
import * as Picker from "expo-image-picker";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { usePermissions, saveToLibraryAsync } from "expo-media-library";
import { captureRef } from "react-native-view-shot";

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
  const [status, requestPermission] = usePermissions();
  const imageRef = useRef<View>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [emojis, setEmojis] = useState<ImageSource[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUseDefault = () => setSelectedImage(placeholder);
  const handleImagePicker = async () => {
    const image = await pickImage();
    const uri = image?.uri;

    if (!uri?.length) {
      return;
    }

    setSelectedImage(uri);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setEmojis([]);
  };

  const handleToggleStickerModal = () => setIsModalOpen((prev) => !prev);
  const handleAddSticker = (emoji: ImageSource) =>
    setEmojis((previous) => [...previous, emoji]);

  const handleSaveSelected = async () => {
    try {
      const hasPermission = !!status;

      if (!hasPermission) {
        requestPermission();
      }

      const image = await captureRef(imageRef, {
        quality: 1,
      });

      await saveToLibraryAsync(image);

      if (image?.length) {
        alert("Image saved!");
      }
    } catch (err) {
      const error = err as Error;

      console.error(error);
      alert(error?.message ?? "An error ocurred!");
    }
  };

  return (
    <>
      <EmojiPicker visible={isModalOpen} onClose={handleToggleStickerModal}>
        <EmojiList
          onSelect={handleAddSticker}
          onClose={handleToggleStickerModal}
        />
      </EmojiPicker>

      <GestureHandlerRootView style={styles.container}>
        <View style={styles.wrapper} ref={imageRef} collapsable={false}>
          <ImageViewer source={selectedImage ?? placeholder} />

          {emojis?.length ? (
            <>
              {emojis?.map((emoji, idx) => {
                return (
                  <EmojiSticker
                    key={`${emoji.cacheKey}-${idx}`}
                    source={emoji}
                    size={40}
                  />
                );
              })}
            </>
          ) : null}
        </View>

        {selectedImage ? (
          <View style={styles.footerAlt}>
            <Button theme="icon" onPress={handleReset}>
              <MaterialIcons name={"refresh"} size={24} color="#fff" />
              <Text style={styles.labelAlt}>Reset</Text>
            </Button>

            <Button theme="rounded" onPress={handleToggleStickerModal}>
              <MaterialIcons name="add" size={38} color="#25292e" />
            </Button>

            <Button theme="icon" onPress={handleSaveSelected}>
              <MaterialIcons name={"save-alt"} size={24} color="#fff" />
              <Text style={styles.labelAlt}>Save</Text>
            </Button>
          </View>
        ) : (
          <View style={styles.footer}>
            <Button theme="primary" onPress={handleImagePicker}>
              <FontAwesome name="picture-o" size={18} color="#25292e" />

              <Text style={styles.label}>Choose a photo</Text>
            </Button>

            <Button theme="default" onPress={handleUseDefault}>
              <Text style={styles.labelAlt}>Use this photo</Text>
            </Button>
          </View>
        )}
      </GestureHandlerRootView>
    </>
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
