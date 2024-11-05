/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMutation } from '../../hooks/useMutation.tsx';
import { userStatuses } from '../../doman.ts';
import { Select } from '../../components/Select.tsx';
import { Input } from '../../components/Input.tsx';
import { Button } from '../../components/Button.tsx';
import { Dialog } from '../../components/Dialog.tsx';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateEmployeeDialog({ open, onClose }: Props) {
  const { mutate, loading, error } = useMutation('/users', 'POST');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement); // could be type-safe with controlled inputs instead
    const body = Object.fromEntries(formData.entries());
    await mutate(body);
    onClose();
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Dialog isOpen={open} onClose={onClose} title="Create Employee">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input label="Name" name="name" required />
        <Input label="Avatar url" name="avatar" type="url" required />
        <Select label="Status" name="status" required>
          {userStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
        <div className="flex items-center justify-end gap-2 mt-2">
          {error && <span className="text-red-500">{error.message}</span>}
          <Button loading={loading}>Create</Button>
        </div>
      </form>
    </Dialog>
  );
}
