import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TimeFormat from 'base/time-format';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <TimeFormat time={1626355200}  fromNow/>
    </>
  )
}
