import React, { useState } from "react";
import YouTube from "react-youtube";
const VimeoPlayer = ({ videoId, viewIndex, handleDir, series, postProgress }) => {
  const [canNext, setCanNext] = useState(true)
  const onEndHandler = () => {
    if (canNext) {
      handleDir("next");
    }
    postProgress(series[viewIndex].seriesId);
  };
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: true,
    },
  };
  return (
    <>
      <div className="theatre">
        <YouTube
          videoId={String(videoId).trim("")}
          autoplay={true}
          opts={opts}
          className="vedio-container"
          // onReady={() => setLoader(false)}
          onEnd={onEndHandler}
        />
      </div>
    </>
  );
};

export default VimeoPlayer;
