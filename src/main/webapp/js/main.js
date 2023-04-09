let ws;


function newRoom(){
    // calling the ChatServlet to retrieve a new room ID
    let callURL= "http://localhost:8080/WSChatServer-1.0-SNAPSHOT/chat-servlet";
    fetch(callURL, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
        },
    })
        .then(response => response.text())
        .then(response => {
            enterRoom(response);
        });
}

function enterRoom(code){

    // refresh the list of rooms
    refresh();
    // create the web socket
    ws = new WebSocket("ws://localhost:8080/WSChatServer-1.0-SNAPSHOT/ws/" + code);

    // parse messages received from the server and update the UI accordingly
    ws.onmessage = function (event) {
        console.log(event.data);
        // parsing the server's message as json
        let message = JSON.parse(event.data);

        // handle message

        document.getElementById("log").value += "[" + timestamp() + "] " + message.msg + "\n";

        }
    document.getElementById("section-inner").innerHTML = "<h2>You are chatting in room: " + code + "</h2>";


}


function sendJSON() {
    let input = document.getElementById("chat-input");

    let request = {"room": roomID, "type": "chat", "msg": input.value};
    requestJSON = JSON.stringify(request);
    console.log(requestJSON);
    ws.send(requestJSON);
}

function refresh(){
    // calling the RoomServlet to retrieve list of rooms for all clients
    let callURL= "http://localhost:8080/WSChatServer-1.0-SNAPSHOT/room-servlet";
    fetch(callURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let sidebar = document.getElementById('sidebar');
            let nav = sidebar.querySelector('nav');
            let ul = nav.querySelector('ul');
            let h2 = ul.querySelector('h2');
            for(let i = 0; i < response.rooms.length; i++)
            {
                let roomID = response.rooms[i];
                let existingButton = ul.querySelector(`button[data-roomid="${roomID}"]`);
                if (!existingButton) {
                    let button = document.createElement('button');
                    button.textContent = roomID;
                    button.style.display = 'block';
                    button.setAttribute('data-roomid', roomID);
                    button.classList.add('buttons');
                    button.onclick = function() {
                        enterRoom(roomID);
                    };
                    ul.insertBefore(button, h2.nextSibling);
                }
            }
        });
}


function timestamp() {
    var d = new Date(), minutes = d.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return d.getHours() + ':' + minutes;
}


