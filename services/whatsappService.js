import fetch from "node-fetch";

export async function sendWhatsApp(target, message){

  try {

    const response = await fetch(
      "https://api.fonnte.com/send",
      {
        method:"POST",
        headers:{
          "Authorization": process.env.FONNTE_TOKEN
        },
        body: new URLSearchParams({
          target,
          message
        })
      }
    );

    const result = await response.json();

    console.log("Fonnte:", result);

    return result;

  } catch(err){

    console.error(
      "WhatsApp Error:",
      err.message
    );

  }

}

import fetch from "node-fetch";
import FormData from "form-data";

export async function sendImage(target, image, caption){

  try{

    const data = new FormData();

    data.append("target", target);
    data.append("message", caption);
    data.append("url", image);
    data.append("filename", "qris.jpg");

    const response = await fetch(
      "https://api.fonnte.com/send",
      {
        method: "POST",
        headers:{
          Authorization: process.env.FONNTE_TOKEN
        },
        body: data
      }
    );

    const result = await response.json();

    console.log("Fonnte Image:", result);

    return result;

  }catch(err){

    console.error(err);

  }

}
