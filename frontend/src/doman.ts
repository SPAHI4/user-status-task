import { UserStatus } from 'types';

export const userStatuses: { value: UserStatus; label: string }[] = [
  { value: 'Working', label: 'Working' },
  { value: 'OnVacation', label: 'On Vacation' },
  { value: 'LunchTime', label: 'Lunch Time' },
  { value: 'BusinessTrip', label: 'Business Trip' },
];
