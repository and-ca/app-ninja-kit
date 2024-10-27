import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

//Content
import ContentContext from '@renderer/context/ContentContext';

//Pages
import Welcome from '../pages/welcome';
import Sigin from '../pages/signin';
import Register from '../pages/register';
import Main from '../pages/main';
import Loader from '../components/Loader';

//Layout
import Layout from '../layout/layout';

const renderRoutes = (): JSX.Element => {
  const { content, language } = useContext(ContentContext);
  
  return (
    <Routes>
      {!language && <Route path="/" element={<Loader />} />}
      {language && (
        <Route element={<Layout />}>
          <Route path="/" element={<Welcome welcome={content?.pages.welcome} />} />
          <Route path="/register" element={<Register register={content.pages.register} />} />
          <Route path="/sigin" element={<Sigin signin={content.pages.signin} />} />
          <Route path="/main" element={<Main main={content.pages.main} />} />
        </Route>
      )}
    </Routes>
  );
};

export default renderRoutes;
