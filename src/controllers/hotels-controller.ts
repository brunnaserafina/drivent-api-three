import { Request, Response } from "express";
import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";

export async function getHotels(_req: Request, res: Response) {
  try {
    const hotels = await hotelsService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
