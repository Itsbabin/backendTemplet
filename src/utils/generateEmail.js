import axios from "axios";

export default async function generateEmail(otp,email) {
  let isSend 
  console.log("hi");
  
  const url = new URL(
    'https://control.msg91.com/api/v5/email/send'
  );
  
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "authkey": "443146AZZwJjWmMz667c9ed93P1"
  };
  
  let body = {
  "recipients": [
    {
      "to": [
        {
          "email": `${email}`,
          "name": "Biswajit Mandal"
        },
    ],
    "variables" : {
        "company_name": "kishalaycare",
        "otp" : `${otp}`
      }
    }
  ],
  "from": {
    "email": "no-reply@kishalaycare.in"
  },
  "domain": "kishalaycare.in",
  "template_id": "global_otp"
  }

  
 await fetch(url, {
      method: 'POST',
      headers: headers,
      body:  JSON.stringify(body)
  })
  .then(response => response.json())
  .then(json => isSend = json);
  console.log(isSend);
  
  return isSend
  
}
