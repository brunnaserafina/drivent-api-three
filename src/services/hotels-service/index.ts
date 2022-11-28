import { notFoundError, paymentRequiredError, forbiddenError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel, Room } from "@prisma/client";
import { TicketStatus } from "@prisma/client";

async function verifyPermissionUser(userId: number): Promise<void> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw forbiddenError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw forbiddenError();

  if (!ticket.TicketType.includesHotel) throw forbiddenError();

  if (ticket.status !== TicketStatus.PAID) throw paymentRequiredError();
}

async function getHotels(userId: number): Promise<Hotel[]> {
  await verifyPermissionUser(userId);

  const hotels = await hotelsRepository.findManyHotels();

  return hotels;
}

async function getRoomsByHotelId(userId: number, hotelId: number): Promise<Hotel & { Rooms: Room[] }> {
  await verifyPermissionUser(userId);

  const hotel = await hotelsRepository.findUniqueHotelById(hotelId);
  if (!hotel) throw notFoundError();

  const rooms = await hotelsRepository.findUniqueRoomsByHotelId(hotelId);

  return rooms;
}

const hotelsService = {
  getHotels,
  getRoomsByHotelId,
};

export default hotelsService;
