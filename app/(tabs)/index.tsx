import { StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { Camera, useCameraPermission } from "react-native-vision-camera";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover"
    },
    text: {
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
    },
})

export default function Index() {
    const { hasPermission } = useCameraPermission();
    const microphonePermissions = Camera.getCameraPermissionStatus();

    return (
        // <View style={styles.container}>
        //     <ImageBackground resizeMode="cover" style={styles.image} source={mountain}>
        //         <Link href={"/settings"} style={styles.text}>Settings</Link>
        //     </ImageBackground >
        // </View>
        <Redirect href={"/permissions"} />
    );
}

