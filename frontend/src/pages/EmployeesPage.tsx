import { UserStatus } from 'types';
import { Button } from '../components/Button.tsx';
import { Input } from '../components/Input.tsx';
import { Select } from '../components/Select.tsx';
import { Plus, Search } from 'lucide-react';
import { VerticalDivider } from '../components/Divider.tsx';
import { userStatuses } from '../doman.ts';
import { Suspense, useDeferredValue, useState } from 'react';
import { EmployeesList } from './employees/EmployeesList.tsx';
import { useDebouncedValue } from '../hooks/useDebouncedValue.tsx';

export function EmployeesPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<UserStatus | null>(null);

  const deferredStatus = useDeferredValue(status); // do not trigger Suspense on new api request
  const debouncedSearch = useDebouncedValue(search, 500); // debounce search input
  const deferredSearch = useDeferredValue(debouncedSearch); // do not trigger Suspense on new api request
  const pending = search !== deferredSearch || status !== deferredStatus;

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)} size="lg" icon={<Plus size={30} />}>
          Create
        </Button>
        <div className="flex flex-grow items-center gap-4 rounded bg-white">
          <Input
            placeholder="Type to search"
            icon={<Search size={16} />}
            size="md"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="flex-grow"
            variant="flat"
          />
          {pending && <span className="text-text-secondary">Loading...</span>}
          <VerticalDivider />
          <Select
            size="lg"
            onChange={(e) => {
              setStatus(e.target.value as UserStatus);
            }}
            variant="flat"
          >
            <option value="">Filter by status</option>
            {userStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Suspense fallback={<EmployeesList.Skeleton />}>
        <EmployeesList search={deferredSearch} status={deferredStatus ?? undefined} open={open} setOpen={setOpen} />
      </Suspense>
    </div>
  );
}
