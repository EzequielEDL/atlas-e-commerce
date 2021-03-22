import React from 'react';
import LogoAnimSvg from '../SvgIcons/LogoAnimSvg.js'

const PreloadAnim = ({ width, height }) => {
  return(
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column', width: `${width}`, height: `${height}`}}>
      <LogoAnimSvg />
    </div>
  );
};

export default PreloadAnim;
