import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'
import Collapsible from 'react-collapsible';
import rehypeReact from 'rehype-react';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 'react-collapsible': Collapsible, 'react-link': Link },
}).Compiler;

export const ReflectionPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={renderAst(content.htmlAst)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

ReflectionPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ReflectionPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <ReflectionPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  )
}

ReflectionPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ReflectionPage

export const ReflectionPageQuery = graphql`
  query ReflectionPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`
