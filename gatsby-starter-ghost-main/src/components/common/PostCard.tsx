import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { Tags } from '@tryghost/helpers-gatsby'

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`
  console.log('PostCard:', post)
  const {
    properties,
    childMarkdownRemark: {
      fields: { readingTime },
      frontmatter: { title, description },
    },
    raw,
  } = post
  const { cover } = raw
  const { tags } = properties

  return (
    <Link to={url} className="post-card">
      <header className="post-card-header">
        {cover?.external?.url && (
          <div
            className="post-card-image"
            style={{
              backgroundImage: `url(${cover?.external?.url})`,
            }}
          ></div>
        )}
        {post.tags && (
          <div className="post-card-tags">
            {' '}
            <Tags post={tags} visibility="public" autolink={false} />
          </div>
        )}
        {post.featured && <span>Featured</span>}
        <h2 className="post-card-title">{post.title}</h2>
      </header>
      <section className="post-card-excerpt">{description}</section>
      <footer className="post-card-footer">
        <div className="post-card-footer-left"></div>
        <div className="post-card-footer-right">
          <FontAwesomeIcon icon={faStopwatch} size="1x" />
          <text>{readingTime.text}</text>
        </div>
      </footer>
    </Link>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default PostCard
