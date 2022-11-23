import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import { Hotel, Room } from "@prisma/client";

async function getHotels(): Promise<Hotel[]> {
  const hotels = await hotelsRepository.findManyHotels();
  if (!hotels) throw notFoundError();

  return hotels;
}

async function getRoomsByHotelId(hotelId: number): Promise<Room[]> {
  const hotel = await hotelsRepository.findUniqueHotelById(hotelId);
  if (!hotel) throw notFoundError();

  const rooms = await hotelsRepository.findManyRoomsByHotelId(hotelId);

  return rooms;
}

const hotelsService = {
  getHotels,
  getRoomsByHotelId,
};

export default hotelsService;
