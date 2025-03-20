import Agent from "../models/Agent.model.js";

export default async function isUserExist(credentials) {
    let a = await Agent.find(credentials);
    console.log(a);
    
    if (a.length == 0){ return false }
    else { return true };
}
