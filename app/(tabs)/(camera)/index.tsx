import ExposureControls from "@/components/ExposureControls";
import ObscuraButton from "@/components/ObscuraButton";
import { ThemedText } from "@/components/ThemedText";
import ZoomControls from "@/components/ZoomControls";
import { FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import { Dimensions, Linking, Platform, StatusBar, StyleSheet, TouchableHighlight, View } from "react-native";
import { Camera, useCameraDevice, useCameraDevices, useCameraPermission } from "react-native-vision-camera";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
export default function () {
    const { hasPermission } = useCameraPermission();
    const microphonePermission = Camera.getMicrophonePermissionStatus();
    const [showZoomControls, setShowZoomControls] = React.useState(false);
    const [showExposureControls, setShowExposureControls] = React.useState(false);

    const camera = React.useRef<Camera>(null);
    const devices = useCameraDevices();
    const [cameraPosition, setCameraPosition] = React.useState<"front" | "back">(
        "back"
    );
    const device = useCameraDevice(cameraPosition);
    const [zoom, setZoom] = React.useState(device?.neutralZoom);
    const [exposure, setExposure] = React.useState(0);
    const [flash, setFlash] = React.useState<"off" | "on">("off");
    const [torch, setTorch] = React.useState<"off" | "on">("off");
    const [CAMERA_ICON, setCameraIcon] = React.useState<"stop-circle" | "dot-circle">("dot-circle")
    const [IS_RECORDING, setRecordingState] = React.useState<boolean>(false)
    const redirectToPermissions =
        !hasPermission || microphonePermission === "not-determined";

    const router = useRouter();

    const recordVideo = async () => {
        try {
            if (camera.current == null) throw new Error("Camera ref is null!");
            setCameraIcon("stop-circle")
            console.log("Taking photo...");
            if (!IS_RECORDING) {
                setRecordingState(true)
                const photo = await camera.current.startRecording({
                    // flash: flash,
                    // enableShutterSound: 
                    onRecordingError: (err) => {
                        console.error(err);
                        setRecordingState(true)
                    },
                    onRecordingFinished: (video) => {
                        console.log(video);
                        setRecordingState(false)

                        setCameraIcon("dot-circle")
                        router.push({
                            pathname: "/(tabs)/(media)",
                            params: { type: "video" },
                        });
                    },
                });
            } else {
                setRecordingState(false);
                // setCameraIcon("dot-circle")
                camera.current.stopRecording();
            }
            // onMediaCaptured(photo, 'photo')
        } catch (e) {
            console.error("Failed to take photo!", e);
        }
    };
    const screenHeight = Dimensions.get('window').height;

    if (redirectToPermissions) return <Redirect href={"/permissions"} />;
    if (!device) return <></>;
    return (
        <>
            <StatusBar barStyle={"light-content"} />
            <View style={styles.container}>
                <View style={{ flex: 1, overflow: "hidden", borderColor: "green", borderWidth: 3 }}>
                    <Camera
                        ref={camera}
                        style={{ flex: 1 }}
                        photo={true}
                        zoom={zoom}
                        device={device!}
                        isActive={true}
                        resizeMode="cover"
                        preview={true}
                        exposure={exposure}
                        torch={torch}
                        video={true}
                        audio={true}
                    // fps={60}
                    />
                    {/* <BlurView
                        intensity={100}
                        tint="dark"
                        style={{
                            flex: 1,
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            padding: 10,
                        }}
                        experimentalBlurMethod="dimezisBlurView"
                    >
                        <Text
                            style={{
                                color: "white",
                                top: 0
                            }}
                        >
                            Exposure: {exposure} | Zoom: x{zoom}
                        </Text>
                    </BlurView> */}
                </View>

                {/* <ZoomControls
            setZoom={setZoom}
            setShowZoomControls={setShowZoomControls}
            zoom={zoom}
          /> */}

                {showZoomControls ? (
                    <ZoomControls
                        setZoom={setZoom}
                        setShowZoomControls={setShowZoomControls}
                        zoom={zoom ?? 1}
                    />
                ) : showExposureControls ? (
                    <ExposureControls
                        setExposure={setExposure}
                        setShowExposureControls={setShowExposureControls}
                        exposure={exposure}
                    />
                ) : (
                    <View style={{ flex: 1, position: "absolute", zIndex: 10, bottom: 0, width: "100%" }}>
                        {/* Top section */}
                        <View
                            style={{
                                flex: 0.7,
                                padding: 10

                            }}
                        >
                            <ThemedText style={{ color: "white" }}>Max FPS: {device.formats[0].maxFps}</ThemedText>
                            <ThemedText style={{ color: "white" }}>
                                Width: {device.formats[0].photoWidth} Height:{" "}
                                {device.formats[0].photoHeight}
                            </ThemedText>
                            <ThemedText style={{ color: "white" }}>Camera: {device.name}</ThemedText>
                        </View>

                        {/* Middle section */}
                        <BlurView
                            intensity={100}
                            tint="dark"
                            style={{
                                flex: 1,
                                paddingBlock: 15,
                                rowGap: 10
                            }}
                            experimentalBlurMethod="dimezisBlurView"
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <ObscuraButton
                                    iconName={torch === "on" ? "flashlight" : "flashlight-outline"}
                                    onPress={() => setTorch((t) => (t === "off" ? "on" : "off"))}
                                    containerStyle={{ alignSelf: "center" }}
                                />
                                <ObscuraButton
                                    iconName={
                                        flash === "on" ? "flash-outline" : "flash-off-outline"
                                    }
                                    onPress={() => setFlash((f) => (f === "off" ? "on" : "off"))}
                                    containerStyle={{ alignSelf: "center" }}
                                />
                                <ObscuraButton
                                    iconName="camera-reverse-outline"
                                    onPress={() =>
                                        setCameraPosition((p) => (p === "back" ? "front" : "back"))
                                    }
                                    containerStyle={{ alignSelf: "center" }}
                                />
                                <ObscuraButton
                                    iconName="image-outline"
                                    onPress={() => {
                                        const link = Platform.select({
                                            ios: "photos-redirect://",
                                            android: "content://media/external/images/media",
                                        });
                                        Linking.openURL(link!);
                                    }}
                                    containerStyle={{ alignSelf: "center" }}
                                />
                                <ObscuraButton
                                    iconName="settings-outline"
                                    onPress={() => router.push("/_sitemap")}
                                    containerStyle={{ alignSelf: "center" }}
                                />
                            </View>

                            {/* Botton section */}
                            <View
                                style={{
                                    flex: 1.1,
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                }}
                            >
                                <ObscuraButton
                                    iconSize={40}
                                    title="+/-"
                                    onPress={() => setShowZoomControls((s) => !s)}
                                    containerStyle={{ alignSelf: "center" }}
                                />

                                <TouchableHighlight onPress={recordVideo}>
                                    <FontAwesome5 name={CAMERA_ICON} size={55} color={"white"} />
                                </TouchableHighlight>
                                <ObscuraButton
                                    iconSize={40}
                                    title="1x"
                                    onPress={() => setShowExposureControls((s) => !s)}
                                    containerStyle={{ alignSelf: "center" }}
                                />
                            </View>
                        </BlurView>
                    </View>
                )}
            </View>
        </>
    )

}