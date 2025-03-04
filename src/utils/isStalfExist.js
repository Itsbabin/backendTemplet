import OfficeStalf from "../models/Officestalf.js";

export default async function isStalfExist(credentials) {
    let a = await OfficeStalf.find(credentials);
    if (a.length == 0){ return false }
    else { return true };
}
