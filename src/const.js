const DB_URL = "mongodb+srv://mernarindam:mernarindam123@cluster0.sqvwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let USER_ID = 1

let updateUserId = () => {
    USER_ID = USER_ID+1
}

export {DB_URL , USER_ID ,updateUserId} ;