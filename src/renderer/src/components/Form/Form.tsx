import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

//types
import { FormProps, Payload } from '@renderer/types';

//enum
import { FormMessageType, ChannelInvoke, FormType } from '@renderer/Enum';

//intern Components
import Input from './components/Input';
import Radio from './components/Radio';
import TextArea from './components/TextArea';
import Button from './components/Button';
import Checkbox from './components/Checkbox';

//extern Components
import Alert from '@renderer/components/Alert';

const Form = ({
  schema,
  className = '',
  formName,
  message,
  formType,
  formAction,
  formPrepare = ( payload: Payload) :Payload=> payload,
  formEndpoint
}: FormProps): JSX.Element => {
  const [messageType, setMessageType] = useState(FormMessageType.Default);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  });
  const onSubmit = async (formState): Promise<void> => {
    try {
      if (!Object.values(FormType).includes(formType)) {
        throw new Error('Invalid Form Type');
      }

      setIsLoading(true);
      const db: Payload = formPrepare({
        formType,
        formName,
        formState
      });

      if (db.formError) {
        db.formError.forEach((el) => {
          setError(el.field, el.error);
        })
        setIsLoading(false);
      }

      const result = await window.api.invoke(formEndpoint, JSON.stringify(db));
      if (result.code === 200 && result.success) {
        setMessageType(FormMessageType.Success);
        formAction(result?.data);
      } else {
        console.log(result.message);
        setMessageType(FormMessageType.Error);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setMessageType(FormMessageType.Error);
      setIsLoading(false);
    }
  };

  const fetchData = async (): Promise<void> => {
    if (formType === FormType.update) {
      const data = await window.api.invoke(ChannelInvoke.Get, formName);
      if (data.data) reset(JSON.parse(data.data));
    }
  };

  useEffect(() => {
    fetchData();
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`grid grid-cols-4 gap-x-4 ${className}`}>
      {schema.map((element, index): JSX.Element | undefined => {
        switch (element.field) {
          case 'input':
            return (
              <Input
                schema={element}
                errors={errors[element.name]}
                key={index}
                register={register}
              />
            );
          case 'textArea':
            return (
              <TextArea
                schema={element}
                errors={errors[element.name]}
                key={index}
                register={register}
              />
            );
          case 'radio':
            return (
              <Radio
                schema={element}
                errors={errors[element.name]}
                key={index}
                register={register}
              />
            );
          case 'checkbox':
            return <Checkbox schema={element} key={index} register={register} />;
          case 'button':
            return (
              <Button
                schema={element}
                isDisabled={Object.keys(errors).length > 0}
                key={index}
                isLoading={isLoading}
              />
            );
          default:
            return;
        }
      })}
      {(message?.[messageType]?.title ?? '') && (
        <div className="col-span-4 mt-4 mb-10">
          <Alert
            title={message?.[messageType]?.title}
            content={message?.[messageType]?.content}
            className={message?.[messageType]?.className}
          />
        </div>
      )}
    </form>
  );
};

export default Form;
