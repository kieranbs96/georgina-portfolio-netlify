import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import HomeSidebar from '../components/HomeSidebar';

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className="section">
        <div>
          <div className="home">
            <HomeSidebar />
            <div className="home__main-area">
              <h1>About Me</h1>
              <p>
                Hello, my name is Georgina and I am a third year nursing student. This e-Portfolio is designed to keep my
                reflective pieces together, track progress such as Continuing Professional Development (CPD) and to prepare me
                for the daunting NMC revalidation in three years' time.
        </p>
              <p>
                Spending time in hospital as a child myself I can empathize with those in my care with how scary being in
                unwell can be. Aspiring to be a children's nurse I aim to gain the skill set (My Skills can be found in the
                sidebar) to work with family units to get children back home if they can after illness'.
        </p>
              <p>
                I am due to graduate from King's College London in July 2018 and receive my NMC Pin shortly after, I have
                secured a role at Evelina London Children's Hospital and will be allocated my ward soon. My dissertation
                subject is 'Asthma and Obesity Meta-analysis' and once finished and graded I will post snippets on this
                website.
        </p>
              <p>
                Below is a gallery of pictures of me and pictures from my adventures to keep you entertained amongst enormous
                collection of work on this site.
        </p>
              <div>
                <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
              </div>
              {posts
                .filter(post => post.node.frontmatter.templateKey === 'blog-post')
                .map(({ node: post }) => (
                  <div
                    className="blog__content"
                    style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
                    key={post.id}
                  >
                    <p>
                      <Link className="has-text-primary" to={post.fields.slug}>
                        {post.frontmatter.title}
                      </Link>
                      <span> &bull; </span>
                      <small>{post.frontmatter.date}</small>
                    </p>
                    <p>
                      {post.excerpt}
                      <br />
                      <br />
                      <Link className="button is-small" to={post.fields.slug}>
                        Keep Reading →
                  </Link>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
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
