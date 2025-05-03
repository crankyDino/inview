import { Alert, StyleSheet, Switch, View } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import * as ExpoMediaLibrary from "expo-media-library";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    subtitle: {
        textAlign: "center"
    },
    footnote: {
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 2
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    permissionsContainer: {
        backgroundColor: "#ffffff20",
        borderRadius: 10,
        padding: 10,
        justifyContent: "space-between"
    },
    permissionText: {
        marginLeft: 10,
        flexShrink: 1
    },
    continueButton: {
        padding: 10,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 50,
        alignSelf: "center"
    },
    spacer: {
        marginVertical: 8
    }
})
const ICON_SIZE = 26

export function permissions() {
    const router = useRouter();
    const [cameraPermissionStatus, setCameraPermissionStatus] = React.useState<CameraPermissionStatus>("not-determined");
    const [microphonePermissionStatus, setMicrophonePermissionStatus] = React.useState<CameraPermissionStatus>("not-determined");
    const [mediaLibraryPermission, requestMediaLibraryPermissionStatus] = ExpoMediaLibrary.usePermissions();

    const requestMicrophonePermissions = async () => {
        const permission = await Camera.requestMicrophonePermission();
        setMicrophonePermissionStatus(permission);
    }

    const requestCameraPermissions = async () => {
        const permission = await Camera.requestCameraPermission();
        setCameraPermissionStatus(permission);
    }

    const handleContinue = () => {
        if (
            cameraPermissionStatus === "granted" &&
            microphonePermissionStatus === "granted" &&
            mediaLibraryPermission?.granted
        ) {
            router.replace("/");
        } else {
            Alert.alert("Please go to settings and enable permissions");
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: "Permissions" }} />
            <ThemedView style={styles.container}>
                <ThemedText style={styles.subtitle}>
                    Where dem prems bruv?
                </ThemedText>

                <View style={styles.row}>
                    <Ionicons
                        name='lock-closed-outline'
                        size={ICON_SIZE}
                        color={"orange"}
                    />
                    <ThemedText style={styles.footnote}>
                        You need this shit
                    </ThemedText>
                </View>

                <View
                    style={StyleSheet.compose(styles.row, styles.permissionsContainer)}
                >
                    <View style={styles.row}>
                        <Ionicons
                            name="camera-outline"
                            color={"gray"}
                            size={ICON_SIZE}
                        />
                        <View style={styles.permissionText}>
                            <ThemedText type="subtitle">Camera</ThemedText>
                            <ThemedText>Used for the camera</ThemedText>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ true: "orange" }}
                        value={cameraPermissionStatus === "granted"}
                        onChange={requestCameraPermissions}
                    />
                </View>

                <View style={styles.spacer} />

                <View
                    style={StyleSheet.compose(styles.row, styles.permissionsContainer)}
                >
                    <View style={styles.row}>
                        <Ionicons
                            name="mic-circle-outline"
                            color={"gray"}
                            size={ICON_SIZE}
                        />
                        <View style={styles.permissionText}>
                            <ThemedText type="subtitle">Microphone</ThemedText>
                            <ThemedText>Used for recording video</ThemedText>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ true: "orange" }}
                        value={microphonePermissionStatus === "granted"}
                        onChange={requestMicrophonePermissions}
                    />
                </View>

                <View style={styles.spacer} />

                <View
                    style={StyleSheet.compose(styles.row, styles.permissionsContainer)}
                >
                    <Ionicons name="library-outline" color={"gray"} size={ICON_SIZE} />
                    <View style={styles.permissionText}>
                        <ThemedText type="subtitle">Library</ThemedText>
                        <ThemedText>Used for saving, viewing and more.</ThemedText>
                    </View>
                    <Switch
                        trackColor={{ true: "orange" }}
                        value={mediaLibraryPermission?.granted}
                        // @ts-ignore
                        onChange={async () => await requestMediaLibraryPermission()}
                    />
                </View>

                <View style={styles.spacer} />
                <View style={styles.spacer} />
                <View style={styles.spacer} />

            </ThemedView>
        </>
    )
}

export default permissions