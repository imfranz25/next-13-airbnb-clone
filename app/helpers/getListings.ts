import prisma from '@/app/libs/prismadb';

export async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}
