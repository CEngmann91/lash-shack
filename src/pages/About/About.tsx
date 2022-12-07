import './About.scss';
import React, { useMemo } from 'react';
import { MapView, MyIFrame, Page } from '../../components';
import { Landing0, Landing1, Shop, Training } from '../../util/images';
import { CONTACT } from '../../constants/constants';
import { Email, Phone } from '../../util/icons';
import { Card } from '../../components/Cards';

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

          <div className='get-in-contact app__flex'>
            <a href={""} className='border-button get-in-contact-button'><Phone /></a>
            <a href={
              // CONTACT.EMAIL
              ""
              } className='border-button get-in-contact-button'><Email /></a>
          </div>
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

      {/* <div className='get-in-contact app__flex'>
        <h1>Get In Contact</h1>
        <a href={""} className='border-button get-in-contact-button'><Phone /></a>
        <a href={CONTACT.EMAIL} className='border-button get-in-contact-button'><Email /></a>
      </div> */}
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

        // type: SectionType.ReactNode,
        // component: (
        //   <MyIFrame source='https://www.instagram.com/reel/CktbR0_A70Z/?utm_source=ig_embed&amp;utm_campaign=loading' />
        // )
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
        title: "What To Expect From Us",
        description: "Test description3"
      },
      section2: {
        // type: SectionType.Image,
        // typeImgSrc: Landing1

        type: SectionType.ReactNode,
        component: (
          <MyIFrame source='https://www.instagram.com/reel/CktbR0_A70Z/?utm_source=ig_embed&amp;utm_campaign=loading' />
        )
      }
    },
    /*{
      section1: {
        type: SectionType.ReactNode,
        component: (
          <></>
        )
      },
      section2: {
        type: SectionType.ReactNode,
        component: ( <></> )
      }
    }*/
  ];

  const renderArticle = (section1: iSection, section2: iSection) => {
    switch (section1.type) {
      case SectionType.ReactNode:
        return (
          <>
            {section1.component}
            {section2.type === ((SectionType.Text) as SectionType) ?
              <div className="pad--left app__flex">
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
            <div className="pad--left app__flex">
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
              <div className="right pad--left">
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
            <div className="right pad--right app__flex">
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
    <Page id='about' className='app__about'>
      <div className="app__about--wrapper">
        {articles.map(({ section1, section2 }, index) =>
          <Card className="card border-white border-white-shadow">
            { renderArticle(section1, section2) }
          </Card>

          // <div className="card border-white border-white-shadow" key={index}>
          //   { renderArticle(section1, section2) }
          // </div>
        )}
      </div>
    </Page>
  )
}

export default About