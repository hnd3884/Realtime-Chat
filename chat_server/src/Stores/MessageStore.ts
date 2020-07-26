import { Message } from './Models/Message';
//import {ObjectID} from 'mongodb' ;

class MessageStore {
    // Check user existing
    async GetAllMessage() {
        try {
            return await Message.find({}).exec().then(items => {return items});
        } catch (error) {
            console.log(error);
        }
    }

    // Add new message
    async AddMessage(messageData){
        try {
            let newMessage = new Message(messageData);
            return await newMessage.save(function (err) {
                if (err) console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const MessageStoreInstance =  new MessageStore();