import axios from "axios";

const sendOTP = async (req, res) => {
    const { phone_number , name , otp } = req.body;

    if (!phone_number) {
        return res.status(400).json({ message: 'Phone number is required' , status : false});
    }
    if (!otp) {
        return res.status(400).json({ message: 'OTP is required' , status : false});
    }
    if (!name) {
        return res.status(400).json({ message: 'Name is required' , status : false});
    }

    if (phone_number.length != 10) {
        return res.status(400).json({ message: 'Phone number must be 10 numbers', status : false });
    }
  

    const options = {
        method: 'POST',
        url: 'https://control.msg91.com/api/v5/flow',
        headers: {
            authkey: '443146AZZwJjWmMz667c9ed93P1',
            accept: 'application/json',
            'content-type': 'application/json'
        },
        data: `{\n  "template_id": "67e536cfd6fc056cf7081472",\n  "short_url": "1", \n  "recipients": [\n    {\n      "mobiles": "91${phone_number}",\n      "otp": "${otp}", "name": "${name}" }\n  ]\n}`
    };

    try {
        const { data } = await axios.request(options);
        res.status(200).json({ ...data , status : true});
    } catch (error) {
        res.status(400).json({ ...error , status : false });
    }


};



export default sendOTP;