import type { Country } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Country } from "@prisma/client";

export async function getCountryById(id: Country["id"]) {
  return prisma.country.findUnique({ where: { id } });
}

export async function getAllCountries() {
    return prisma.country.findMany(
      {select: { id: true, name: true, states:true}}
      );
}
export async function createCountry(id: Country["id"], name: Country["name"]) {

  return prisma.country.create({
    data: {
      id,
      name,
    },
  });
}

export async function deleteCountryById(id: Country["id"]) {
  return prisma.country.delete({ where: { id } });
}
