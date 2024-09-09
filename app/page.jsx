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
export default async function Home() {
  // Delay the page rendering to display the loading component
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <main className="h-[100%] flex flex-col items-center justify-center">
      <h1>Welcome to Cinemate!</h1>
      {/* Add your main content here */}
    </main>
  );
}
