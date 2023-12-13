
// list all movies (paginated)

import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse, } from "next"



export async function GET(
  req: NextApiRequest, res: NextApiResponse
) {
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const include = req.query.include || null


  const start = (Number(page) - 1) * Number(limit)
  const end = start + Number(limit)

  const movies = await prisma.movie.findMany({
    skip: start,
    take: end,
    include: {
      actors: include?.includes("actors"),
      colors: include?.includes("colors"),
      directors: include?.includes("directors"),
      frames: include?.includes("frames"),
      preferredFrame: include?.includes("preferredFrame"),
    }
  })

  res.status(200).json({ movies })
}

export type CreationActor = {
  firstName: string
  lastName: string
}

export type CreationDirector = {
  firstName: string
  lastName: string
}

export type CreationColor = {
  hex: string
  name: string
}

export type CreationFrame = {
  key: string
  isPreferred: boolean
}

export type CreationMovie = {
  title: string
  year: number
  actors: CreationActor[]
  frames: CreationFrame[]
  colors: CreationColor[]
  directors: CreationDirector[]
}

export async function POST(
  req: NextApiRequest, res: NextApiResponse
) {
  const { title, year, actors, frames, colors, directors } = req.body as CreationMovie

  const movie = await prisma.movie.create({
    data: {
      title,
      year,
      actors: {
        connectOrCreate: actors.map(actor => {
          return {
            where: {
              firstName_lastName: {
                firstName: actor.firstName,
                lastName: actor.lastName
              }
            },
            create: {
              firstName: actor.firstName,
              lastName: actor.lastName
            }
          }
        }),
      },
      directors: {
        connectOrCreate: directors.map(director => {
          return {
            where: {
              firstName_lastName: {
                firstName: director.firstName,
                lastName: director.lastName
              }
            },
            create: {
              firstName: director.firstName,
              lastName: director.lastName
            }
          }
        }),
      },
      colors: {
        connectOrCreate: colors.map(color => {
          return {
            where: {
              name_value: {
                name: color.name,
                value: color.hex
              }
            },
            create: {
              value: color.hex,
              name: color.name
            }
          }
        }),
      },
      frames: {
        create: frames
          .map(frame => {
            return {
              image: frame.key,
            }
          }),
      },
    }
  })

  // set the preferred frame
  const preferredFrame = frames.find(frame => frame.isPreferred)
  if (preferredFrame) {
    await prisma.movie.update({
      where: {
        id: movie.id
      },
      data: {
        preferredFrame: {
          connect: {
            image: preferredFrame.key
          }
        }
      }
    })
  }

  res.status(200).json({ movie })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {
    case "GET":
      await GET(req, res)
      break
    case "POST":
      await POST(req, res)
      break
    default:
      res.status(405).end()
      break
  }
}
