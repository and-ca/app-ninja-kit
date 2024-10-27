//types
import { TitleBarContent, FooterContent, FormSchema, FormMessage, Payload } from './index';

//enum
import { FormType, ChannelInvoke } from '@renderer/Enum';

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
  formAction?: (data: string | undefined) => void;
  formPrepare?: (data: Payload) => Payload;
  formEndpoint?: ChannelInvoke;
  formName?: string;
  message?: FormMessage;
  formType?: FormType;
  link?: string;
  linkLabel?: string;
}
