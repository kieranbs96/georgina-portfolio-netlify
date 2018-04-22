import React from 'react';
import PropTypes from 'prop-types'
import Link from 'gatsby-link';

export default class Blog extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="blog">
        <h1>Blog</h1>
        {posts
          .filter(post => post.node.frontmatter.templateKey === 'blog-post')
          .map(({ node: post }) => (
            <div
              className="blog__article-preview blog__normal"
              key={post.id}
            >
              <div className="blog__preview-content">
                <div className="blog__preview-left">
                  <h2 className="blog__article-title"><Link className="has-text-primary" to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link></h2>
                  <h3 className="blog__article-date tertiary">{post.frontmatter.date}</h3>
                  <p>
                    {post.excerpt}
                  </p>
                  <Link className="button secondary" to={post.fields.slug}>
                    See the full article →
                    </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query blogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`


