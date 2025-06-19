import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-primary shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-4xl md:text-5xl --font-pacifico text-tertiary leading-tight">
          Cozy Cakey
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">Home</Link>
          <Link href="/about" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">About Us</Link>
          <Link href="/cakes" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">Our Cakes</Link>
          <Link href="/order" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">Order Online</Link>
          <Link href="/contact" className="text-secondary hover:text-tertiary font-medium py-2 px-3 rounded-md hover:bg-primary/10 transition-colors">Contact</Link>
        </div>
        <button className="md:hidden text-3xl text-secondary hover:text-foreground transition-colors p-2 -mr-2">
          ☰
        </button>
      </nav>
    </header>
  );
}
