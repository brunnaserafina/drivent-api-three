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

async function findManyRoomsByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
    include: {
      Hotel: true
    }
  });
}

const hotelsRepository = {
  findManyHotels,
  findManyRoomsByHotelId,
  findUniqueHotelById,
};

export default hotelsRepository;
