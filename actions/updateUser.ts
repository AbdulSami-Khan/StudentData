"use server"

import { prisma } from "@/lib/db"

export const updateUser = async (userID: string, state: boolean)=>{
    await prisma.user.update({
        data: {liked: state},
        where: {id: userID}
    })
}