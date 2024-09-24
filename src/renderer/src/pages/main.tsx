import { useSelector } from 'react-redux';
import { RootState } from '@renderer/store';

//Components
import Page from '@renderer/components/Page';

//types
import { Pages } from '@renderer/types';

const Main = ({ main }: Pages): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Page
      title={main?.title?.replace('{firstName}', user.firstName)}
      subTitle={main?.subTitle}
      body={main?.body}
      form={main?.form}
      formName={main?.formName}
      formType={main?.formType}
      formAction={() => {}}
      link={main?.link}
      linkLabel={main?.linkLabel}
    />
  );
};

export default Main;
