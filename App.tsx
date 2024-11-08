import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HomeScreen from '@/screens/home';
import FavoritesScreen from '@/screens/favorites';
import TopRatedScreen from '@/screens/top-rated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppRoutes, routeIconMapping } from '@/config/routes.config';
import Ionicons from '@expo/vector-icons/Ionicons';

import { PaperProvider } from 'react-native-paper';
import { LogBox, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { appTheme } from '@/config/theme.config';

const Tab = createBottomTabNavigator();

// LogBox.ignoreAllLogs(true); // Suppress all warnings

// // Suppress warnings and errors in the console
// console.warn = () => {};
// console.error = () => {};

const envSchema = z.object({
  EXPO_PUBLIC_SERVER_IP: z.string().ip(),
  EXPO_PUBLIC_SERVER_PORT: z.string().length(4),
});

const result = envSchema.safeParse(process.env);
if (result.error) {
  console.error(result.error);
}
console.info('[app]: ENV', result.data);

export default function App() {
  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer>
        <StatusBar style="auto" animated />

        <Tab.Navigator
          initialRouteName={AppRoutes.Root}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={routeIconMapping[route.name as AppRoutes] as any}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="tab-home"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarLabel: () => null,
            }}
          />

          <Tab.Screen
            name="tab-top-rated"
            component={TopRatedScreen}
            options={{ tabBarLabel: () => null, }}
          />
          <Tab.Screen
            name="tab-favorites"
            component={FavoritesScreen}
            options={{ tabBarLabel: () => null, headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
