//components
import Form from '@renderer/components/Form';
import { Link } from 'react-router-dom';

//types
import { PageProps } from '@renderer/types';

const Page = ({
  title,
  subTitle,
  body,
  form,
  message,
  formName,
  formType,
  formAction,
  formEndpoint,
  link,
  linkLabel
}: PageProps): JSX.Element => {
  return (
    <div className="w-full max-h-70vh ">
      <h1 className={`text-lg font-medium pb-4`}>{title}</h1>
      <h3 className={`text-base pb-2`}>{subTitle}</h3>
      <p className={`text-sm pb-2`}>{body}</p>
      {form && formName && (
        <Form
          schema={form}
          formName={formName}
          message={message}
          formType={formType}
          formAction={formAction}
          formEndpoint={formEndpoint}
        />
      )}
      {link && linkLabel && (
        <Link
          to={link ?? '/'}
          className={`mt-10 text-white text-sm focus:outline-none hover:text-blue-100`}
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
};

export default Page;
