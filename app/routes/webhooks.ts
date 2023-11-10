
import type {  ActionArgs, LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import {jsonc} from "jsonc"
export const loader = async ({ request }: LoaderArgs) => {
    const token = "Lawson17";
    const url = new URL(request.url)
    const hubMmode = url.searchParams.get('hub.mode')
    const hubVerifyToken = url.searchParams.get("hub.verify_token");
    const hubChallenge = url.searchParams.get("hub.challenge");
    // console.log(hubChallenge)
    //const body = JSON.stringify(hubChallenge)
  
  if (hubMmode === 'subscribe' && hubVerifyToken === token) {
    console.log("matched")
    // return json(hubChallenge);
    return new Response(hubChallenge);
  }

  /* process the webhook (e.g. enqueue a background job) */

  throw new Response("Not Found", { status: 404 });
};


export const action = async({request}: ActionArgs) => {
  console.log('Incoming webhook: ' + jsonc.stringify(request.body));
  return new Response("incoming request", {status: 200});
}