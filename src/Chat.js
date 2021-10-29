import React from 'react';
import { observer } from "mobx-react-lite"


const ChatHeader = () => {
    return (
        <div>
            <input />
            <button>发送</button>
        </div>
    )
}

const ChatView = ({store}) => {
    console.info('store is: ' +JSON.stringify(store));
// debugger
    const messages = store.messages;

    if(messages && messages.map){
        return (
            <div>
                <p>view</p>
    
                {
                    messages.map(
                        m => <p key={m}>{m}</p>
                    )
                }
            </div>
        )
    }else{
        return (
            <div></div>
        )
    }
    
}

const Chat = observer(({store}) => {
    return (
        <div>
                <ChatHeader />

<p style={{display: 'none'}}>{store.index}</p>
                <ChatView store={store} />
            </div>
    )
})

export default Chat;