
var elem = {
    getMessages: document.querySelector('#get-messages'),
    getMessButton: document.querySelector('#get-message'),
    deleteMessButton: document.querySelector('#message-delete'),
    messIdInput: document.querySelector('#message-id'),
    messContainer: document.querySelector('#message-container'),
};

//console.log(elem.usersContainer);

(function(){
    bindListeners();
})();

var currentMessages = [];

function bindListeners(){
    elem.getMessages.addEventListener('click', function(event){
        getMessages(null, function(err, messages){
            renderMessages(messages);
        });
    });

    elem.getMessButton.addEventListener('click', function(event){

        var messageId = Number(elem.messIdInput.value);
        if (!isNaN(messageId)){
            getMessages(messageId, function(err, messages){
                renderMessages(messages);
            });
        }
    });

    elem.deleteMessButton.addEventListener('click', function(event){
        var messageId = Number(elem.messIdInput.value);
        if (!isNaN(messageId)){
            deleteMessage(messageId, function(isSuccess){
                if (isSuccess){
                    renderMessages
                }
            });
        }
    });
}

function renderMessages(messages){
    if (!messages){
        messages = currentMessages;
    }
    elem.messContainer.innerHTML = '';

    for (var i = 0; i < messages.length; i++){
        var message = messages[i];
        var mesContainer = document.createElement('div');
        mesContainer.className = 'message-container';

        var senderId = document.createElement('div');
        senderId.innerText = message.senderId;
        senderId.className = 'sender-id';
        mesContainer.appendChild(senderId);

        var receiverId = document.createElement('div');
        receiverId.innerText = message.receiverId;
        receiverId.className = 'receiver-id';
        mesContainer.appendChild(receiverId);

        var messageText = document.createElement('div');
        messageText.innerText = message.message;
        mesContainer.appendChild(messageText);

        elem.messContainer.appendChild(mesContainer);
    }
}

function deleteMessage(id, callback){
    var connection = new XMLHttpRequest();
    connection.addEventListener('load', reqListener);
    connection.open('DELETE', '/api/message/' + id);
    connection.send();

    function reqListener(event){
        callback(this.status === 200);      
    }
}

function getMessages(id, callback){
    var idString = '';
    var isOneMessage = false;
    if (id !== null){
        idString = '/' + id;
        isOneMessage = true;
    }
    var connection = new XMLHttpRequest();
    connection.addEventListener('load', reqListener);
    connection.open('GET', '/api/message' + idString);
    connection.send();


    function reqListener(event){
        try {
            var resp = JSON.parse(this.responseText);
            if (isOneMessage){
                resp = [resp];
            } else {
                currentMessages = resp;
            }
        } catch(e){
            return callback(new Error('error parsing response'));
        }
        callback(null, resp);
    }
}

