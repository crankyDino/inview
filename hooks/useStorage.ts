import { useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";

export type TVideo = { id: number, date: string, path: string }
export const storage = new MMKV();
export function useStorage() {
    const [videos, setVideos] = useState<Array<{ id: number, date: string, path: string }> | null>(null)


    // const setData = (path: string) => {
    //     try {
    //         // await MMKV.encryption.encrypt();
    //         // await MMKV.setStringAsync("inview-video", path);
    //         const date = `${new Date().getFullYear()}${new Date().getDate()}${new Date().getDay()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`
    //         const x = { path: path, date, id: storage.getAllKeys().length + 1 }
    //         // await MMKV.setStringAsync("inview-video", JSON.stringify(x));
    //         // const stuff = await MMKV.getStringAsync("inview-video")
    //         // stuff ? addVideo(x) : null
    //         storage.set(date, JSON.stringify(x))
    //         setVideo([...videos ?? [], x])
    //         // console.log(videos);
    //         console.log(x);
    //         // console.log(stuff);

    //     } catch (error) { console.error(error); }
    // }

    // const fetchData = () => {
    //     try {
    //         // const stuff = JSON.parse(MMKV.getString("inview-video") ?? "")

    //         // addVideo(stuff)
    //         // console.log(stuff);
    //         // return stuff
    //     } catch (error) { console.error(error); return null }
    // }

    const loadVideosFromStorage = () => {
        const keys = storage.getAllKeys();
        const newVideos: TVideo[] = [];

        keys.forEach((key) => {
            const item = storage.getString(key);
            if (item) {
                try {
                    const parsed = JSON.parse(item);
                    if (parsed?.path && parsed?.date && parsed?.id) {
                        newVideos.push(parsed);
                    }
                } catch (e) {
                    console.warn(`Could not parse item at key ${key}`, e);
                }
            }
        });

        // Sort by date or id if desired
        newVideos.sort((a, b) => b.id - a.id);
        setVideos(newVideos);
    };

    // Add a new video
    const setData = (path: string) => {
        const date = new Date().toISOString();
        const id = storage.getAllKeys().length + 1;
        const video = { path, date, id };
        storage.set(date, JSON.stringify(video));
        loadVideosFromStorage(); // Update the state after adding
    };

    // Clear all
    const reset = () => {
        storage.clearAll();
        setVideos([]);
    };

    // Load videos on first mount and whenever MMKV changes
    useEffect(() => {
        loadVideosFromStorage();

        const listener = storage.addOnValueChangedListener(() => {
            loadVideosFromStorage();
        });

        return () => listener.remove();
    }, []);

    return {
        setData,
        reset,
        videos
    }
}