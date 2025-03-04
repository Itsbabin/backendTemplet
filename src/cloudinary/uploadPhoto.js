import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'dxg0zpyu4', 
    api_key: '655687555156368', 
    api_secret: 'Og8WfwgiPkDf8oPqK7fI0K_ab7c',
  });

async function uploadMeadia (localpath, public_id) {
    try {
        const result = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto",
            public_id ,
            transformation: [
                { quality: "auto" }
            ]
        });
       return result;

      } catch (error) {
        console.log(error);
      }
}

export default uploadMeadia;