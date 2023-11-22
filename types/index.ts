import { User } from "@prisma/client";

export type SaveUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    creaatedAt: string;
    updatedAt: string;
    emailVerified: string;
}