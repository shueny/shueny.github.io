import * as React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

export const pageQuery = graphql`
  query {
    allNotionPost(sort: { fields: publish_date, order: DESC }) {
      totalCount
      edges {
        node {
          id
          tags
          title
          slug
          publish_date {
            startDate(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`

const Index = ({ data, location, pageContext }) => {
  console.log(data)
  const posts = data.allNotion.edges
  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="container">
          <section className="post-feed">
            {posts.map(({ node }) => (
              // The tag below includes the markup for each post - components/common/PostCard.js
              <PostCard key={node.id} post={node} />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  )
}

Index.propTypes = {
  data: PropTypes.shape({
    allNotion: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export default Index
