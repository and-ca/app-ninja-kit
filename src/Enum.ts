export enum FileStatus {
  Saved,
  Deleted,
  Edited
}

export enum FileType {
  Video = 'video',
  Audio = 'audio',
  Image = 'image',
  Document = 'doc'
}

export enum FormName {
  UserRegister = 'userRegister',
  UserUpdate = 'userUpdate',
  UserSigin = 'userSigin'
}

export enum FormType {
  update = 'update',
  create = 'create',
  signin = 'signin'
}

export enum ChannelSend {
  Config = 'app-config-send',
  WindowMin = 'window-minimize',
  WindowMax = 'window-maximize',
  WindowUnMax = 'window-unmaximize',
  WindowClose = 'window-close'
}

export enum ChannelInvoke {
  ConnectionPublicKey = 'connection-get-publicKey',
  ConnectionSession = 'connection-send-session',
  Language = 'app-config-get-language',
  Config = 'app-config-get',
  Get = 'app-get',
  Save = 'app-save',
  Validate = 'app-validate'
}

export enum ChannelListen {
  Config = 'app-config-listen'
}
