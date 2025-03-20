import uploadMeadia from "../../cloudinary/uploadPhoto.js";
import { STALF_ID, updateStalfId} from "../../const.js";
import OfficeStalf from "../../models/Officestalf.js";
import isStalfExist from "../../utils/isStalfExist.js";
import fs from "fs"

async function SingupControler(req, res) {
  let {
    name,
    password,
    phone_number,
    email,
    profile_pic_URL,
  } = JSON.parse(req.body.json);
try {
   
  if (
    name &&
    password &&
    phone_number &&
    email 
  ) {
    let exist = await isStalfExist({ phone_number ,email});

    if (exist) {
      res.status(300).send({
        messeg: "already exist",
      });
    }
    if (!exist) {
      let id = `${STALF_ID}`.slice(1)
      await OfficeStalf.create({
        userid :  `KCPL${id}`,
        name,
        password,
        phone_number,
        email,
        profile_pic_URL : profile_pic_URL || "",
      })
      .then(async (response) => {
        console.log(response);
        
        await uploadMeadia(`uploads/${req.file.filename}`, response.userid)
        .then(async (result) => {
          updateStalfId();
          await fs.unlink(`uploads/${req.file.filename}`,() => {
                            console.log("file deleted");
                        })
          await OfficeStalf.findOneAndUpdate(
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
                res.status(400).send({
                  error,
                });
              });
            
          })
          .catch((err) => {
            console.log(err);
            
            res.status(300).send({
              messeg: "give a valid user id",
            });
          })
        


        })
        .catch(async (err) => {
          await fs.unlink(`uploads/${req.file.filename}`,() => {
                            console.log("file deleted");
                        })
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
} catch (error) {
  console.log(err);
  
  res.status(300).send({
    messeg: "some error occured",
  });
}
}

export default SingupControler;
