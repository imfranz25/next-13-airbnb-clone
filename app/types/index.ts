import { User, Listing, Reservation } from '@prisma/client';

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'updated_at' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  updated_at: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
