import { computed, makeAutoObservable } from "mobx";

class ChatStore {
    constructor(){
        makeAutoObservable(this);
    }

    id = -1;    
    to = -1;    
    message  = '';

    setId(id){
        this.id = id;
    }

    setTo(to){
        this.to = to;
    }

    setMessage(message){
        this.message = message;
    }



}

const chatStore = new ChatStore();
export default chatStore;