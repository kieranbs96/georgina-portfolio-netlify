import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header';
import Footer from '../components/Footer';
import Subfooter from '../components/Subfooter';

import './scss/main.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Georgina Cross - Registered Nurse - UK"
      meta={[
        {
          name: 'description',
          content:
            'Georgina Cross is a Nurse registered with the Royal College of Nursing and graduated from Kings College London',
        },
        {
          name: 'keywords',
          content:
            'Georgina Cross, Registered Nurse, UK, London, Royal College of Nursing, RCN, Nurse, Nursing, KCL, Kings College London',
        },
      ]}
    >
    </Helmet>
    <Header />
    <hr className="decoration" />
    <section className="content h-padding h-center">{children()}</section>
    <hr className="decoration bottom" />
    <Footer />
    <Subfooter />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
