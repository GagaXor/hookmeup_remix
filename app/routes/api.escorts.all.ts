import type {LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getProfileWithEscorts } from "~/models/profile.server";

export const loader = async ({  request }: LoaderArgs) => {
    const escorts = await getProfileWithEscorts();
    if (!escorts) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(escorts);
};

