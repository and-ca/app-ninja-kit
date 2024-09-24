import { createContext } from 'react';

import { content } from '@renderer/content/languages';

//types
import { CreateContextProps } from '@renderer/types';

const ContentContext = createContext<CreateContextProps>({
  language: 'enca',
  content: content['enca'],
  setContent: () => {}
});

export default ContentContext;
