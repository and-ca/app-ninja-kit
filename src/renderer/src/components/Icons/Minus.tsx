//Types
import { IconsProp } from '@renderer/types';

const Minus = ({ className, onClick }: IconsProp): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className}`}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Minus;
