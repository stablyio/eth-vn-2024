declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.json' {
    const value: any;
    export default value;
}

declare global {
    interface Window { ethereum?: any; }
}
