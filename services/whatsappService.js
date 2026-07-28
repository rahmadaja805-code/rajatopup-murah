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

export async function sendImage(target, image, caption){

  try{

    const response = await fetch(
      "https://api.fonnte.com/send",
      {
        method:"POST",
        headers:{
          "Authorization": process.env.FONNTE_TOKEN
        },
        body: new URLSearchParams({
          target,
          file: image,
          message: caption
        })
      }
    );

    const result = await response.json();

    console.log("Fonnte Image:", result);

    return result;

  }catch(err){

    console.error(
      "Image Error:",
      err.message
    );

  }

}
