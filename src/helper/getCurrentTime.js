export const getCurrentTime = () => {
    const now = new Date()
    const h = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    return `${h}:${m}`
}