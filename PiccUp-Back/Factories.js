const uuidv4 = require('uuid/v4');

/*
*	createMessage
*	Creates a messages object.
* 	@prop id {string}
* 	@prop time {Date} the time in 24hr format i.e. 14:22
* 	@prop message {string} actual string message
* 	@prop sender {string} sender of the message
*	@param {object} 
*		message {string}
*		sender {string}
*/
const createMessage = ({ message = '', sender = '', chatId = null } = {}) => ({
    id: uuidv4(),
    chatId,
    time: getTime(new Date(Date.now())),
    message,
    sender
});

/*
*	createChat
*	Creates a Chat object
* 	@prop id {string}
* 	@prop users {Array.string}
*	@param {object} 
*		users {Array.string}
*/
const createChat = ({ users = [] } = {}) => ({
    id: uuidv4(),
    users
});

/*
*	@param date {Date}
*	@return a string represented in 24hr time i.e. '11:30', '19:30'
*/
const getTime = date => {
    return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
};

module.exports = {
    createMessage,
    createChat
};
