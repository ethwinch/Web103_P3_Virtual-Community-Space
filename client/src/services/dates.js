const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hoursStr, minutesStr] = timeString.split(':');
    let hours = parseInt(hoursStr);
    const minutes = minutesStr || '00';
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
}
const formatRemainingTime = (eventRemaining) => {
    if (!eventRemaining) return '';
    const eventDate = new Date(eventRemaining);
    const now = new Date();
    const diffTime = eventDate - now;
    if (diffTime < 0) {
        const absDiff = Math.abs(diffTime);
        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `Event passed by: ${days}d ${hours}h ago`;
    } else {
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        return `${days}d ${hours}h ${minutes}m remaining`;
    }
}
const formatNegativeTimeRemaining = (remainingString, id) => {
    const element = document.getElementById(`remaining-${id}`);
    if (element && remainingString && remainingString.includes('passed')) {
        element.style.color = '#ff6b6b';
        element.style.fontWeight = 'bold';
        const article = element.closest('.event-information');
        if (article) {
            article.classList.add('passed-event');
        }
    }
}
export default {
    formatTime,
    formatRemainingTime,
    formatNegativeTimeRemaining
}