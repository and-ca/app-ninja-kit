//Components
import Page from '@renderer/components/Page';

//types
import { Pages } from '@renderer/types';

const Welcome = ({ welcome }: Pages): JSX.Element => {
  return (
    <Page
      title={welcome?.title}
      subTitle={welcome?.subTitle}
      body={welcome?.body}
      form={welcome?.form}
      formName={welcome?.formName}
      formType={welcome?.formType}
      formAction={() => {}}
      link={welcome?.link}
      linkLabel={welcome?.linkLabel}
    />
  );
};

export default Welcome;
