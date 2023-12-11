document.getElementById('send-btn').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessageToChat('user', userInput);
        getResponseFromAPI(userInput);
        document.getElementById('user-input').value = '';
    }
}

function addMessageToChat(sender, message) {
    var chatBox = document.getElementById('chat-box');
    var messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = sender;

    // Apply animation if the sender is 'bot'
    if (sender === 'bot') {
        messageElement.classList.add('bot-anim');
        messageElement.addEventListener('animationend', function () {
            messageElement.classList.remove('bot-anim'); // Remove the class after animation
        });
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat box
}

function getResponseFromAPI(message) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            addMessageToChat('bot', response.content); // Modify as per your response format
        }
    }
    xhr.open('POST', 'http://52.66.24.111:3030/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        supperKey: "IgEuLz!KdWUy~!VX6#hGNN4305)Rey",
        data: {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        }
    }));
}
