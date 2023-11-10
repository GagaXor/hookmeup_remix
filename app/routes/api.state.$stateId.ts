import type {LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getCitiesListItems } from "~/models/city.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    invariant(params.stateId, "city not found");
    const stateId = params.stateId;
    const cities = await getCitiesListItems({stateId})
    if (!cities) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(cities);
};

