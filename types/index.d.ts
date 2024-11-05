export type UserStatus = 'Working' | 'OnVacation' | 'LunchTime' | 'BusinessTrip';

export interface User {
  id: number;
  name: string;
  status: UserStatus;
  avatar: string;
}

export interface UsersQuerystring {
  search?: string;
  status?: UserStatus;
}

export interface UpdateUserBody {
  status: UserStatus;
}
