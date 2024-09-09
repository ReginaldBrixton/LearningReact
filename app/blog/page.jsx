import Link from "next/link";
import { LinkProps } from "next/link";
export default function BlogPage() {

    return (
        <>
        <div>
            <h1>The Blog</h1>
            <p>Welcome to the blog page</p>
            <Link href="/blog/post-1">Blog 1</Link>
            <Link href="/blog/post-2">Blog 2</Link>
            <Link href="/blog/post-3">Blog 3</Link>
        </div>
        </>
    )
}