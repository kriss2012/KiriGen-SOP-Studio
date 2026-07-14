import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';

const LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/sops', label: 'SOPs' },
  { href: '/sops/new', label: 'Generate new' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <nav className="w-56 shrink-0 border-r bg-white p-4 flex flex-col justify-between">
      <div>
        <div className="font-bold text-brand-600 mb-6 px-2">KiriGen</div>
        <ul className="space-y-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  'block px-2 py-1.5 rounded text-sm',
                  router.pathname === link.href ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => signOut()} className="text-sm text-gray-400 hover:text-gray-700 px-2 text-left">
        Sign out
      </button>
    </nav>
  );
}
