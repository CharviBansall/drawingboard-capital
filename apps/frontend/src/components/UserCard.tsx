import { DropdownMenu } from 'radix-ui';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { CaretDown, Gear, SignOut } from '@phosphor-icons/react';
import { useProfile } from '@/hooks/useProfile';
import supabase from '@/lib/supabase';
import { useNavigate } from 'react-router';

export default function UserCard() {
  const [open, setOpen] = useState(false);
  const { profile } = useProfile();
  const navigate = useNavigate();
  if (!profile) return null;

  const firstName = profile.first_name ?? '';
  const lastName = profile.last_name ?? '';
  const fullName = `${firstName} ${lastName}`.trim();
  const initials = (firstName[0] ?? '') + (lastName[0] ?? '');
  const companyName = profile.companies?.name;

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      navigate('/signin');
    }
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <div
          className={
            'flex h-fit w-full cursor-default flex-row items-center gap-3 rounded-md p-2 transition-all ' +
            (open
              ? 'bg-slate-200 dark:bg-slate-800'
              : 'hover:bg-slate-200 dark:hover:bg-slate-800')
          }
        >
          <Avatar initials={initials} />
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <span className="text-sm font-medium truncate">{fullName}</span>
            <span className="text-xs font-light text-slate-500 truncate">
              {companyName}
            </span>
          </div>
          <div
            className={
              'flex-shrink-0 transition-transform duration-200 ' + (open ? 'rotate-180' : '')
            }
          >
            <CaretDown />
          </div>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-52 rounded-md border text-xs border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-slate-900">
          <DropdownMenu.Item className="py-1 rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none">
            <Gear />
            Account Settings
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 bg-gray-200 mx-2 h-px" />
          <DropdownMenu.Item
            onClick={handleLogout}
            className="py-1 rounded-sm flex cursor-default flex-row items-center gap-2 px-4 hover:bg-gray-200 focus:outline-none"
          >
            <SignOut />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
