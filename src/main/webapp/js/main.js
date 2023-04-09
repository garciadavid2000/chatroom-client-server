let ws;

let roomID;
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
            // create a new button element with the room ID as its text content
            let button = document.createElement('button');
            button.textContent = response;
            button.style.display = 'block';
            button.onclick = function() {
                enterRoom(response);
            };

            // add the button to the sidebar
            let sidebar = document.getElementById('sidebar');
            let nav = sidebar.querySelector('nav');
            let ul = nav.querySelector('ul');
            let h2 = ul.querySelector('h2');
            ul.insertBefore(button, h2.nextSibling);
            roomID = response;
            enterRoom(response);

            roomID = response.substring(0,5);

        });
}

function enterRoom(code){

    // refresh the list of rooms

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
}

// document.getElementById("input").addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//         let request = {"type":"chat", "msg":event.target.value};
//         ws.send(JSON.stringify(request));
//         event.target.value = "";
//     }
// });

function sendJSON() {
    let input = document.getElementById("chat-input");

    let request = {"room": roomID, "type": "chat", "msg": input.value};
    requestJSON = JSON.stringify(request);
    console.log(requestJSON);
    ws.send(requestJSON);
}

// function send() { // old one
//     let input = document.getElementById("chat-input");
//     let request = {"room":roomID, "type":"chat", "msg":input.value};
//     ws.send(JSON.stringify(request));
//     input.value = "";
// }

function timestamp() {
    var d = new Date(), minutes = d.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return d.getHours() + ':' + minutes;
}


