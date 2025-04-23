import {
    Appearance, Platform, StyleSheet, Text, View, ScrollView,
    SafeAreaView,
    FlatList,
    Image
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { MENU_ITEMS } from '@/constants/dummy-data';

import actionFigure from "@/assets/images/action-figure.jpeg";

export function content() {
    const colourScheme = Appearance.getColorScheme();
    const theme = colourScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyle(theme, colourScheme);
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

    return (
        <Container style={styles.contentContainer}>
            <FlatList
                data={MENU_ITEMS}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text >DER IZ NOTING!</Text>}
                renderItem={({ item, index }) => (
                    <View style={styles.row} >
                        <View style={styles.menuTextRow}>
                            <Text style={[styles.menuItemTitle, styles.menuItemText]} >{item.title}</Text>
                            <Text style={styles.menuItemText} >{item.description}</Text>
                        </View>
                        <Image
                            source={actionFigure}
                            style={styles.menuImage}
                        />
                    </View>
                )}
            >

            </FlatList>
        </Container >
    )
}

export default content

function createStyle(theme: { text: string; background: string; headerBackground: string; tint: string; icon: string; tabIconDefault: string; tabIconSelected: string; }, colourScheme: string | null | undefined) {

    return StyleSheet.create({
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background,
        },
        separator: {
            height: 1,
            backgroundColor: colourScheme === 'dark' ? 'papayawhip' : "#000",
            width: '50%',
            maxWidth: 300,
            marginHorizontal: 'auto',
            marginBottom: 10,
        },
        footerComp: {
            marginHorizontal: 'auto',
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            maxWidth: 600,
            height: 100,
            marginBottom: 10,
            borderStyle: 'solid',
            borderColor: colourScheme === 'dark' ? 'papayawhip' : '#000',
            borderWidth: 1,
            borderRadius: 20,
            overflow: 'hidden',
            marginHorizontal: 'auto',
        },
        menuTextRow: {
            width: '65%',
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 5,
            flexGrow: 1,
        },
        menuItemTitle: {
            fontSize: 18,
            textDecorationLine: 'underline',
        },
        menuItemText: {
            color: theme.text,
        },
        menuImage: {
            width: 100,
            height: 100,
        }
    })
}