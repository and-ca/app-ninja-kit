import { FieldProps } from '@renderer/types';

const Input = ({ schema, errors, register }: FieldProps): JSX.Element => {
  return (
    <div className={`${schema.className?.field ?? ''} `}>
      <label
        className={`block text-sm font-medium leading-6 ${schema.className?.label ?? ''}`}
        htmlFor={schema.name}
      >
        {schema.label}
      </label>
      <input
        type={schema.type}
        className={`block w-full shadow-sm rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6 ${schema.className?.input}  ${errors?.message ? 'ring-rose-700' : ''}`}
        {...register(schema.name, schema.validation)}
        aria-invalid={errors?.message ? 'true' : 'false'}
      />
      <p
        className={`px-2 pt-1 text-xs font-medium text-rose-700 ${schema.className?.message} ${errors?.message ? 'visible' : 'invisible'}`}
      >
        {errors?.message ?? '-'}
      </p>
    </div>
  );
};

export default Input;
