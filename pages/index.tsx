import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.sass'
import PostList from '@/components/PostList'

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>foriL.space</title>
                <meta name="description" content="foriL的个人博客" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
              <PostList />
            </main>
        </>
    )
}

export default Home
