import React from 'react';

import { SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const addStyles = props => {
    const useStyle = makeStyles(theme => ({
        imagetype : {
            width      : props.fullWidth ? '100%' : props.width || '300px',
            height     : props.fullHeight ? '100%' : props.height || '300px'
        }
    }))
    return useStyle;
}

const AltImageSvg = props => {
  const classes = addStyles(props)()

  return(
      <SvgIcon
          className={classes.imagetype}
          viewBox="0 0 218 189"
          margin={props.margin || 'dense'}
          width="218"
          height="189"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g id="altImage">
          <g id="sun">
          <path id="Vector" d="M44.5306 149.061C69.1242 149.061 89.0612 129.124 89.0612 104.531C89.0612 79.937 69.1242 60 44.5306 60C19.937 60 0 79.937 0 104.531C0 129.124 19.937 149.061 44.5306 149.061Z" fill="white"/>
          </g>
          <g id="mountain">
          <path id="mountain_2" d="M216.126 183.164L163.854 92.6259C163.527 92.06 163.057 91.5901 162.491 91.2633C161.926 90.9366 161.284 90.7646 160.63 90.7646C159.977 90.7646 159.335 90.9366 158.769 91.2633C158.203 91.5901 157.733 92.06 157.406 92.6259L125.506 147.878L77.9497 65.5078C77.5308 64.7823 76.9283 64.1798 76.2028 63.7609C75.4772 63.342 74.6542 63.1215 73.8165 63.1215C72.9787 63.1215 72.1557 63.342 71.4301 63.7609C70.7046 64.1798 70.1021 64.7823 69.6832 65.5078L2.66382 181.589C2.24493 182.314 2.02441 183.137 2.02441 183.975C2.02442 184.813 2.24496 185.636 2.66385 186.361C3.08274 187.087 3.68523 187.689 4.41077 188.108C5.13631 188.527 5.95934 188.748 6.79712 188.748H212.902C213.556 188.748 214.198 188.576 214.764 188.249C215.33 187.922 215.799 187.452 216.126 186.886C216.453 186.321 216.625 185.679 216.625 185.025C216.625 184.372 216.453 183.73 216.126 183.164V183.164Z" fill="#19ABAB"/>
          </g>
          <g id="box">
          <path id="Vector_2" d="M217.091 0H198V19.0907H217.091V0Z" fill="#2A2B3E"/>
          </g>
          </g>
      </SvgIcon>
  );
};

export default AltImageSvg;
