import { StyleSheet } from 'react-native';
import React from 'react';
import { CameraPermissionStatus } from 'react-native-vision-camera';
import * as ExpoMediaLibrary from 'expo-media-library';
import { ThemedView } from '@/components/ThemedView';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export function permissions() {
    const [cameraPermissionsStatus, setCameraPermissionsStatus] = React.useState<CameraPermissionStatus>("not-determined");
    const [microphonePermissionsStatus, setMicrophonePermissionsStatus] = React.useState<CameraPermissionStatus>("not-determined");
    const [mediaLibraryPermissionsStatus, requestMediaLibraryPermissionsStatus] = ExpoMediaLibrary.usePermissions();


    return (
        <ThemedView>

        </ThemedView>
    )
}

export default permissions