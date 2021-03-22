import React from 'react';
import RocketSvg from '../SvgIcons/RocketSvg.js'
import '../SvgIcons/styles.css'
import { Typography } from  '@material-ui/core';

const LoadingAnim = ({ width, height, message }) => {

  return(
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
      <RocketSvg width={width} height={height}/>
      <Typography>{!!message ? message : "Loading..."}</Typography>
    </div>
  );
};

export default LoadingAnim;
