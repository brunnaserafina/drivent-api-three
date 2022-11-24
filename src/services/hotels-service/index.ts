import { notFoundError, paymentRequiredError, forbiddenError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel, Room } from "@prisma/client";
import { TicketStatus } from "@prisma/client";

async function getHotels(userId: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (!ticket.TicketType.includesHotel) throw forbiddenError();

  if (ticket.status !== TicketStatus.PAID) throw paymentRequiredError();

  const hotels = await hotelsRepository.findManyHotels();

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
