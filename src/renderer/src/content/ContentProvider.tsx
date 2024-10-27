import { useState, useEffect } from 'react';

//Context
import ContentContext from '@renderer/context/ContentContext';

//content
import { getContent } from './content';

//types
import { ContentProviderProps, Language, Content } from '@renderer/types';

//Component
import Loader from '../components/Loader';

const ContentProvider = ({ children }: ContentProviderProps): JSX.Element => {
  const [language, setLanguage] = useState<Language | undefined>(undefined);
  const [content, setContent] = useState<Content>();

  const handleContent = async (lang: Language): Promise<void> => {
    setContent(await getContent(lang));
    setLanguage(lang);
  };

  useEffect(() => {
    if (!language) {
      handleContent('en_CA');
    }
  }, []);

  return (
    <>
      {!content && <Loader />}
      {content && (
        <ContentContext.Provider
          value={{
            language,
            setContent: async (lang: Language) => {
              handleContent(lang);
            },
            content
          }}
        >
          {children}
        </ContentContext.Provider>
      )}
    </>
  );
};

export default ContentProvider;
