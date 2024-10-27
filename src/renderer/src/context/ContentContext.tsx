import { createContext } from 'react';

//types
import { CreateContextProps } from '@renderer/types';

//content
import { getDefaultContent } from '../content/content';

const ContentContext = createContext<CreateContextProps>({ 
  language: undefined,
  content: getDefaultContent(),
  setContent: () => {}
});

export default ContentContext;
