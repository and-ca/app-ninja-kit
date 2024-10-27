//types
import { Language, Content } from './index';

export interface CreateContextProps {
  language: Language | undefined;
  content: Content;
  setContent: (language: Language) => void;
}
