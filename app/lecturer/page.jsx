"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const LecturerPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return; // Wait for the session to load
        if (!session || session.user.role !== 'lecturer') {
            router.push('/'); // Redirect to home if not a lecturer
        } else {
            setLoading(false);
        }
    }, [session, status, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, Lecturer {session.user.name}</h1>
            {/* Add lecturer-specific content here */}
        </div>
    );
};

export default LecturerPage;