import { useRouter } from 'next/router'

function Page ({ data }) {
    const router = useRouter()
    const { url } = router.query

    return (
        <>
            page test 123
            { url }
        </>
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
      },
      revalidate: 30
    }
}

export default Page
