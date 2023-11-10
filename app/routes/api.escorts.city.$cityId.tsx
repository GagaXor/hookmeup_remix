import type {LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/session.server";
import { getEscortsInCity } from "~/models/escort.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    invariant(params.cityId, "City not found");
    const cityId = params.cityId;
    const escorts = await getEscortsInCity(cityId)
    if (!escorts) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(escorts);
}
