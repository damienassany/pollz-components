import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_900Black,
  useFonts,
} from "@expo-google-fonts/outfit";
import Storybook from "./.storybook";

export default () => {
  const [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_900Black,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Storybook />;
};
