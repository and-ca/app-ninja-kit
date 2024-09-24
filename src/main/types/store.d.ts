import { FileStatus, Collection, ConfigProperties } from '../Enum';
import { UserType } from '../models/User';

export interface AppConfig {
  [ConfigProperties.Global]?: {
    userPath?: string;
  };
  [ConfigProperties.User]?: UserType[];
}
export interface MediaList {
  video?: MediaInfo[];
  audio?: MediaInfo[];
  image?: MediaInfo[];
}

export interface MediaInfo {
  name?: string;
  fileName?: string;
  date?: string;
  extension?: string;
  size?: string;
  status?: FileStatus;
}

export type DataMap = {
  [Collection.Config]: AppConfig;
  [Collection.MediaList]: MediaList;
};

export type SaveFunc = <C extends Collection>(data: DataMap[C] | undefined) => DataMap[C];
