import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from "react-native-toast-message";
import 'react-native-reanimated';
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import { useColorScheme } from '@/hooks/use-color-scheme';



export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <Stack>
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      <Stack.Screen
                          name="detailJob"
                          options={{
                              headerShown: false,
                          }}
                      />
                  </Stack>
                  <StatusBar style="auto" />
                  <Toast />
              </ThemeProvider>
          </BottomSheetModalProvider>
      </GestureHandlerRootView>
  );
}
