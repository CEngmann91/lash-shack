import './About.scss';
import React, { useMemo } from 'react';
import { MapView, Page } from '../../components';
import { Landing0, Landing1, photography } from '../../util/images';

enum SectionType {
  Text, Image
}
interface iSection {
  type: SectionType;
  title?: string;
  description?: string;
  typeImgSrc?: string;
}
interface iArticle {
  section1: iSection;
  section2: iSection;
}

const About = () => {
  const articles: iArticle[] = [
    {
      section1: {
        type: SectionType.Text,
        title: "Expert Services",
        description: "Our expert team of technicians in Romford have carefully vetted our services to provide excellent quality that adheres to everyone's unique style. So what are you waiting for? Come and experience it for yourself. Today!"
      },
      section2: {
        type: SectionType.Image,
        typeImgSrc: photography
      }
    },
    {
      section1: {
        type: SectionType.Image,
        typeImgSrc: Landing0
      },
      section2: {
        type: SectionType.Text,
        title: "Test Section 2",
        description: "Test description2"
      }
    },
    {
      section1: {
        type: SectionType.Text,
        title: "Test Section 2",
        description: "Test description3"
      },
      section2: {
        type: SectionType.Image,
        typeImgSrc: Landing1
      }
    }
  ];

  return (
    <Page id='about' className='app__about' headerClassName='app__about-title'>




      <div className="app__about--wrapper">
        {articles.map(({ section1, section2 }) =>
          <div className="card card-shadow">
            {section1.type === SectionType.Text
              ?
              <>
                <div className="left pad-section--left">
                  <header>{section1.title}</header>
                  <p className="description">{section1.description}</p>
                </div>
                <div className="right">
                  <img src={section2.typeImgSrc} alt="" />
                </div>
              </>
              :
              <>
                <div className="left">
                  <img src={section1.typeImgSrc} alt="" />
                </div>
                <div className="right pad-section--right">
                  <header>{section2.title}</header>
                  <p className="description">{section2.description}</p>
                </div>
              </>
            }
          </div>
        )}
      </div>


      {/* 
      <div className="app__about--wrapper">
        <div className="card card-shadow">
          <div className="left pad-section--left">
            <header>Expert Services</header>
            <p className="description">
              Our expert team of technicians in Romford have carefully vetted our services to provide excellent quality that adheres to everyone's unique style.
              So what are you waiting for? Come and experience it for yourself. Today!
            </p>
          </div>
          <div className="right">
            <img src={photography} alt="" />
          </div>
        </div>

        <div className="card card-shadow">
          <div className="left">
            <img src={photography} alt="" />
          </div>
          <div className="right pad-section--right">
            <header>Expert Services</header>
            <p className="description">
              Our expert team of technicians in Romford have carefully vetted our services to provide excellent quality that adheres to everyone's unique style.
              So what are you waiting for? Come and experience it for yourself. Today!
            </p>
          </div>
        </div>
      </div>
       */}
    </Page>

  )
}

export default About