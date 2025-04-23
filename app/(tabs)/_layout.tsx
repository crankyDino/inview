import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Tabs } from "expo-router";
import { Appearance, Platform } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


export default function RootLayout() {
    const colorScheme = Appearance.getColorScheme()

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return (<Tabs
        screenOptions={{
            tabBarActiveTintColor: Colors['light'].tint,
            // tabBarItemStyle: { center: "center" },
            // headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
                ios: {
                    // Use a transparent background on iOS to show the blur effect
                    position: 'absolute',
                },
                default: {},
            }),
            headerStyle: { backgroundColor: theme.headerBackground }, headerTintColor: theme.text,
        }}
    >
        <Tabs.Screen name="settings" options={{ tabBarIcon: () => null }} />
        <Tabs.Screen name="(camera)" options={{ title: "In.view", tabBarIcon: () => null }} />
        <Tabs.Screen name="(files)" options={{ title: "Files", tabBarIcon: () => null }} />
    </Tabs >);
}