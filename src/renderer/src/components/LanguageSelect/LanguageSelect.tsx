import { useState, useContext } from 'react';

//Content
import ContentContext from '@renderer/context/ContentContext'; //types

import { Language } from '@renderer/types';

//flags
import {
  FlagBrazil,
  FlagCanadaEN,
  FlagCanadaFR,
  FlagFrance,
  FlagGerman,
  FlagItaly,
  FlagMexico,
  FlagPortugal,
  FlagSpain,
  FlagUS
} from '@renderer/components/Icons';

interface LanguageOption {
  code: Language;
  icon: JSX.Element;
}

const languages: LanguageOption[] = [
  { code: 'en_CA', icon: <FlagCanadaEN /> },
  { code: 'fr_CA', icon: <FlagCanadaFR /> },
  { code: 'en_US', icon: <FlagUS /> },
  { code: 'fr_FR', icon: <FlagFrance /> },
  { code: 'es_ES', icon: <FlagSpain /> },
  { code: 'es_MX', icon: <FlagMexico /> },
  { code: 'pt_PT', icon: <FlagPortugal /> },
  { code: 'pt_BR', icon: <FlagBrazil /> },
  { code: 'it_IT', icon: <FlagItaly /> },
  { code: 'de_DE', icon: <FlagGerman /> }
];

const LanguageSelect = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { language, setContent } = useContext(ContentContext);

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  const getFlag = (lang: string): JSX.Element | undefined => {
    const language = languages.find((el) => el.code === lang);
    return language?.icon;
  };

  return (
    <div className="fixed top-10 right-3 inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-zinc-700"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          {language && getFlag(language)}
          {!language && 'Select a Language'}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 max-h-40 overflow-y-auto origin-top-right bg-zinc-700 rounded-md shadow-lg border-zinc-600 border-2 focus:outline-none [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <a
                key={lang.code}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-zinc-800"
                role="menuitem"
                id="menu-item-0"
                onClick={() => {
                  setContent(lang.code);
                  toggleMenu();
                }}
              >
                {lang.icon}
              </a>
            ))}
          </div>{' '}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
