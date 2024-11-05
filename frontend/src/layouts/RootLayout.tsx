import { useQuery } from '../hooks/useQuery.tsx';
import { User } from 'types';
import { Button } from '../components/Button.tsx';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export function RootLayout({ children }: Props) {
  const [user] = useQuery<User>('/users/1'); // mocked user

  return (
    <>
      <nav className="bg-white">
        <div className="grid grid-cols-[1fr_auto] gap-3 px-6 py-3 items-center">
          <header>
            <h3 className="text-primary text-2xl font-bold">Employees</h3>
          </header>
          <Button variant="outlined" size="sm">
            Log Out ({user.name})
          </Button>
        </div>
      </nav>
      <main className="max-w-[1080px] mx-auto px-6 py-8">{children}</main>
    </>
  );
}
