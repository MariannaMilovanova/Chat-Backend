const messages = [{
    id: 1,
    senderId: 2,
    receiverId: 1,
    message: "Love of those who are in search of light...."
},{
    id: 2,
    senderId: 3,
    receiverId: 4,
    message: "Will you stay in it?"
},{
    id: 3,
    senderId: 4,
    receiverId: 1,
    message: "I don't need it."
},{
    id: 4,
    senderId: 4,
    receiverId: 2,
    message: " know what prevents --- my ego."
}];

function findMessage(id){
    const err = null;
    if (typeof id === 'undefined'){
        err = new Error('id is undefined');
    }

    let index;
    const message = messages.find((el, ind) => {
        if (el.id === id){
            index = ind;
            return true;
        } else {
            return false;
        }
    });
    return {message, index, err};
}

module.exports = {
    messages: messages,

    findAll: (callback) => {
        callback(null, messages);
    },

    findOne: (id, callback) => {
        const {err, message} = findMessage(id);
        callback(err, message);
    },

    add: (message, callback) => {
        if (typeof message.id !== 'undefined'){
            messages.push(message);
            callback(null);
        } else {
            callback(new Error('message doesnt have id'));
        }
    },

    findOneAndDelete: (id, callback) => {
        let {err, message, index} = findMessage(id);
        if (typeof index !== 'undefined'){
            messages.splice(index, 1);
        } else {
            err = new Error('no messages with such index');
        }
        callback(err);
    },

    findOneAndUpdate: (id, message, callback) => {
        const {err, index} = findMessage(id);
        messages[index] = Object.assign(messages[index], message);
        callback(err);
    },

    // findUserSpeak: (senderId, callback) => {
    //     const {err, index} = findMessage(senderId);
    //     messages[index] = Object.assign(messages[index], message);
    //     callback(err);
    // }
};