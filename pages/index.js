import Head from "next/head"
import Spiders from "../components/Spiders"

export default function Home() {
    return(
        <div>
            <Head>
                <title>Spiders</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main>
                <Spiders/>
            </main>
        </div>
    )
}