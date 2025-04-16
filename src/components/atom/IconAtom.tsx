import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

export function IconAtom({ type }: { type: 'instagram' | 'facebook' | 'youtube' | 'tiktok' }) {
  switch (type) {
    case 'instagram':
      return <FaInstagram size={24} />;
    case 'facebook':
      return <FaFacebook size={24} />;
    case 'youtube':
      return <FaYoutube size={24} />;
    case 'tiktok':
      return <FaTiktok size={24} />;
    default:
      return null;
  }
}