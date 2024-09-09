'use client';

import { useParams } from 'next/navigation';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug;

    return (
        <>
        <div>
            <h1>Blog Post: {slug}</h1>
            <p>This is the content for blog post {slug}</p>
        </div>
        </>
    )
}