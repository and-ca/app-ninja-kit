import { useState } from 'react';

//Icons
import { Close, Minus, Window } from '@renderer/components/Icons';

//Types
import { TitleBarProps } from '@renderer/types';

//enum
import { ChannelSend } from '@renderer/Enum';

const TitleBar = ({ titleBar }: TitleBarProps): JSX.Element => {
  const [isWindowMaximize, setIsWindowMiximize] = useState(false);

  const handleWindows = (channel: ChannelSend): void => {
    if (channel === ChannelSend.WindowMax) setIsWindowMiximize(true);
    else if (channel === ChannelSend.WindowUnMax) setIsWindowMiximize(false);
    window.api.send(channel);
  };

  return (
    <div className="w-full p-0 m-0 top-0 fixed bg-slate-500 bg-opacity-25 grid grid-cols-4 ">
      <p className="p-1 ml-2 text-white col-span-3 titlebar">{titleBar.titleText}</p>
      <div className="w-full flex justify-end p-0 m-0">
        <Minus
          className="h-9 p-2 hover:bg-slate-600"
          onClick={() => handleWindows(ChannelSend.WindowMin)}
        />
        {isWindowMaximize ? (
          <Window
            className="h-9 p-2 hover:bg-slate-600"
            onClick={() => handleWindows(ChannelSend.WindowUnMax)}
          />
        ) : (
          <Window
            className="h-9 p-2 hover:bg-slate-600"
            onClick={() => handleWindows(ChannelSend.WindowMax)}
          />
        )}
        <Close
          className="h-9 p-2 hover:bg-rose-700"
          onClick={() => handleWindows(ChannelSend.WindowClose)}
        />
      </div>
    </div>
  );
};

export default TitleBar;
