import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//store
import { init } from '../store/slices/user';

//Components
import Page from '@renderer/components/Page';

//types
import { Pages } from '@renderer/types';

const Signin = ({ signin }: Pages): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formAction = (data: string | undefined): void => {
    data ? dispatch(init(JSON.parse(data))) : null;
    navigate('/main');
  };
  return (
    <Page
      title={signin?.title}
      subTitle={signin?.subTitle}
      body={signin?.body}
      form={signin?.form}
      formName={signin?.formName}
      formType={signin?.formType}
      message={signin?.message}
      formAction={formAction}
      link={signin?.link}
      linkLabel={signin?.linkLabel}
    />
  );
};

export default Signin;
