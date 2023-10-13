import ReactPlayer from "react-player";
import { forwardRef } from "react";
import type { ComponentProps, RefObject } from "react";

type ReactPlayerProps = ComponentProps<typeof ReactPlayer>;

const Player = forwardRef((props: ReactPlayerProps, ref: any) => {
  return <ReactPlayer {...props} ref={ref} />;
});

export const canPlay = (url: string) => ReactPlayer.canPlay(url);

export default Player;
