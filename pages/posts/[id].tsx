import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

export default function Post({ postData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
    <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    {postData.title}
    <br />
    {postData.id}
    <br />
    <Date dateString={postData.date} />
    <br />
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
</Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }