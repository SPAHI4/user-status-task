/* eslint-disable @typescript-eslint/no-misused-promises */
import { User } from 'types';
import { useMutation } from '../../hooks/useMutation.tsx';
import { Card } from '../../components/Card.tsx';
import { Avatar } from '../../components/Avatar.tsx';
import { Select } from '../../components/Select.tsx';
import { userStatuses } from '../../doman.ts';

interface EmployeeCardProps {
  user: User;
  onStatusUpdate: () => void;
}

export function EmployeeCard({ user, onStatusUpdate }: EmployeeCardProps) {
  const { mutate, loading, error } = useMutation(`/users/${user.id}`, 'PATCH');

  return (
    <Card className="flex gap-6 p-6 hover:shadow-xl hover:shadow-primary/30">
      <Avatar src={user.avatar} size={128} />
      <div className="flex flex-col justify-end flex-grow">
        <span>{user.name}</span>
        <Select
          defaultValue={user.status}
          onChange={async (e) => {
            await mutate({ status: e.target.value });
            onStatusUpdate();
          }}
          disabled={loading}
          variant="flat"
          size="sm"
        >
          {userStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
        {error && <span className="text-error">{error.message}</span>}
      </div>
    </Card>
  );
}
