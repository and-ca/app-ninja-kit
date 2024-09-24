//types
import { Language, Content } from './index';

export interface CreateContextProps {
  language: Language;
  content: Content;
  setContent: (language: Language) => void;
}
