import {View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useFavorite} from "@/hooks/use-favorite";
import {FavoriteTemplate} from "@/components/template/FavoriteTemplate";

export default function TabTwoScreen() {
  const {styles} = useFavorite();
  return (
      <SafeAreaView style={styles.container} >
          <FavoriteTemplate />
      </SafeAreaView>
  );
}


