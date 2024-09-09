import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
/**
 * The main page component.
 *
 * This component renders the main page of the website. It uses a grid
 * layout with three rows: the first row contains the header, the second
 * row contains the main content, and the third row contains the footer.
 *
 * The main content is a flexbox with three columns: the first column
 * contains the Next.js logo, the second column contains the instructions
 * for getting started, and the third column contains the links to the
 * documentation and examples.
 *
 * The footer contains links to the Next.js documentation, examples, and
 * the website.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
      <Header />
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-blue-800">Hello World</h1>
        <h2 className="text-2xl font-semibold text-blue-600">Hello Reginald</h2>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <Link href="/about">About</Link>
      </div>
    </main>
  );
}
