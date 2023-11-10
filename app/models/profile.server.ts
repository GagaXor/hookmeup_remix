import type { City, Profile, User } from "@prisma/client";
import { prisma } from "~/db.server";
export type {Profile} from "@prisma/client"

export async function getAllProfiles() {
    return prisma.profile.findMany({
        select : {id: true, fullName: true, escort: true, profilePictureUrl: true, city: true}
    })
}

export async function getProfileWithEscorts() {
    return prisma.profile.findMany({
        where: { 
            escort: {isNot: null}
           },
        select : {id: true, fullName: true, city: true, profilePictureUrl: true}
    })
}


export async function getProfileById(id: Profile["id"]) {
  return prisma.profile.findUnique({ where: { id }, select: {
    id: true,
    fullName: true,
    dob: true,
    city: true,
    gender: true,
    phone: true,
    userType: true,
    bio: true,
    profilePictureUrl: true,
  } });
}

export async function getProfileByUserId(userId: User["id"]) {
  return prisma.profile.findUnique({ where: { userId } });
}

export async function createProfile(id: Profile["id"], 
    fullName: Profile["fullName"], 
    dob: Profile["dob"], 
    cityId : City["id"], 
    gender: Profile["gender"], 
    phone: Profile["phone"],
    userType: Profile["userType"],
    bio: Profile["bio"],
    userId : User["id"],
    profilePictureUrl: Profile["profilePictureUrl"]
 ) {

    return prisma.profile.create({
        data: {
            id,
            fullName,
            dob,
            gender,
            phone,
            userType,
            bio,
            profilePictureUrl,
            city : {
                connect : {
                    id: cityId
                }
            },
            user : {
                connect: {
                    id: userId
                }
            },
        },
    });
}

export async function deleteProfileById(id: Profile["id"]) {
  return prisma.profile.delete({ where: { id } });
}
