import { updateUserId, USER_ID } from "../../const.js";
import Agent from "../../models/Agent.model.js";
import isUserExist from "../../utils/isUserExists.js";
import uploadMeadia from "../../cloudinary/uploadPhoto.js";

async function UserSingup(req, res) {

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
    let exist = await isUserExist({ phone_number, email });

    if (exist) {
      res.status(300).send({
        messeg: "already exist",
      });
    } else if (!exist) {
      try {
        await Agent.create({
          userid: `KCC${USER_ID}`,
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
          profile_pic_URL: profile_pic_URL ? profile_pic_URL : "defult url",
          rank: 0,
          earning: 0,
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
            );

            if (req.file.filename !== undefined) {
              uploadMeadia(
                `uploads/${req.file.filename}`,
                response.userid
              ).then(async (result) => {
                await Agent.findOneAndUpdate(
                  { userid: response.userid },
                  { $set: { profile_pic_URL: result.secure_url } },
                  { new: true }
                )
                  .then((response) => {
                    res.status(200).send({
                      ...response._doc,
                      token,
                    });
                  })
                  .catch(() => {
                    res.status(400).send({
                      error,
                    });
                  });
              });
            }
            else{
                res.status(200).send({
                    ...response._doc,
                    token,
                  })
            }
          })
          .catch((err) => {
            res.status(300).send({
              messeg: "err",
            });
            console.log(err);
          });
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
    messeg: "some error occuured",
  });
}
}

export default UserSingup;
