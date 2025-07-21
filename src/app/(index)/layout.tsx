import type {Metadata} from "next";
import "../globals.css";
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
    title: "Alex Luowans Portfolio",
    description: "Welcome to Alex Luowans Portfolio",
};


const twklausanne = localFont({
    src: [
        {
            path: './../fonts/twklausanne/TWKLausanne-400.woff',
            weight: '400',
            style: 'normal'

        },
        {
            path: './../fonts/twklausanne/TWKLausanne-400Italic.woff',
            weight: '400',
            style: 'italic'

        },
    ],
    variable: '--font-twklausanne',
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

        <body
            className={`${twklausanne.variable} ${twklausanne.variable} antialiased flex relative flex-col px-4 w-full`}
        >
        {children}

        </body>
        </html>
    );
}
