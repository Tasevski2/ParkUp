export const convertMinutesToString = (min) => {
    let days = Math.floor(min / 1440);
    let hours = Math.floor((min - days * 1440) / 60);
    let minutes = Math.floor(min - (days * 1440 + hours * 60));
    let daysString = days ? (days > 1 ? `${days} денови` : `${days} ден`) : '';
    let hoursString = hours
        ? hours > 1
            ? `${hours} часови`
            : `${hours} час`
        : '';
    let minutesString = minutes !== 1
            ? `${minutes} минути`
            : `${minutes} минута`;

    return `${daysString} ${hoursString} ${minutesString}`.trim();
};
