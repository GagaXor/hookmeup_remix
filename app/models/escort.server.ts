import type { Country, State, City, Profile, Escort } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Escort } from "@prisma/client";

export async function getEscortByProfile(profileId: Profile["id"]) {
    return prisma.escort.findUnique({
        where : {
            profileId: profileId
        },
        select: {id: true, 
            build: true, 
            bustSize: true, 
            sexualOrientation: true, 
            occupation: true, 
            education: true, 
            smoker: true
        }

    })
}

export async function getAllEscorts() {
    return prisma.profile.findMany({
        where: { 
            escort: {isNot: null}
           },
        select : {id: true, fullName: true, city: true, profilePictureUrl: true}
    })
}

export async function getEscortsInCountry(countryId :Country["id"]) {
  return prisma.profile.findMany({
    select: {
        id: true,
        fullName: true,
        dob: true,
        city: true,
        gender: true,
        phone: true,
        userType: true,
        bio: true,
        escort: true,
        user: true,
        media: true,
        profilePictureUrl: true,
        verification : true,

       },
    where: {
        city: {
            state: {
                country: {
                    id: countryId
                }
            }
        }
    }})

}

export async function getEscortsInState(StateId :State["id"]) {
  return prisma.profile.findMany({
    select: {
        id: true,
        profilePictureUrl: true,
        fullName: true,

       },
    where: {
        city: {
            state: {
                id: StateId
            }
        }
    }})
  
}

export async function getEscortsInCity(cityId :City["id"]) {
  return prisma.profile.findMany({
    select: {
        id: true,
        profilePictureUrl: true,
        fullName: true,

       },
    where: {
        city: {
              id: cityId
            }
        }
    })
}

export async function getEscortsByGender(gender:Profile["gender"]) {
    
}



export async function createEscort(sexualOrientation: Escort["sexualOrientation"], 
    build: Escort["build"], 
    bustSize: Escort["bustSize"], 
    occupation: Escort["occupation"], 
    education: Escort["education"], 
    smoker: Escort["smoker"],
    profileId: Profile["id"]) {
  
    return prisma.escort.create({
        data: {
            sexualOrientation,
            build,
            bustSize,
            occupation,
            education,
            smoker,
            profile : {
                connect: {
                    id: profileId
                }
            },
        },
    });
  }
  

