import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-gradient-to-r from-amber-700 to-amber-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-3xl md:text-4xl font-bold tracking-tight font-dancing-script">
          Cozy Cakey
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-amber-200 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-amber-200 transition-colors">About Us</Link>
          <Link href="/cakes" className="hover:text-amber-200 transition-colors">Our Cakes</Link>
          <Link href="/order" className="hover:text-amber-200 transition-colors">Order Online</Link>
          <Link href="/contact" className="hover:text-amber-200 transition-colors">Contact</Link>
        </div>
        <button className="md:hidden text-2xl">
          ☰
        </button>
      </nav>
    </header>
  );
}
