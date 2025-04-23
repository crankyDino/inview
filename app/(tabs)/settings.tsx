import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function Index() {
    return (
        <View style={styles.container}>
            <Link href={"/(tabs)/(camera)"}>Settings Work</Link>
        </View>
    );
}