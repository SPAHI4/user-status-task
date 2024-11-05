import { Card } from '../../components/Card.tsx';
import { EmployeeCard } from './EmployeeCard.tsx';
import { CreateEmployeeDialog } from './CreateEmployeeDialog.tsx';
import { useTransition } from 'react';
import { User, UsersQuerystring, UserStatus } from 'types';
import { useQuery } from '../../hooks/useQuery.tsx';

interface EmployeesListProps {
  search: string;
  status: UserStatus | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function EmployeesList({ search, status, open, setOpen }: EmployeesListProps) {
  const [, startTransition] = useTransition();
  const [users, refetch] = useQuery<User[], UsersQuerystring>('/users', {
    search,
    status,
  });

  return (
    <>
      <CreateEmployeeDialog
        open={open}
        onClose={() => {
          setOpen(false);
          startTransition(() => {
            refetch();
          });
        }}
      />
      {users.length === 0 && (
        <div className="h-[168px] text-gray-500 flex items-center justify-center">No employees found</div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 mt-12">
        {users.map((user) => (
          <EmployeeCard
            key={user.id}
            user={user}
            onStatusUpdate={() => {
              startTransition(() => {
                refetch(); // refetch in case we filter by status
              });
            }}
          />
        ))}
      </div>
    </>
  );
}

EmployeesList.Skeleton = function EmployeesListSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 mt-12">
      {Array.from({ length: 5 }, (_, key) => (
        <Card key={key} className="h-[168px]" />
      ))}
    </div>
  );
};
