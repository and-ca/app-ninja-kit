import { FieldProps } from '@renderer/types';

const Checkbox = ({ schema, register }: FieldProps): JSX.Element => {
  return (
    <div className={` ${schema.className?.field ?? ''} `}>
      <div className="flex items-center my-2 ml-2">
        <input
          type="checkbox"
          {...register(schema.name)}
          name={schema.name}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300${schema.className?.field ?? ''} `}
        >
          {schema.label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
