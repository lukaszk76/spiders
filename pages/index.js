import Head from "next/head"
import Spiders from "../components/Spiders"

export default function Home() {
    return(
        <div>
            <Head>
                <title>Spiders</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"></link>
            </Head>
    
            <main>
                <Spiders/>
            </main>
        </div>
    )
}