"use server";

import { prisma } from "@/lib/db";
import { UserSchema } from "@/schemas/userSchema";
import { z } from "zod";

export const createUser = async (values : z.infer<typeof UserSchema>) => {

    const validatedValuse = UserSchema.safeParse(values);

    if(!validatedValuse.success){
        return{err : "Invalid Values"};
    }

    const user = await prisma.user.create({
        data: {
            name: validatedValuse.data?.name,
            age: validatedValuse.data?.age,
            semester: validatedValuse.data?.semester,
            information: validatedValuse.data?.information,
            liked: false
        }
    })

    console.log(user)

}