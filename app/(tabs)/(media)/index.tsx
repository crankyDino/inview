import {
    Appearance, Platform, StyleSheet, ScrollView,
    SafeAreaView, Image, FlatList,
    View,
    Text,
    Alert
} from 'react-native';
import { Colors } from '@/constants/Colors';

import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useStorage } from '@/hooks/useStorage';
import { ThemedView } from '@/components/ThemedView';
import ObscuraButton from '@/components/ObscuraButton';
import { saveToLibraryAsync } from 'expo-media-library';

export function content() {
    // const styles = StyleSheet.create();
    const colourScheme = Appearance.getColorScheme();
    const theme = colourScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyle(theme, colourScheme);
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

    const { videos, reset } = useStorage()
    const { media, type } = useLocalSearchParams();
    const router = useRouter();

    // let videos: TVideo[] = []
    // let { fetchData } = useStorage()
    // useEffect(() => {
    //     // fetchData()
    //     storage.getAllKeys().forEach((el, i) => {
    //         // const [val] = useMMKVObject(el, storage)
    //         videos ? videos.push(JSON.parse(storage.getString(el) ?? "")) : null
    //         console.log(videos);
    //     });
    // }, [videos])

    // if (storage.getAllKeys()[0]) {
    //     const [val] = useMMKVObject(storage.getAllKeys()[0], storage)
    //     console.log(val);
    // }
    return (

        <ThemedView style={styles.container}>
            <Container style={styles.contentContainer}>
                <FlatList
                    data={videos}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item?.id.toString()}
                    ListEmptyComponent={<Text >DER IZ NOTING! </Text>}
                    renderItem={({ item, index }) => (
                        <View style={styles.row} >
                            <View style={styles.menuTextRow}>
                                <Text style={[styles.menuItemTitle, styles.menuItemText]} >Date:</Text>
                                <Text style={styles.menuItemText} >{item.date}</Text>
                                <ObscuraButton
                                    title="Save to gallery"
                                    containerStyle={{ alignSelf: "flex-start", marginTop: 3 }}
                                    onPress={async () => {
                                        saveToLibraryAsync(item.path);
                                        Alert.alert("Saved to gallery!");
                                    }}
                                />
                            </View>
                            <Image
                                source={{ uri: `file://${item.path}` }}
                                style={styles?.menuImage}
                            />
                        </View>
                    )}
                >

                </FlatList>
            </Container >

            <ObscuraButton

                title="clear"
                containerStyle={{ alignSelf: "center" }}
                onPress={() => reset()}
            />
        </ThemedView>
    );
    //     {
    //         <Image
    //             source={{ uri: `file://${media}` }}
    //             style={{ width: "100%", height: "80%", resizeMode: "contain" }}
    //         />
    //         // <Video source={{ uri: media }} style={{ width: "100%", height: "100%" }} />
    //     }
    //     <ObscuraButton

    //         title="Save to gallery"
    //         containerStyle={{ alignSelf: "center" }}
    //         onPress={async () => {
    //             saveToLibraryAsync(media as string);
    //             Alert.alert("Saved to gallery!");
    //             router.back();
    //         }}
    //     />
    //     <Link href="/(tabs)/(camera)" style={styles.link}>
    //         <ThemedText type="link">Delete and go back</ThemedText>
    //     </Link>
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
        },

        container: {
            flex: 1,
            padding: 20,
        },
        link: {
            marginTop: 15,
            paddingVertical: 15,
            alignSelf: "center",
        },

    })
}