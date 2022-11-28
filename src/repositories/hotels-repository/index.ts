import { prisma } from "@/config";

async function findManyHotels() {
  return prisma.hotel.findMany();
}

async function findUniqueHotelById(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
  });
}

async function findUniqueRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  findManyHotels,
  findUniqueRoomsByHotelId,
  findUniqueHotelById,
};

export default hotelsRepository;
