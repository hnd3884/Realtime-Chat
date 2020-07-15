import { User } from './Models/User';
//import {ObjectID} from 'mongodb' ;

class UserStore {
    // Check user existing
    async CheckUser(username: String, password: String) {
        try {
            return await User.findOne({username: username, password: password}).exec();
        } catch (error) {
            console.log(error);
        }
    }
}

export const UserStoreInstance =  new UserStore();