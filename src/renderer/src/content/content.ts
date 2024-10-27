//types
import { Content, Language, LanguageJson } from '../types';

//enum
import { FormType, ChannelInvoke } from '../Enum';

const loadLanguage = async (language: Language) :Promise<LanguageJson>=> {
  const result = await window.api.invoke(ChannelInvoke.Language, language);
  if(!result.data){
    throw new Error(`Coud not find lnaguage: ${language}`);
  }
  return JSON.parse(result.data);
};


export const getContent = async (lang: Language ): Promise<Content> => {
  const language = await loadLanguage(lang);
  return getDefaultContent(language);
}


export const getDefaultContent = (language?: LanguageJson ): Content => {
  return {
    title: language?.global_app_name ?? "",
    footer: {
      mainText: `©${new Date().getFullYear()} - ${language?.global_app_name}`
    },
    titleBar: {
      titleText: language?.global_app_name ?? ""
    },
    pages: {
      signin: {
        title: language?.sigin_title,
        subTitle: '',
        body: '',
        form: [
          {
            field: 'input',
            type: 'email',
            label: language?.sigin_form_label_email ?? "",
            name: 'email',
            className: {
              field: 'col-span-4'
            },
            validation: {
              required: language?.global_form_input_error_required
            }
          },
          {
            field: 'input',
            type: 'password',
            label: language?.sigin_form_label_password ?? "",
            name: 'password',
            className: {
              field: 'col-span-4'
            },
            validation: {
              required: language?.global_form_input_error_required
            }
          },
          {
            field: 'button',
            type: 'submit',
            label: language?.sigin_form_label_submit ?? "",
            name: 'sigin',
            className: {
              field: 'flex justify-center mb-10 col-span-4',
              button:
                'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"'
            }
          }
        ],
        formName: 'userSigin',
        formType: FormType.signin,
        link: '/',
        linkLabel: `← ${language?.global_back_link}`,
        message: {
          error: {
            title: language?.global_form_message_error_title,
            content: language?.global_form_message_error_body
          },
          success: {
            title: language?.global_form_message_success_tittle,
            content: language?.global_form_message_success_body
          }
        }
      },
      main: {
        title: language?.main_title,
        subTitle: language?.main_subtitle
      },
      welcome: {
        title: language?.welcome_title,
        subTitle: language?.welcome_subtitle,
        form: [
          {
            field: 'button',
            type: 'button',
            label: language?.welcome_form_label_register ?? "",
            name: 'register',
            link: '/register',
            className: {
              field: 'mt-10 col-span-2',
              button:
                ' text-white border-white border-2 hover:bg-blue-700 hover:border-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "'
            }
          },
          {
            field: 'button',
            type: 'button',
            label: language?.welcome_form_label_sigin ?? "",
            name: 'sigin',
            link: '/sigin',
            className: {
              field: 'mt-10 col-span-2',
              button:
                'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"'
            }
          }
        ],
        formName: 'welcome'
      },
      register: {
        title: language?.register_title,
        form: [
          {
            field: 'input',
            type: 'input',
            label: language?.register_form_label_fn ?? "",
            name: 'firstName',
            className: {
              field: 'col-span-2'
            },
            validation: {
              required: language?.global_form_input_error_required
            }
          },
          {
            field: 'input',
            type: 'input',
            label: language?.register_form_label_ln ?? "",
            name: 'lastName',
            className: {
              field: 'col-span-2'
            },
            validation: {
              required: language?.global_form_input_error_required
            }
          },
          {
            field: 'input',
            type: 'email',
            label: language?.register_form_label_email ?? "",
            name: 'email',
            className: {
              field: 'col-span-4'
            },
            validation: {
              required: language?.global_form_input_error_required
            }
          },
          {
            field: 'input',
            type: 'password',
            label: language?.register_form_label_password ?? "",
            name: 'password',
            className: {
              field: 'col-span-2'
            },
            validation: {
              required: language?.global_form_input_error_required
            }
          },
          {
            field: 'input',
            type: 'password',
            label: language?.register_form_label_password_2 ?? "",
            name: 'confirmPassword',
            className: {
              field: 'col-span-2'
            },
            validation: {
              required: language?.global_form_input_error_required
            }
          },
          {
            field: 'button',
            type: 'submit',
            label: language?.register_form_label_submit ?? "",
            name: 'register',
            className: {
              field: 'flex justify-center mb-10 col-span-4',
              button:
                'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"'
            }
          }
        ],
        formName: 'userRegister',
        formType: FormType.create,
        link: '/',
        linkLabel:  `← ${language?.global_back_link}`,
        message: {
          error: {
            title: language?.global_form_message_error_title,
            content: language?.global_form_message_error_body
          },
          success: {
            title: language?.global_form_message_success_tittle,
            content: language?.global_form_message_success_body
          }
        }
      }
    }
  };
};
