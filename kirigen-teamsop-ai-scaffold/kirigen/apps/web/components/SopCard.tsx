import Link from 'next/link';
import clsx from 'clsx';

const STATUS_STYLES: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  IN_REVIEW: 'bg-amber-100 text-amber-700',
  APPROVED: 'bg-emerald-100 text-emerald-700',
  PUBLISHED: 'bg-brand-50 text-brand-600',
  ARCHIVED: 'bg-gray-100 text-gray-400',
};

export default function SopCard({ sop }: { sop: { id: string; title: string; status: string; updatedAt: string } }) {
  return (
    <Link
      href={`/sops/${sop.id}`}
      className="block bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium">{sop.title}</h3>
        <span className={clsx('text-xs px-2 py-0.5 rounded-full whitespace-nowrap', STATUS_STYLES[sop.status])}>
          {sop.status}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Updated {new Date(sop.updatedAt).toLocaleDateString()}
      </p>
    </Link>
  );
}
