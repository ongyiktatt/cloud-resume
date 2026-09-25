import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page from '../components/Layout/Page';
import About from '../components/Sections/About';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Sections/Footer';
import Hero from '../components/Sections/Hero';
import Portfolio from '../components/Sections/Portfolio';
import Resume from '../components/Sections/Resume';
import {homePageMeta} from '../data/data';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

const Home: FC = memo(() => {
  const {title, description} = homePageMeta;
  return (
    <Page description={description} title={title}>
      <Header />
      <Hero />
      <About />
      {/*
        Resume sits ABOVE Portfolio deliberately.
        A hiring manager should reach 12 years of employment history before personal
        AWS projects. Reversed, the first substantial block a reader hits is a
        homelab — which reads as an individual contributor, not a manager.
        Do not swap these back without a reason.
      */}
      <Resume />
      {/*
        Skills is NOT rendered here yet — see note below. If your Skills component
        exists and is not already inside Resume.tsx, uncomment these two lines.
      */}
      {/* <Skills /> */}
      <Portfolio />
      <Contact />
      <Footer />
    </Page>
  );
});

export default Home;