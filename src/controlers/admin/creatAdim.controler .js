import Admin from "../../models/Admin.js";


export default async function (req, res) {
    let { password , userid } = req.body;
    try {
        
    
    await Admin.create({
        userid : `admin@${userid}`,
        password,
    })
    .then((response) => {
        res.status(200).send({
            messeg : "Admin Created"
        });
    }
    )
    .catch((error) => { 
        res.status(400).send({
            error
        });
    }
    )
} catch (error) {
    res.status(400).send({
        error : "some error occured"
    });
}
   
}