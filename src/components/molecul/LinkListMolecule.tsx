import { LinkAtom } from '@/components/atom/LinkAtom';

export function LinkListMolecule({ links }: { links: { href: string, text: string }[] }) {
  return (
    <ul className="space-y-2 text-gray-400">
      {links.map((link, index) => (
        <li key={index}>
          <LinkAtom href={link.href} text={link.text} />
        </li>
      ))}
    </ul>
  );
}