import fs from 'fs';
import path from 'path';

import { User, UserType } from '../models/User';

//Error
import { IpcError } from '../Error';

//Enum
import { FormName, FormType } from '../Enum';

type Payload = {
  formType: FormType;
  formName: FormName;
  formState: UserType;
};
export default class IpcRequest {
  public static async handleSaveCollection(args: string): Promise<string> {
    const data = JSON.parse(args) as Payload;

    if (![FormType.create, FormType.update].includes(data.formType)) {
      throw new IpcError(`Api does not accept this FormType: ${data.formType}`, 400);
    }

    switch (data.formName) {
      case FormName.UserRegister: {
        const user = User.objToUser(data.formState as UserType);
        user.add();
        return user.userToString();
      }
      default:
        throw new IpcError(`Api does not accept this FormName: ${data.formName}`, 400);
    }
  }

  public static async handleValidateCollection(args: string): Promise<string | undefined> {
    const data = JSON.parse(args) as Payload;

    if (![FormType.signin].includes(data.formType)) {
      throw new IpcError(`Api does not accept this FormType: ${data.formType}`, 400);
    }
    switch (data.formName) {
      case FormName.UserSigin:
        return User.getUserByEmailAndPassword(data.formState as UserType)?.userToString();
      default:
        throw new IpcError(`Api does not accept this FormName: ${data.formName}`, 400);
    }
  }

  public static async handleGetLanguage(language: string): Promise<string> {
    const filePath = path.join(__dirname, '../../resources/languages', `${language}.json`);

    if (!fs.existsSync(filePath)) {
      throw new IpcError(`Could not find language: ${language}`, 400);
    }
    
    return fs.readFileSync(filePath, 'utf-8');
  }
}
