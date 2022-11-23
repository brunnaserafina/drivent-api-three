import { Request, Response } from "express";
import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function getHotels(_req: Request, res: Response) {
  try {
    const hotels = await hotelsService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function getRoomsAvailableByHotelId(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;

  try {
    const roomsAvailable = await hotelsService.getRoomsByHotelId(Number(hotelId));
    return res.status(httpStatus.OK).send(roomsAvailable);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND).send(error);
    }

    return res.sendStatus(httpStatus.BAD_REQUEST).send(error);
  }
}
