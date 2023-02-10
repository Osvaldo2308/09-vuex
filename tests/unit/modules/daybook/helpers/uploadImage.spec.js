import cloudinary from 'cloudinary'
import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";

cloudinary.config({
    cloud_name: 'dbpazexms' ,
    api_key: '974154565218691' ,
    api_secret : 'FEmyCxx8Sg3G2MG1Qe8Reylj3Qo'
})



describe('Pruebas en el uploadImage', ()=>{

    test('debe de cargar un archivo y retornar en url', async( done )=>{
        const {data} = await axios.get('https://res.cloudinary.com/dbpazexms/image/upload/v1675721683/rbwt90nshrnqhoym4sa8.jpg',{
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'foto.jpg')

        const url = await uploadImage (file)

        expect (typeof url).toBe('string')


        const segments = url.split('/')
        const imageId = segments [segments.length - 1].replace('.jpg','')
        cloudinary.v2.api.delete_resources(imageId, () => {
            done()
        } )
    })

})