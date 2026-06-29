import React from 'react';
import { Tabs } from 'expo-router';
import { HapticTab, IconSymbol } from "@/components/atoms";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {useFavoriteStore} from "@/store/favorite.store";

export default function TabLayout() {
  const colorScheme = useColorScheme();

    const totalFavorites = useFavoriteStore(state => state.favorites.length);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Empleos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
          tabBarBadge: totalFavorites > 0 ? totalFavorites : undefined,
        }}
      />
    </Tabs>
  );
}
