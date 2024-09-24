import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//store
import { init } from '../store/slices/user';

//Components
import Page from '@renderer/components/Page';

//types
import { Pages } from '@renderer/types';

const Register = ({ register }: Pages): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formAction = (data: string | undefined): void => {
    data ? dispatch(init(JSON.parse(data))) : null;
    navigate('/main');
  };

  return (
    <Page
      title={register?.title}
      subTitle={register?.subTitle}
      body={register?.body}
      form={register?.form}
      formName={register?.formName}
      formType={register?.formType}
      message={register?.message}
      formAction={formAction}
      link={register?.link}
      linkLabel={register?.linkLabel}
    />
  );
};

export default Register;
