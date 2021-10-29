import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from './GlobalStore';
import { useObserver } from 'mobx-react-lite';

const NotificationView = () => {
    const { notificationStore } = useContext(globalContext);
    const { startSocket, readSocket, sendRegister, messages } = notificationStore;

    useEffect(() => {
        startSocket()

        readSocket();
    }, [startSocket, readSocket]);

    return useObserver(() => (
        <div>
            <p>notifications</p>
            <Chat />
            <ol>
                {messages.map(
                    msg => <li>{msg}</li>
                )}
            </ol>
        </div>

    ))
}

const Chat = () => {
    const { notificationStore } = useContext(globalContext);
    const { setMe, setTo, sendMsg, sendRegister} = notificationStore;
    const [msg, setMsg] = useState("");

    return useObserver(() => (
        <div>
            <div>
                <label>你自己id</label>
                <input onChange={e => setMe(e.target.value)} />
                <button onClick={() => sendRegister()}>注册</button>
            </div>

            <div>
                <label>发给谁</label>
                <input onChange={e => setTo(e.target.value)} />
            </div>


            <input onChange={e => setMsg(e.target.value)} />

            <button
                title='发送'
                onClick={() => sendMsg(msg)} >
                发送
            </button>
        </div>
    ))
}

export default NotificationView;