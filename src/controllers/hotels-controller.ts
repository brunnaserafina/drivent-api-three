import { Response } from "express";
import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "ForbiddenError") {
      return res.status(httpStatus.FORBIDDEN).send(error);
    }

    if (error.name === "PaymentRequiredError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }

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
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
