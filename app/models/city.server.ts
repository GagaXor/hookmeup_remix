import type { State, City } from "@prisma/client";

import { prisma } from "~/db.server";

export function getCity({
  id,
  stateId,
}: Pick<City, "id"> & {
    stateId: State["id"];
}) {
  return prisma.city.findFirst({
    select: { id: true, name: true,},
    where: { id, stateId },
  });
}

export function getCitiesListItems({ stateId }: { stateId: State["id"] }) {
  return prisma.city.findMany({
    where: { stateId },
    select: { id: true, name: true ,},
  });
}

export function createCity({
  name,
  stateId,
}: Pick<City, "name"> & {
    stateId: State["id"];
}) {
  return prisma.city.create({
    data: {
      name,
      state: {
        connect: {
          id: stateId,
        },
      },
    },
  });
}

export function deleteCity({
  id,
  stateId,
}: Pick<City, "id"> & { stateId: State["id"] }) {
  return prisma.city.deleteMany({
    where: { id, stateId },
  });
}
