export const portalDrawerWidth = 250;

export default function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx4xxx-yxxxxxxx-xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3|0x8)).toString(16).toUpperCase();
    });
    return uuid;
}