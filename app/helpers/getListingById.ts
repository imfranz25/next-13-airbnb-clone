import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;
    const list = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!list) {
      return null;
    }

    return {
      ...list,
      createdAt: list.createdAt.toISOString(),
      user: {
        ...list.user,
        createdAt: list.user.createdAt.toISOString(),
        updatedAt: list.user.updatedAt.toISOString(),
        emailVerified: list.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}
