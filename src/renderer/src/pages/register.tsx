import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//store
import { init } from '../store/slices/user';

//Components
import Page from '@renderer/components/Page';

//types
import { Pages, Payload } from '@renderer/types';

//enum
import { ChannelInvoke } from '@renderer/Enum';

const Register = ({ register }: Pages): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formAction = (data: string | undefined): void => {
    data ? dispatch(init(JSON.parse(data))) : null;
    navigate('/main');
  };

  const formPrepare = (data: Payload): Payload => {
    if (data.formState.password !== data.formState.confirmPassword) {
      data.formError = [
        { field: 'confirmPassword', error: { type: 'manual', message: 'Password does not match!' } }
      ];
      return data;
    }
    delete data.formState.confirmPassword;

    return data;
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
      formPrepare={formPrepare}
      formEndpoint={ChannelInvoke.Save}
      link={register?.link}
      linkLabel={register?.linkLabel}
    />
  );
};

export default Register;
