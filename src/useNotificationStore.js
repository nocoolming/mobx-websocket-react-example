import { useLocalStore, userLocalStore } from 'mobx-react-lite';
// import fetch

const useNotificationStore = () => {
    const apiServer = "http://localhost:9999";
    const pushServer = "ws://localhost:10000/push"

    // const apiServer = "http://10.0.2.50:9999";
    // const pushServer = "ws://10.0.2.50:10000/push"

    // const apiServer = "https://api.store.sunmoon.zone";
    // const pushServer = "wss://push.sunmoon.zone/push"

    const store = useLocalStore(() => ({
        messages: {},
        ids: [],
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
            store.messages[msg.id] = msg;
            if (store.ids.indexOf(msg.id) === -1) {
                store.ids.push(msg.id);
            }
        },
        startSocket() {
            if (!window.WebSocket) {
                window.WebSocket = window.MozWebSocket;
            }

            // store.socket = new WebSocket(`wss://push.sunmoon.zone/push`);
            store.socket = new WebSocket(pushServer);
            store.socket.onclose = () => setTimeout(() => store.startSocket(), 5000);
            // store.socket.onopen = () => store.sendRegister();
        },
        readSocket() {
            store.socket.onmessage = evt => {
                const result = JSON.parse(evt.data);
                const newNotification = result.returnObject;
                console.log(`收到消息：${evt.data}`);


                if("Chat" === newNotification.category){
                    store.push(newNotification);
                }

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
accountId=@accountId\n\
Authorization=77017567996651110'
            .replace("@me", store.me)
            .replace("@accountId", store.me);

            console.log("发送注册请求" + msg);
            store.socket.send(
                msg
                    
            );
        },
        sendMsg(msg) {
            const p = {
                from: store.me,
                to: store.to,
                content: msg,
                time: new Date()
            };

            console.log(`params is: ${JSON.stringify(p)}`);

            fetch(`${apiServer}/notification/v0/push/chat`, {
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
                .catch(e => console.error(JSON.stringify(e)))

        }
    }));

    return store;
}

export default useNotificationStore;