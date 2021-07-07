import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function Page ({ data }) {
    const router = useRouter()
    const { url } = router.query

    const pageData = data.navigation.find(page => {
      return page.url.slice(0, -1).substring(1) === url
    })

    const pageId = pageData.id
    const pageContent = data.pages.find(page => {
      return page.id === pageId
    })

    return (
      <div className={styles.container}>
      <Head>
        <title>{pageContent.title}</title>
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          {pageContent.title}
        </h2>

        <div>
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

export async function getStaticPaths() {
    const res = await fetch('https://cogworksheadless.azurewebsites.net/Umbraco/Api/ContentApi/GetForWojtek')
    const data = await res.json()
  
    data.navigation = data.navigation.filter(page => {
        return page.url != '/'
    })

    // Get the paths we want to pre-render based on posts
    const paths = data.navigation.map((page) => ({
      params: { url: page.url.slice(0, -1).substring(1) }
    }))
    
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps() {
    const res = await fetch('https://cogworksheadless.azurewebsites.net/Umbraco/Api/ContentApi/GetForWojtek')
    const data = await res.json()

    // console.log(data)
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data
      }
    }
}

export default Page
