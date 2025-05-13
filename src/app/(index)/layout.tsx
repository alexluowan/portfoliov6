import type {Metadata} from "next";
import "../globals.css";
import localFont from 'next/font/local'


export const metadata: Metadata = {
    title: "Alex Luowans Portfolio",
    description: "Welcome to Alex Luowans Portfolio",
};

// const neuehaasunica = localFont({
//     src: [
//         {
//             path: './../fonts/neuehaasunica/Neue-Haas-Unica-W1G-Regular.woff',
//             weight: '400',
//             style: 'normal'
//
//         },
//         {
//             path: './../fonts/neuehaasunica/Neue-Haas-Unica-W1G-Medium.woff',
//             weight: '500',
//             style: 'normal'
//
//         },
//         {
//             path: './../fonts/neuehaasunica/Neue-Haas-Unica-W1G-Italic.woff',
//             weight: '400',
//             style: 'italic'
//
//         },
//     ],
//     variable: '--font-neuehaasunica',
// })

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
