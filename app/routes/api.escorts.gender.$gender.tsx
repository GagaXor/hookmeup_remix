import type {LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/session.server";
import { getEscortsByGender } from "~/models/escort.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    invariant(params.gender, "Gender not found");
    const gender = params.gender;
    const escorts = await getEscortsByGender(gender)
    if (!escorts) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(escorts);
}
