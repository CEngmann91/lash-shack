import './About.scss';
import React, { useMemo } from 'react';
import { MapView, MyIFrame, Page } from '../../components';
import { Landing0, Landing1, Shop, Training } from '../../util/images';
import { CONTACT } from '../../constants/constants';

enum SectionType {
  Text,
  ReactNode,
  TextAndButton,
  Image,
}
interface iSection {
  type: SectionType;
  title?: string;
  description?: string;
  typeImgSrc?: string;
  component?: React.ReactNode;
  TBText?: string;
  TBClassName?: string;
  TBLink?: string;
}
interface iArticle {
  section1: iSection;
  section2: iSection;
}

const About = () => {

  const renderContactArticle = () => (
    <div className='app__about--mapview-article'>
      <div className="pad--left app__flex">
        <h1>Get In Touch</h1>
        <section style={{ alignItems: 'center', textAlign: 'center' }}>
          <hr />
          <p className='new-line address'>{CONTACT.ADDRESS}</p>
          <a href={CONTACT.EMAIL} className='border-button send-email-button'>Send Us An Email</a>
        </section>

      </div>
      <div className="pad--right app__flex">
        <h1>Hours</h1>
        <section style={{ alignItems: 'center', textAlign: 'center' }}>
          <hr />
          <p>Mon to Thu:</p>
          <p>9:30am - 5.30pm</p>
          <p>Fri:</p>
          <p>9:30am - 6.30pm</p>
          <p>Sat:</p>
          <p>10am - 3.30pm</p>
        </section>
      </div>
    </div>
  );

  const articles: iArticle[] = [
    {
      section1: {
        type: SectionType.Text,
        title: "Expert Services",
        description: "Our expert team of technicians in Romford have carefully vetted our services to provide excellent quality that adheres to everyone's unique style."
      },
      section2: {
        type: SectionType.Image,
        typeImgSrc: Shop
      }
    },
    {
      section1: {
        type: SectionType.Image,
        typeImgSrc: Training
      },
      section2: {
        type: SectionType.TextAndButton,
        title: "Become An Expert",
        description: "Eyelash Extension Course's designed specifically with you in mind to make you an expert. Discover new and exciting ways that you can become a fully qualified Lash Technician or refresh your memory with our Refresher Course at Lash Shack.",
        TBText: "Find Out More",
        TBLink: "/courses",
        TBClassName: "section-button"
      }
    },
    {
      section1: {
        type: SectionType.Text,
        title: "Test Section 2",
        description: "Test description3"
      },
      section2: {
        // type: SectionType.Image,
        // typeImgSrc: Landing1

        type: SectionType.ReactNode,
        component: (
          <MyIFrame source='https://www.youtube.com/embed/Rhpubx3o420' />
          // <MyIFrame source="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.2194368048818!2d0.1739251796953675!3d51.57855856568328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a4b87d9ae185%3A0x86c325f6401e3d5b!2sSun%20Chasers!5e1!3m2!1sen!2suk!4v1668589047803!5m2!1sen!2suk" />
          // <MapView source="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.2194368048818!2d0.1739251796953675!3d51.57855856568328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a4b87d9ae185%3A0x86c325f6401e3d5b!2sSun%20Chasers!5e1!3m2!1sen!2suk!4v1668589047803!5m2!1sen!2suk" />
        )
      }
    },
    {
      section1: {
        type: SectionType.ReactNode,
        component: (
          <MapView source="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.2194368048818!2d0.1739251796953675!3d51.57855856568328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a4b87d9ae185%3A0x86c325f6401e3d5b!2sSun%20Chasers!5e1!3m2!1sen!2suk!4v1668589047803!5m2!1sen!2suk" />
        )
      },
      section2: {
        type: SectionType.ReactNode,
        component: ( renderContactArticle() )
      }
    }
  ];

  const renderArticle = (section1: iSection, section2: iSection) => {
    switch (section1.type) {
      case SectionType.ReactNode:
        return (
          <>
            {section1.component}
            {section2.type === ((SectionType.Text) as SectionType) ?
              <div className="pad--right app__flex">
                <h1>{section2.title}</h1>
                <p className="description new-line">{section2.description}</p>
                {section2.type === SectionType.TextAndButton ?
                  <a href={section2.TBLink} className={`border-button ${section2.TBClassName}`}>{section2.TBText}</a>
                  :
                  null
                }
              </div>
              :
              null
            }
            {section2.type === SectionType.ReactNode ?
              section2.component
              :
              null
            }
          </>
        )
      case SectionType.Text:
      case SectionType.TextAndButton:
        return (
          <>
            <div className="pad--left">
              <h1>{section1.title}</h1>
              <p className="description new-line">{section1.description}</p>
              {section1.type === SectionType.TextAndButton ?
                <a href={section1.TBLink} className={`border-button ${section1.TBClassName}`}>{section1.TBText}</a>
                :
                null
              }
            </div>
            <div className="right">
              {section2.type === SectionType.ReactNode && section2.component}
              {section2.type === SectionType.Image && <img src={section2.typeImgSrc} alt="" />}
            </div>
          </>
        )
    }


    switch (section2.type) {
      case SectionType.ReactNode:
        return (
          <>
            {section1.type === ((SectionType.Text || SectionType.TextAndButton) as SectionType) ?
              <div className="right pad--right">
                <h1>{section1.title}</h1>
                <p className="description new-line">{section1.description}</p>
                {section1.type === SectionType.TextAndButton as SectionType ?
                  <a href={section1.TBLink} className={`border-button ${section1.TBClassName}`}>{section1.TBText}</a>
                  :
                  null
                }
              </div>
              :
              null
            }
            {section1.type === SectionType.ReactNode as SectionType ?
              section2.component
              :
              null
            }
            {section2.component}
          </>
        )
      case SectionType.Text:
      case SectionType.TextAndButton:
        return (
          <>
            <div className="left">
              <img src={section1.typeImgSrc} alt="" />
            </div>
            <div className="right pad--right">
              <h1>{section2.title}</h1>
              <p className="description new-line">{section2.description}</p>
              {section2.type === SectionType.TextAndButton ?
                <a href={section2.TBLink} className={`border-button ${section2.TBClassName}`}>{section2.TBText}</a>
                :
                null
              }
            </div>
          </>
        )
    }
  }

  return (
    <Page id='about' className='app__about' headerClassName='app__about-title'>
      <div className="app__about--wrapper">
        {articles.map(({ section1, section2 }) =>
          <div className="card card-shadow">
            {renderArticle(section1, section2)}
          </div>
        )}
      </div>
    </Page>
  )
}

export default About