export const generateUUID = () => {
    let time = new Date().getTime();

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        char => {
            const random = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
};
