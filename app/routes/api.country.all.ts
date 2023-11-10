import { json } from "@remix-run/node";
import { getAllCountries } from "~/models/country.server";

export const loader = async () => {
    const countries = await getAllCountries();
    if (!countries) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(countries);
};

