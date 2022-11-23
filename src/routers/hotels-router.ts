import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getRoomsAvailableByHotelId } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken).get("/", getHotels).get("/:hotelId", getRoomsAvailableByHotelId);

export { hotelsRouter };
