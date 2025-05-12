// components/CustomCursor.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50"
    style={{
        x: pos.x,
            y: pos.y,
            width: 24,
            height: 24,
            backgroundImage: `url('/cursors/figma-cursor.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            translateX: '-50%',
            translateY: '-50%',
    }}
    animate={{ scale: [1, 1.2, 1], transition: { duration: 0.6, loop: Infinity } }}
    />
);
}
