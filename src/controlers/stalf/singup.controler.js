import OfficeStalf from "../../models/Officestalf.js";
import isStalfExist from "../../utils/isStalfExist.js";

async function SingupControler(req, res) {
    let { userid, name, password, phone_number, email, adhaar, pan, pin, address, profile_pic_URL, signature_pic_URL } = req.body

    if (userid && name && password && phone_number && email && adhaar && pan && pin && address && profile_pic_URL && signature_pic_URL) {
        let exist = await isStalfExist({ userid, adhaar, pan, phone_number })
        
        if (exist) {
            res.status(300).send({
                messeg: "already exist"
            })
        }
        if (!exist)  {

            await OfficeStalf.create({
                userid, name, password, phone_number, email, adhaar, pan, pin, address, profile_pic_URL, signature_pic_URL
            })
                .then((response) => {
                    let token = response.genarateToken();
                    res.status(200).send({
                        ...response._doc,
                        token
                    })
                })
                .catch((err) => {
                    res.status(300).send({
                        messeg: "err"
                    })
                    console.log(err);
                })

        }
    }
    else {
        res.status(300).send({
            messeg: "invalid credentials"
        })
    }
}

export default SingupControler;