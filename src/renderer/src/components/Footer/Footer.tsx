//types
import { FooterProps } from '@renderer/types';

const Footer = ({ footer }: FooterProps): JSX.Element => {
  return (
    <footer className="fixed bottom-0 w-full bg-slate-700 bg-opacity-25 grid grid-cols-1 place-content-center">
      <div className="p-2 text-center">
        <p className="text-xs text-white opacity-50">{footer.mainText}</p>
      </div>
    </footer>
  );
};

export default Footer;
