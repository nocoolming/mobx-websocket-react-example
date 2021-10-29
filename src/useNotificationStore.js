import { useLocalStore, userLocalStore } from 'mobx-react-lite';
// import fetch

const useNotificationStore = () => {
    const store = useLocalStore(() => ({
        messages: [],
        socket: null,
        me: -1,
        to: -1,
        setMe(me) {
            store.me = me;
        },
        setTo(to) {
            store.to = to;
        },
        push(msg) {
            // store.messages = [msg, ...store.messages];
            store.messages.push(msg);
        },
        startSocket() {
            if (!window.WebSocket) {
                window.WebSocket = window.MozWebSocket;
            }

            store.socket = new WebSocket("ws://localhost:18888/push");
            store.socket.onclose = () => setTimeout(() => store.startSocket(), 5000);
            // store.socket.onopen = () => store.sendRegister();
        },
        readSocket() {
            store.socket.onmessage = evt => {
                const result = JSON.parse(evt.data);
                const newNotification = result.returnObject;

                console.log(`收到消息：${evt.data}`);
                store.push(newNotification);

                console.log(`messages: ${JSON.stringify(store.messages)}`);
            }
        },
        sendRegister() {
            const msg =
                'version=1\n\
action=register\n\
time=1635401835396\n\
\n\
id=@me\n\
Authorization=77017567996651110';
            console.log("发送注册请求");
            store.socket.send(msg.replace("@me", store.me));
        },
        sendMsg(msg) {
            
            fetch('http://localhost:9999/push')
                .then(res => res.json)
                .then(result => console.log(JSON.stringify(result)));

            const p = {
                from: store.me,
                to: store.to,
                content: msg
            };

            console.log(`params is: ${JSON.stringify(p)}`);

            fetch('http://localhost:9999/push/v0/push', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(p)
            })
                .then(
                    res => res.json()
                        .then(
                            result => {
                                console.log(JSON.stringify(result));
                            }
                        )
                )
                .catch(e => console.err(JSON.stringify(e)))

        }
    }));

    return store;
}

export default useNotificationStore;