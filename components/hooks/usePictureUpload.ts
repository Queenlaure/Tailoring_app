import * as ImagePicker from "expo-image-picker";

const usePictureUpload = async (multipleSelection:any) => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    // allow selection of only images
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: !multipleSelection,
    allowsMultipleSelection: multipleSelection,
    aspect: [4, 3],
    quality: 1,
    selectionLimit: 5,
  });

  if (!result.canceled) {
    return result;
  }

  return null;
};

export default usePictureUpload;
