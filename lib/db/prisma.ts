import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";


const connectionString = process.env.DATABASE_URL!;

function createPrismaClient() {
    const adapter = new PrismaPg({
        connectionString
    });

    return new PrismaClient({
        adapter
    });
}

// Singleton pattern — prevents hot-reload from spawning multiple clients
declare global {
    var prismaGlobal : ReturnType<typeof createPrismaClient> | undefined
}

const prisma = global.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prisma;
}

export default prisma;