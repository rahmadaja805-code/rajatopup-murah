import axios from "axios";

export async function sendWhatsApp(
  number,
  message
){

  try {

    await axios.post(
      "https://api.fonnte.com/send",
      {
        target: number,
        message: message
      },
      {
        headers:{
          Authorization: process.env.FONNTE_TOKEN
        }
      }
    );


    console.log(
      "✅ WhatsApp terkirim ke",
      number
    );


  } catch(err){

    console.error(
      "❌ WhatsApp gagal:",
      err.response?.data || err.message
    );

  }

}
