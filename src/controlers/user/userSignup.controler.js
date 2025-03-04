import { updateUserId, USER_ID } from "../../const.js";
import Agent from "../../models/Agent.model.js";
import isUserExist from "../../utils/isUserExists.js";

async function UserSingupControler(req, res) {
  let {
    name,
    password,
    phone_number,
    email,
    adhaar,
    pan,
    pin,
    address,
    introducer,
    profile_pic_URL,
    adhaar_pic_URL,
    pan_pic_URL,
    signature_pic_URL,
    kyc_profile_pic_URL
  } = req.body;

  if (
    name &&
    password &&
    phone_number &&
    email &&
    adhaar &&
    pan &&
    pin &&
    address &&
    introducer &&
    signature_pic_URL
  ) {
    let exist = await isUserExist({ adhaar, pan, phone_number });

    if (exist) {
      res.status(300).send({
        messeg: "already exist",
      });
    }
    else if (!exist) {
      console.log(USER_ID);
      
      await Agent.create({
        userid : `${USER_ID}`,
        name,
        password,
        phone_number,
        email,
        adhaar,
        pan,
        pin,
        address,
        introducer,
        profile_pic_URL : profile_pic_URL || 'defult url' ,
        kyc_profile_pic_URL,
        adhaar_pic_URL,
        signature_pic_URL,
        pan_pic_URL,
        kyc : 0,
        bv: 0,
        net_bv: 0,
      })
        .then((response) => {
          let token = response.genarateToken();
          updateUserId();
          console.log(USER_ID);
          res.status(200).send({
            ...response._doc,
            token,
          });
        })
        .catch((err) => {
          res.status(300).send({
            messeg: "err",
          });
          console.log(err);
        });
    }
  } else {
    res.status(300).send({
      messeg: "invalid credentials",
    });
  }
}

export default UserSingupControler;
