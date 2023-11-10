import type { Country, State } from "@prisma/client";

import { prisma } from "~/db.server";

export function getState({
  id,
  countryId,
}: Pick<State, "id"> & {
    countryId: Country["id"];
}) {
  return prisma.state.findFirst({
    select: { id: true, name: true, cities: true},
    where: { id, countryId },
  });
}

export function getStateById(id : State["id"]){
  return prisma.state.findUnique({ where: { id } })
}

export function getStatesListItems({ countryId }: { countryId: Country["id"] }) {
  return prisma.state.findMany({
    where: { countryId },
    select: { id: true, name: true , countryId: true},
  });
}

export function createSate({
  name,
  countryId,
}: Pick<State, "name"> & {
  countryId: Country["id"];
}) {
  return prisma.state.create({
    data: {
      name,
      country: {
        connect: {
          id: countryId,
        },
      },
    },
  });
}

export function deleteState({
  id,
  countryId,
}: Pick<State, "id"> & { countryId: Country["id"] }) {
  return prisma.state.deleteMany({
    where: { id, countryId },
  });
}
