//types
import { Content } from '../../types';

export default <Content>{
  title: 'App Ninja Kit',
  footer: {
    mainText: `©${new Date().getFullYear()} - App Ninja Kit`
  },
  titleBar: {
    titleText: `App Ninja Kit`
  },
  pages: {
    signin: {
      title: 'Sign In',
      subTitle: '',
      body: '',
      form: [
        {
          field: 'input',
          type: 'email',
          label: 'Email',
          name: 'email',
          className: {
            field: 'col-span-4'
          },
          validation: {
            required: 'This field is required'
          }
        },
        {
          field: 'input',
          type: 'password',
          label: 'Password',
          name: 'password',
          className: {
            field: 'col-span-4'
          },
          validation: {
            required: 'This field is required'
          }
        },
        {
          field: 'button',
          type: 'submit',
          label: 'Sign In',
          name: 'sigin',
          className: {
            field: 'flex justify-center mb-10 col-span-4',
            button:
              'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"'
          }
        }
      ],
      formName: 'userSigin',
      formType: 'signin',
      link: '/',
      linkLabel: '← Back',
      message: {
        error: {
          title: 'Error!',
          content: 'Something went wrong! Could not sign in.'
        },
        success: {
          title: 'Success!',
          content: 'The form has been submited successfully.'
        }
      }
    },
    main: {
      title: 'Hello {firstName}, welcome to App Ninja Kit',
      subTitle: 'Nice to see you here!'
    },
    welcome: {
      title: 'Welcome to App Ninja Kit',
      subTitle: 'Lets get started',
      form: [
        {
          field: 'button',
          type: 'button',
          label: 'Register',
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
          label: 'Sign In',
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
      title: 'Register',
      form: [
        {
          field: 'input',
          type: 'text',
          label: 'First Name',
          name: 'firstName',
          className: {
            field: 'col-span-2'
          },
          validation: {
            required: 'This field is required'
          }
        },
        {
          field: 'input',
          type: 'text',
          label: 'Last Name',
          name: 'lastName',
          className: {
            field: 'col-span-2'
          },
          validation: {
            required: 'This field is required'
          }
        },
        {
          field: 'input',
          type: 'email',
          label: 'email',
          name: 'email',
          className: {
            field: 'col-span-4'
          },
          validation: {
            required: 'This field is required'
          }
        },
        {
          field: 'input',
          type: 'password',
          label: 'Password',
          name: 'password',
          className: {
            field: 'col-span-2'
          },
          validation: {
            required: 'This field is required'
          }
        },
        {
          field: 'input',
          type: 'password',
          label: 'Confirm Password',
          name: 'confirmPassword',
          className: {
            field: 'col-span-2'
          },
          validation: {
            required: 'This field is required'
          }
        },
        {
          field: 'button',
          type: 'submit',
          label: 'Register',
          name: 'register',
          className: {
            field: 'flex justify-center mb-10 col-span-4',
            button:
              'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"'
          }
        }
      ],
      formName: 'userRegister',
      formType: 'create',
      link: '/',
      linkLabel: '← Back',
      message: {
        error: {
          title: 'Error!',
          content: 'Something went wrong! Could not register.'
        },
        success: {
          title: 'Success!',
          content: 'The form has been submited successfully.'
        }
      }
    }
  }
};
