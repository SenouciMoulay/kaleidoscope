import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse, } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {
    case "GET":
      await GET(req, res)
      break
    default:
      res.status(405).end()
      break
  }
}


// get the frame at index [index] for movie with id [movieId] (if index is -1, get the last frame), if index > last frame index, return 404
async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { movieId, index } = req.query
  const movie = await prisma.movie.findUnique({
    where: { id: movieId as string },
    include: { frames: true }
  })
  if (!movie) {
    res.status(404).end()
    return
  }
  const frames = movie.frames
  if (!frames) {
    res.status(404).end()
    return
  }
  const frameIndex = parseInt(index as string)
  if (frameIndex < -1 || frameIndex >= frames.length) {
    res.status(404).end()
    return
  }
  const frame = frameIndex === -1 ? frames[frames.length - 1] : frames[frameIndex]
  res.status(200).json(frame)
}
