let socket = io.connect('http://192.168.1.21:6677', { 'forceNew': true })

socket.on('messages', function(data) {
    console.log(data);
    render(data);
});

function render(data){
    let html = data.map((message, index) => {
        return (`
            <div class="message ${message.nickname}">
                <strong>${message.nickname}</strong> dice: 
                <p>${message.text}</p>
            </div>
        `)
    }).join(' ');
    let div_msg = document.getElementById('messages');
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;

}

function addMessage(e){
    let message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
    };

    document.getElementById('nickname').style.display = 'none';
    document.getElementById('text').value = '';
    socket.emit('add-message',message);

    return false;

}