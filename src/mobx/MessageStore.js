import { makeAutoObservable } from "mobx";

class MessageStore {
    constructor() {
        makeAutoObservable(this)
    }

    messages = [];
    ids = [];
    index = 0;

    push(result){
        const json = JSON.parse(result);
        const message = json.returnObject;

        // this.messages.push(message);
        this.messages = [message, ...this.messages];
        // this.messages[message.id] = message;
        // if(this.ids.indexOf(message.id) === -1){
        //     this.ids.push(message.id);
        // }

        console.info(JSON.stringify(this.messages));
        console.info("执行了messageStore.push")
    }

    increase(){
        this.index++;
        this.messages= [this.index, ...this.messages]

        console.log(JSON.stringify(this.messages))
    }

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
            const uri = 'ws://localhost:18888/push';
            const socket = new WebSocket(uri);

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

const messageStore = new MessageStore();

messageStore.start();

// setInterval(() => {
//     messageStore.increase();
// }, 10000);

export default messageStore;