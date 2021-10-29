import messageStore from "../mobx/MessageStore";

class WebSocket {
    isFirst = true;

    start() {
        if (!this.isFirst) {
            console.log("已经启动过");
            return;
        }
        // debugger
        this.isFirst = false;

        console.info("启动websocket");

        if (!window.WebSocket) {
            window.WebSocket = window.MozWebSocket;
        }

        if (window.WebSocket) {
            uri = 'ws://localhost:18888/push';
            const socket = new WebSocket(this.uri);

            // debugger;
            socket.onmessage = function (event) {
                console.log(`接收到消息：${event.data}`);
                messageStore.push(event.data);

                // var ta = document.getElementById('responseText');
                // ta.value = ta.value + '\n' + event.data
            };
            socket.onopen = function (event) {
                // var ta = document.getElementById('responseText');
                // ta.value = "Web Socket opened!";
                this.socket = socket;
                // debugger;
                console.info('注册中');
                const msg =
                    'version=1\n\
action=register\n\n\
id=2\n\
Authorization=1';

                this.socket.send(msg);
            };
            socket.onclose = function (event) {
                // var ta = document.getElementById('responseText');
                // ta.value = ta.value + "Web Socket closed";
            };


        } else {
            alert("Your browser does not support Web Socket.");
        }
    }
}

const webSocket = new WebSocket();

export default webSocket;