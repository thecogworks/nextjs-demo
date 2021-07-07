import Head from 'next/head'
import styles from '../styles/Home.module.css'

function Home ({data}) {

  const pageData = data.navigation.find(page => {
    return page.url == '/'
  })

  const pageContent = data.pages.find(page => {
    return page.id == pageData.id
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>{pageContent.title}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {pageContent.title}
        </h1>

        <div className={styles.description}>
          {pageContent.teaser}
        </div>

        <div
        dangerouslySetInnerHTML={{
        __html: pageContent.body
        }}></div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://cogworksheadless.azurewebsites.net/Umbraco/Api/ContentApi/GetForWojtek')
  const data = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data
    }
  }
}

export default Home
