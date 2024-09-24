//types
import { FooterContent } from './index';
import { TitleBarContent } from './index';
import { FormSchema, FormMessage } from './index';

//enum
import { FormType } from '@renderer/Enum';

export interface Content {
  title: string;
  footer: FooterContent;
  titleBar: TitleBarContent;
  pages: Pages;
}
export interface Pages {
  signin?: PageProps;
  register?: PageProps;
  welcome?: PageProps;
  main?: PageProps;
}
export interface PageProps {
  title?: string;
  subTitle?: string;
  body?: string;
  form?: FormSchema[];
  formAction: (data: string | undefined) => void;
  formName?: string;
  message?: FormMessage;
  formType?: FormType;
  link?: string;
  linkLabel?: string;
}
