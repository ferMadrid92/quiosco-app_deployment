import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    // Obtener ordenes
    if (req.method === 'GET') {
        // Obtener Ordenes
        const ordenesCompletadas  = await prisma.orden.findMany({
          where: {
            estado: true
          }
        })
        res.status(200).json(ordenesCompletadas )
      }
}