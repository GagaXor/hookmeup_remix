import type {LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getEscortsInCountry } from "~/models/escort.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    invariant(params.countryId, "Country not found");
    const countryId = params.countryId;
    const escorts = await getEscortsInCountry(countryId)
    if (!escorts) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(escorts);
};

