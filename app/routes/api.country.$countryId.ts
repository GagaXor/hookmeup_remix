import type {LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getStatesListItems } from "~/models/state.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    invariant(params.countryId, "state not found");
    const countryId = params.countryId;
    const states = await getStatesListItems({countryId})
    if (!states) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(states);
};

