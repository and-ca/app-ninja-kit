import { useState } from 'react';

//Context
import ContentContext from '@renderer/context/ContentContext';

//content
import { content } from './languages';

//types
import { ContentProviderProps, Language } from '@renderer/types';

const ContentProvider = ({ children }: ContentProviderProps): JSX.Element => {
  const [language, setLanguage] = useState<Language>('enca');

  return (
    <ContentContext.Provider
      value={{
        language,
        setContent: (lang: Language) => setLanguage(lang),
        content: content[language]
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
