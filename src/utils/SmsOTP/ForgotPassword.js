import axios from "axios";
import Agent from "../../models/Agent.model.js";

export default async function ForgotPassword(req , res) {
   let { phone_number , otp } = req.body
    
   if (!phone_number) {
     return res.status(400).json({ message: 'Phone number is required' , status : false});
   }
   if (!otp) {
    return res.status(400).json({ message: 'OTP is required' , status : false});
   }

    try {
       let result = await Agent.findOne({phone_number})
       if (!result) {
        return res.status(200).json({ message: 'User Not exist' , status : false})
       }

       const options = {
        method: 'POST',
        url: 'https://control.msg91.com/api/v5/flow',
        headers: {
            authkey: '443146AZZwJjWmMz667c9ed93P1',
            accept: 'application/json',
            'content-type': 'application/json'
        },
        data: `{\n  "template_id": "67e53b84d6fc0509454e0a23",\n  "short_url": "1", \n  "recipients": [\n    {\n      "mobiles": "91${phone_number}",\n      "otp": "${otp}", "name": "${"result?.name"}" }\n  ]\n}`
    };

    let token = result.genarateToken()
        const { data } = await axios.request(options);
        res.status(200).json({ token , status : true});
        
    } catch (error) {

        res.status(400).json({ ...error , status : false });
    }
}
