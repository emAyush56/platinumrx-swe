import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white text-secondary sticky top-0 z-50 flex items-center justify-between h-14 sm:h-18 text-sm border-b border-border-1 sm:border-0 px-4">
      <div className="font-serif uppercase tracking-wider text-xl text-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/">PlatinumRx</Link>
      </div>
    </header>
  );
}
