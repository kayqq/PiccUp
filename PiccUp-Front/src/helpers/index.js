export const tConvert = time => {
    // Check correct time format and split into components
    time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
};

export const formatDate = date => {
    const newDate = new Date(date);
    var monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var day = newDate.getDate();
    var monthIndex = newDate.getMonth();
    var year = newDate.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ' ' + year;
};

export const formatDay = date => {
    const newDate = new Date(date);
    var dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    var dayIndex = newDate.getDay();

    return dayNames[dayIndex];
};

export const formatTime = date => {
    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const calcDaysAgo = date => {
    //Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1_ms = new Date(date).getTime();
    const date2_ms = new Date().getTime();

    // Calculate the difference in milliseconds
    const difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
};

export const calcDaysUntil = date => {
    //Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1_ms = new Date().getTime();
    const date2_ms = new Date(date).getTime();

    // Calculate the difference in milliseconds
    const difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
};

export const filterJoinedGames = (games, username) => {
    return games.filter(game => {
        const allPlayers = [].concat.apply(
            [],
            Object.values(game.current_players)
        );
        return allPlayers.includes(username);
    });
};

export const filterActiveChat = (chats, activeChatId) => {
    if (!activeChatId) return;
    return chats.find(chat => chat.id === activeChatId);
};

export const filterActiveGame = (allActiveGames, selectedGameId) => {
    if (!selectedGameId) return;
    return allActiveGames.find(game => game.id === selectedGameId);
};
