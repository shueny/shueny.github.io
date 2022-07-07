import * as React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard } from '../components/common'
// import { MetaData } from '../components/common/meta'

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
  console.log(data)
  const posts = data.allNotion.edges

  console.log(posts)
  return (
    <>
      {/* <MetaData location={location} /> */}
      <Layout isHome={true}>
        <div className="container">
          <section className="post-feed">
            {posts.map(({ node }) => {
              return (
                // The tag below includes the markup for each post - components/common/PostCard.js
                <PostCard key={node.id} post={node} />
              )
            })}
          </section>
          {/* <Pagination pageContext={pageContext} /> */}
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

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query {
    allNotion(
      filter: { properties: { status: { value: { name: { eq: "publish" } } } } }
    ) {
      edges {
        node {
          id
          title
          childMarkdownRemark {
            fields {
              readingTime {
                text
                minutes
              }
            }
            frontmatter {
              description
              status {
                name
                id
              }
              tags {
                name
                id
              }
              title
            }
          }
          properties {
            tags {
              value {
                name
                id
              }
            }
            status {
              id
              value {
                name
              }
            }
          }
          raw {
            cover {
              external {
                url
              }
            }
          }
        }
      }
    }
  }
`
