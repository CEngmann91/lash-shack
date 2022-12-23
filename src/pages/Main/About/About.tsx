import './About.scss';
import React, { useEffect, useState } from 'react';
import { Page } from '../../../components';
import { Shop, Training } from '../../../util/images';
import { SectionedCard } from '../../../components/Cards';
import { RootIFrame, VideoFrame } from '../../../components/Frames';
import { getDownloadURLRef } from '../../../networking/firebase/firebase';

type HeaderSection = {
  id: string;
  index: number;
  leftNode: React.ReactNode;
  rightNode: React.ReactNode;
  reversed?: boolean;
}

/*enum SectionType {
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
}*/

const About = () => {
  const [videoPath, setVideoPath] = useState<string>('');


  const sections: HeaderSection[] = [
    {
      id: 'Expert Services',
      index: 0,
      leftNode: (
        <div className='app__flex pad--left txt-cntr'>
          <label className='section-title'>Expert Services</label>
          <p className="description new-line">Our expert team of technicians in Romford have carefully vetted our services to provide excellent quality that adheres to everyone's unique style.</p>
        </div>
      ),
      rightNode: (
        <img src={Shop} />
      )
    },
    {
      id: 'Become An Expert',
      index: 1,
      leftNode: (
        <div className='app__flex pad--right txt-cntr'>
          <label className='section-title'>Become An Expert</label>
          <p className="description new-line">Eyelash Extension Course's designed meticulously with you in mind to make you an expert. Discover new and exciting ways that you can become a fully qualified Lash Technician or refresh your memory with our Refresher Course at Lash Shack.</p>
          <a href="/courses" className='border-button section-button'>Find Out More</a>
        </div>
      ),
      rightNode: (
        <img src={Training} />
      ),
      reversed: true,
    },
    {
      id: 'What To Expect',
      index: 2,
      leftNode: (
        <div className='app__flex pad--left txt-cntr'>
          <label className='section-title'>What To Expect</label>
          <p className="description new-line">Text</p>
        </div>
      ),
      rightNode: (
        <VideoFrame source={videoPath} />
        // <RootIFrame source='https://www.instagram.com/reel/CktbR0_A70Z/?utm_source=ig_embed&amp;utm_campaign=loading' />
      )
    }
  ]



  useEffect(() => {
    getClientVideoForHeader();

    // const cleanup = getClientVideoForHeader();
    // return cleanup;
  }, [])



  const getClientVideoForHeader = async () => {
    try {
      await getDownloadURLRef("gs://lash-shack-uk.appspot.com/clientVideos/20221124_155643.mp4")
        .then(res => {
          setVideoPath(res);
          // console.log("getVideo - ", res);
        })
        .catch(error => console.log(error));
    }
    catch (error) { };
  }




  /*const articles: iArticle[] = [
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
        title: "What To Expect",
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
    }
  ];*/

  /*const renderArticle = (section1: iSection, section2: iSection) => {
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
              <div className="pad--left">
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
            <div className="">
              <img src={section1.typeImgSrc} alt="" />
            </div>
            <div className="pad--right app__flex">
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
  }*/

  return (
    <Page id='about' className='app__about'>
      <div className="app__about--wrapper">
        {sections.map(({ index, leftNode, rightNode, reversed }) =>
          <div key={index}>
            <SectionedCard className='card' leftChildren={leftNode} rightChildren={rightNode} reversed={reversed} />
          </div>
        )}
      </div>
    </Page>
  )
}

export default About