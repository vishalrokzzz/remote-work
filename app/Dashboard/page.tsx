import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Page = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your dashboard! You are signed in.</p>
        </div>
    );
};

export default Page;
