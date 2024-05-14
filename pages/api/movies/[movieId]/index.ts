import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "DELETE":
      await DELETE(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { movieId } = req.query;
  const movie = await prisma.movie.findUnique({
    where: { id: movieId as string },
    include: { frames: true },
  });
  if (!movie) {
    res.status(404).end();
    return;
  }
  const frames = movie.frames;
  if (!frames) {
    res.status(404).end();
    return;
  }

  await prisma.frame.deleteMany({ where: { movieId: movieId as string } });
  await prisma.movie.delete({ where: { id: movieId as string } });
  res.status(200).end();
}
