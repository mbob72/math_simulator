import Image from 'next/image'
import { Inter } from 'next/font/google'
import 'tailwindcss/tailwind.css'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
    return (
        <main >
            <div className={`text-red-900`}>Hello word</div>
        </main>
    )
}
