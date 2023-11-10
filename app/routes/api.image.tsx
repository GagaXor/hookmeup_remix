import type {LoaderArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import fs from "fs"
import path from "path";

export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    //invariant(params.fileId, "file not found");
    var dir = path.join(__dirname, 'public');
    let file =fs.readFile(dir + "/berry.jpeg", (error, image)=> {
      if (error){
        throw error;
      }
      console.log(image)
    })

    return new Response(file, {status: 200,
      headers: {//HTTP Headers
        'Content-Type': 'image/jpeg'}});
};

