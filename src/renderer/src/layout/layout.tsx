import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

//Content
import ContentContext from '@renderer/context/ContentContext';

//Components
import TitlteBar from '@renderer/components/TitlteBar';
import Footer from '@renderer/components/Footer';

const Layout = (): JSX.Element => {
  const { content } = useContext(ContentContext);

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
      </Helmet>
      <TitlteBar titleBar={content.titleBar} />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer footer={content.footer} />
    </>
  );
};

export default Layout;
