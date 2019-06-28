import React from 'react';

export default ({ content }) => (
  <React.Fragment>
    {content ? (
      <div
        style={{
          whiteSpace: 'pre-line',
          margin: '10px 0',
          fontFamily: 'Noto Sans KR'
        }}
      >
        {content}
      </div>
    ) : (
      <div
        style={{
          margin: '40px 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          alt="no-content"
          src="https://images.vexels.com/media/users/3/134546/isolated/preview/b1b61276fef1c4a683aabaa53833c7ca-emoji-emoticon-sad-face-by-vexels.png"
          style={{
            width: '50%'
          }}
        />
        <span
          style={{
            fontSize: 24
          }}
        >
          내용이 없습니다.
        </span>
      </div>
    )}
  </React.Fragment>
);
