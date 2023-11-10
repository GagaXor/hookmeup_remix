import type {LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getEscortsInState } from "~/models/escort.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    invariant(params.stateId, "State not found");
    const stateId = params.stateId;
    const escorts = await getEscortsInState(stateId)
    if (!escorts) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(escorts);
}

