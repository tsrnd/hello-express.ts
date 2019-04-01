const socket = io('http://localhost:3001/chat');
const URLParams = new URLSearchParams(window.location.search);
const token = URLParams.get('token');
let msgs = [];
socket.on('connection', () => {
    console.log('connected');
    socket.emit('auth', { token: token });
});

socket.on('auth-fail', msg => {
    alert(msg);
});

socket.on('info', data => {
    $('#txt-user-info').html(
        data.user.email + ' <span class="glyphicon glyphicon-user"></span>'
    );
    updatListOfuser(data.clients);
    socket.emit('old message', { limit: 20 });
});

$('.input-group-text.send_btn').click(() => {
    let msg = $('#message').val();
    appendMessage({ isSelf: true, content: msg });
    sendMsg(msg);
    $('#message').val('');
});

$('#message').bind('input propertychange', function() {
    socket.emit('typing', true);
});

$('#message').focusout(() => {
    socket.emit('typing', false);
});
typingList = [];
socket.on('typing', data => {
    if (data.type == 'append') {
        if (typingList.indexOf(data.content) == -1) {
            typingList.push(data.content);
        }
    } else {
        typingList.splice(data.content);
    }
    if (typingList.length > 0) {
        $('#btn-typing').html(typingList.join(' and ') + ' is typing...');
    } else {
        $('#btn-typing').html('');
    }
});

socket.on('message', data => {
    console.log(data);
    appendMessage({ content: data });
});

socket.on('self message', data => {
    appendMessage({ content: data, isSelf: true });
});

socket.on('welcome', data => {
    appendServerMessage(data);
});

function sendMsg(msg) {
    socket.emit('message', msg);
}

// file upload
var uploadHelper = new SocketIOFileUpload(socket);
uploadHelper.listenOnInput(document.getElementById('file_input'));
uploadHelper.addEventListener('start', event => {
    $('#btn-typing').html('Start uploading...');
});
uploadHelper.addEventListener('progress', function(event) {
    var percent = (event.bytesLoaded / event.file.size) * 100;
    $('#btn-typing').html('Uploading ' + percent.toFixed(2) + ' %');
});
uploadHelper.addEventListener('complete', function(event) {
    console.log(event.file);
    $('#btn-typing').html('Finish');
});

function updatListOfuser(clients) {
    let users = '';
    clients.forEach(client => {
        users +=
            `
        <li class="">
          <div class="d-flex bd-highlight">
            <div class="img_cont"><img class="rounded-circle user_img" src="/static/img/default.png" /><span class="online_icon"></span></div>
            <div class="user_info"><span>` +
            client.user.email +
            `</span>
              <p>online</p>
            </div>
          </div>
        </li>`;
    });
    $('#ul-users').html(users);
}

function appendMessage(msg) {
    if (msg.isSelf) {
        $('.card-body.msg_card_body').append(
            `<div class="d-flex justify-content-end mb-4">
            <div class="msg_cotainer_send">` +
                msg.content +
                `<span class="msg_time_send">9:10 AM, Today</span></div>
            <div class="img_cont_msg"><img class="rounded-circle user_img_msg" src= "/static/img/default.png"/></div>
          </div>`
        );
    } else {
        $('.card-body.msg_card_body').append(
            `<div class="d-flex justify-content-start mb-4">
            <div class="img_cont_msg"><img class="rounded-circle user_img_msg" src="/static/img/default.png" /></div>
            <div class="msg_cotainer">` +
                msg.content +
                `<span class="msg_time">9:12 AM, Today</span></div>
          </div>`
        );
    }
}

function appendServerMessage(msg) {
    $('.card-body.msg_card_body').append(
        `<p class="text-center">` + msg + `</p>`
    );
}
