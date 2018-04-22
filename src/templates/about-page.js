import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'

import Collapsible from 'react-collapsible';
import rehypeReact from 'rehype-react';
import Link from 'gatsby-link';

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <h1 className="title is-size-3 has-text-weight-bold is-bold-light">
        {title}
      </h1>
      <PageContent content={content} />
    </section >
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { 'react-collapsible': Collapsible, 'react-link': Link },
  }).Compiler;

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={renderAst(post.htmlAst)}
    />
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`
