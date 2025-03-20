import { updateUserId, USER_ID } from "../../const.js";
import Agent from "../../models/Agent.model.js";
import isUserExist from "../../utils/isUserExists.js";
import uploadMeadia from "../../cloudinary/uploadPhoto.js";
import fs from "fs"

async function UserSingupControler(req, res) {
  
  try {
    
  let {
    name,
    password,
    phone_number,
    email,
    date_of_birth,
    pin,
    address,
    introducer,
    profile_pic_URL,
  } = JSON.parse(req.body.json);

  

  if (
    name &&
    password &&
    phone_number &&
    email &&
    pin &&
    address &&
    introducer
  ) {
    let exist = await isUserExist({ phone_number ,email});

    if (exist) {
      res.status(300).send({
        messeg: "already exist",
      });
    } else if (!exist) {
      try {
        let id = `${USER_ID}`.slice(1)
      await Agent.create({
        userid: `KCC${id}`,
        name,
        password,
        phone_number,
        email,
        date_of_birth,
        pin,
        address,
        introducer: {
          id: introducer.id,
          name: introducer.name,
        },
        profile_pic_URL: profile_pic_URL ? profile_pic_URL : "https://res.cloudinary.com/dxg0zpyu4/image/upload/f_auto,q_auto/xzjbpzsgoddt54v00hxs",
        rank : 0,
        earning : 0,
        kyc: 0,
        bv: 0,
      })
        .then(async (response) => {
          updateUserId();
          let token = response.genarateToken(); 
      
          await Agent.findOneAndUpdate(
            { userid: introducer.id },
            {
              $push: {
                juniors: { id: response.userid, name: response.name },
              },
            },
            { new: true }
          ).then(() => {
            console.log(req.file);
        
            req.file.filename ?  uploadMeadia(`uploads/${req.file.filename}`, response.userid)
              .then(async (result) => {
                await fs.unlink(`uploads/${req.file.filename}`,() => {
                  console.log("file deleted");
              })
                await Agent.findOneAndUpdate(
                  { userid: response.userid },
                  { $set: { profile_pic_URL: result.secure_url } },
                  { new: true }
                )
                  .then((response) => {
                    res.status(200).send({
                      ...response._doc
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    
                    res.status(400).send({
                      error,
                    });
                  });
                
              })
              .catch(async(error) => {
                
                await fs.unlink(`uploads/${req.file.filename}`,() => {
                  console.log("file deleted");
                })
                console.log(error);
                res.status(300).send({
                  messeg: "give a valid user id",
                });
              })
            :  res.status(200).send({
              ...response._doc,
              token,
            });
            
          });
        })
        .catch((err) => {
          res.status(300).send({
            messeg: "err",
          });
          console.log(err);
        })
      
       
        } catch (error) {
          res.status(300).send({
            messeg: "err",
          });
        }
      }
    
  } else {
    console.log(name, password, phone_number, email, pin, address, introducer);
    
    res.status(300).send({
      messeg: "invalid credentials",
    });
  }
} catch (error) {
  res.status(300).send({
    messeg: "some error occured",
  });
}
}

export default UserSingupControler;
