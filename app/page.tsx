// // import Image from "next/image";
// // import React from "react";
// // import { Button } from "@/components/ui/button";
// // import Link from "next/link";
// // import { SignedIn, SignedOut } from "@clerk/nextjs";
// //
// // const Page = () => {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-4">
// //       <h1 className="text-3xl font-bold mb-6">Welcome to SprintHack</h1>
// //
// //       <SignedOut>
// //         <p className="mb-4">Please sign in or sign up to access the dashboard.</p>
// //         <div className="flex gap-4">
// //           <Button asChild>
// //             <Link href="/sign-in">Sign In</Link>
// //           </Button>
// //           <Button asChild variant="outline">
// //             <Link href="/sign-up">Sign Up</Link>
// //           </Button>
// //         </div>
// //       </SignedOut>
// //
// //       <SignedIn>
// //           <div className="flex justify-center mb-8">
// //               <Image
// //                   src="/hackathon_logo.png"
// //                   alt="Hackathon Logo"
// //                   width={150}
// //                   height={150}
// //                   priority
// //               />
// //           </div>
// //         <p className="mb-4">You are signed in!</p>
// //         <Button asChild>
// //           <Link href="/status/today">Tell us what's the plan for today</Link>
// //         </Button>
// //       </SignedIn>
// //     </div>
// //   );
// // };
// //
// // export default Page;
//
//
//
//
//
//
//
// import Image from "next/image";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { SignedIn, SignedOut } from "@clerk/nextjs";
// import {FireworksBackground} from "@/components/animate-ui/components/backgrounds/fireworks";
//
// const Page = () => {
//     return (
//
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
//
//             <div className="flex flex-col items-center text-center animate-fade-in-up">
//
//                 {/* Logo */}
//                 <div className="mb-6 rounded-2xl p-3 bg-white shadow-lg">
//                     <Image
//                         src="/hackathon_logo.png"
//                         alt="SprintHack Logo"
//                         width={220}
//                         height={220}
//                         priority
//                         className="rounded-xl"
//                     />
//                 </div>
//
//                 {/*/!* Title *!/*/}
//                 {/*<h1 className="text-4xl font-bold tracking-tight mb-2">*/}
//                 {/*    SprintHack*/}
//                 {/*</h1>*/}
//
//                 <p className="text-gray-600 mb-8 max-w-md">
//                     Async-first engineering updates with AI-powered context awareness.
//                 </p>
//
//                 {/* Signed Out */}
//                 <SignedOut>
//                     <p className="mb-4 text-sm text-gray-500">
//                         Sign in to share your daily plan and unblock teammates.
//                     </p>
//
//                     <div className="flex gap-4">
//                         <Button asChild>
//                             <Link href="/sign-in">Sign In</Link>
//                         </Button>
//
//                         <Button asChild variant="outline">
//                             <Link href="/sign-up">Sign Up</Link>
//                         </Button>
//                     </div>
//                 </SignedOut>
//
//                 {/* Signed In */}
//                 <SignedIn>
//                     <p className="mb-6 text-sm text-gray-600">
//                         You’re signed in and ready to go!
//                     </p>
//
//                     <Button size="lg" asChild>
//                         <Link href="/status/today">
//                             Plan Today’s Work
//                         </Link>
//                     </Button>
//                 </SignedIn>
//             </div>
//         </div>
//     );
// };
//
// export default Page;
//

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { FireworksBackground } from "@/components/animate-ui/components/backgrounds/fireworks";

const Page = () => {
    return (
        /* 1. Added "relative" and "overflow-hidden" to contain the fireworks */
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 overflow-hidden">

            {/* 2. Background Component: Set to absolute to stay behind content */}
            <SignedIn>
                <FireworksBackground
                    population={3}
                    particleSize={{ min: 1, max: 3 }}
                    className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                />

            </SignedIn>


            {/* 3. Content Layer: Added "relative z-10" to ensure text/buttons are clickable */}
            <div className="relative z-10 flex flex-col items-center text-center animate-fade-in-up">

                {/* Logo */}
                <div className="mb-6 rounded-2xl p-3 bg-white shadow-xl">
                    <Image
                        src="/hackathon_logo.png"
                        alt="SprintHack Logo"
                        width={220}
                        height={220}
                        priority
                        className="rounded-xl"
                    />
                </div>

                <p className="text-gray-600 mb-8 max-w-md font-medium">
                    Async-first engineering updates with AI-powered context awareness.
                </p>

                {/* Signed Out */}
                <SignedOut>
                    <p className="mb-4 text-sm text-gray-500">
                        Sign in to share your daily plan and unblock teammates.
                    </p>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="/sign-in">Sign In</Link>
                        </Button>

                        <Button asChild variant="outline" className="bg-white/50 backdrop-blur-sm">
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    </div>
                </SignedOut>

                {/* Signed In */}
                <SignedIn>
                    <p className="mb-6 text-sm text-gray-600">
                        You’re signed in and ready to go!
                    </p>

                    <Button size="lg" asChild className="shadow-lg">
                        <Link href="/status/today">
                            Plan Today’s Work
                        </Link>
                    </Button>
                </SignedIn>
            </div>
        </div>
    );
};

export default Page;