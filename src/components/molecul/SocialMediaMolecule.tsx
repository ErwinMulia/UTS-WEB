import { IconAtom } from '@/components/atom/IconAtom';

export function SocialMediaMolecule() {
  return (
    <div className="flex space-x-4">
      <IconAtom type="instagram" />
      <IconAtom type="facebook" />
      <IconAtom type="youtube" />
      <IconAtom type="tiktok" />
    </div>
  );
}