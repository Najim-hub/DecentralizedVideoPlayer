import React from 'react';

export function VideoMetadata(props) {
    if (!props.video || !props.video.statistics) {
      return <div/>;
    }
    const viewCount = Number(props.video.statistics.viewCount).toLocaleString();
  
    return (
      <div className='video-metadata'>
        <h3>{props.video.snippet.title}</h3>
        <div className='video-stats'>
          <span>{viewCount} views</span>
          {/*...*/}
        </div>
        <Divider/>
      </div>
   );

    }
   