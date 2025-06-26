import Link from 'next/link';

interface FooterProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function Footer({
  title = "Don't see what you're looking for?",
  description = "We can create custom cakes based on your ideas. Contact us to discuss your vision.",
  buttonText = "Request a Custom Cake",
  buttonHref = "/contact",
}: FooterProps) {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold text-amber-900 mb-4">
        {title}
      </h2>
      <p className="text-amber-800 mb-6 max-w-2xl mx-auto">
        {description}
      </p>
      <Link
        href={buttonHref}
        className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}
