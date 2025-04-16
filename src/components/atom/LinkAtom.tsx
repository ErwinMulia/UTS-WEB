export function LinkAtom({ href, text }: { href: string, text: string }) {
    return (
      <a href={href} className="hover:text-white">
        {text}
      </a>
    );
  }  