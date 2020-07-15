// MongoDB Connection
import * as mongoose from 'mongoose';
import * as Config from '../Config'

mongoose.connect(Config.CHAT_MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (err) throw err;
        console.log("connect MongoDB success!");
    }
);

export default mongoose;