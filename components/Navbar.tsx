
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from '@clerk/nextjs'

export default function Navbar() {
    const pathname = usePathname()

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(true)
    const [scrolled, setScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

    // Hide/show navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY
            setScrolled(current > 10)

            if (current > lastScrollY && current > 80) {
                setShow(false)
            } else {
                setShow(true)
            }

            setLastScrollY(current)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    // Close mobile menu on route change
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    const linkClass = (path: string) =>
        `relative px-1 transition-colors duration-200 ${
            pathname === path
                ? 'font-semibold text-black'
                : 'text-gray-600 hover:text-black'
        }`

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-transform duration-300 ${
                show ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div
                className={`border-b transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/70 backdrop-blur-md shadow-sm'
                        : 'bg-white'
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        SprintHack
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Authenticated links */}
                        <SignedIn>
                            <Link href="/status/today" className={linkClass('/status/today')}>
                                Today
                            </Link>
                            <Link href="/team" className={linkClass('/team')}>
                                Team
                            </Link>
                            <Link href="/profile" className={linkClass('/profile')}>
                                My History
                            </Link>
                        </SignedIn>

                        {/* Auth buttons */}
                        <SignedOut>
                            <SignInButton />
                            <SignUpButton />
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* Mobile button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden rounded-md border px-3 py-2 text-sm"
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden border-t bg-white/90 backdrop-blur-md px-4 py-4 space-y-4">
                        <SignedIn>
                            <Link href="/status/today" className="block">
                                Today
                            </Link>
                            <Link href="/team" className="block">
                                Team
                            </Link>
                            <Link href="/profile" className="block">
                                My History
                            </Link>
                        </SignedIn>

                        <SignedOut>
                            <SignInButton />
                            <SignUpButton />
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                )}
            </div>
        </nav>
    )
}
