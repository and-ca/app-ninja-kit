import { FieldProps } from '@renderer/types';

const Radio = ({ schema, errors, register }: FieldProps): JSX.Element => {
  return (
    <div className={`${schema.className?.field} `}>
      <label
        className={`block text-sm font-medium leading-6 text-gray-900 ${schema.className?.label}`}
        htmlFor={schema.name}
      >
        {schema.label}
      </label>
      {schema.options?.map((el, index) => {
        return (
          <div className="flex items-center my-2 ml-2" key={index}>
            <input
              type="radio"
              {...register(schema.name)}
              value={el.value}
              name={schema.name}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {el.label}
            </label>
          </div>
        );
      })}

      <p
        className={`px-2 pt-1 text-xs font-medium text-rose-700 ${schema.className?.message} ${errors?.message ? 'visible' : 'invisible'}`}
      >
        {errors?.message ?? '-'}
      </p>
    </div>
  );
};

export default Radio;
