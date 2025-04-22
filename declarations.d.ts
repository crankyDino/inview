declare module '*.jpg' {
    const content: number; // React Native images are numbers (require IDs)
    export default content;
}

declare module '*.jpeg' {
    const content: number; // React Native images are numbers (require IDs)
    export default content;
}
