import React from 'react';

import { SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    size : {
        transform: "rotate(45deg)",
        width: '100%',
        height: '100%',
    }
}))

const RocketSvg = () => {
  const classes = useStyles();

  return(
      <SvgIcon
        className={classes.size}
        viewBox='0 0 1000 1000'
        margin='dense'
        width="1000"
        height="1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
          <g id="rocketAnim">
          <g id="rocket">
          <g id="engineCenter">
          <path id="Vector" d="M465 631V683.9C465 687 466.2 689.9 468.4 692.1C470.6 694.3 473.5 695.5 476.6 695.5H477.3C480.4 695.5 483.3 694.3 485.5 692.1C487.7 689.9 488.9 687 488.9 683.9V631H465Z" fill="url(#paint1_linear)"/>
          <path id="Vector_2" d="M513 631V683.9C513 687 514.2 689.9 516.4 692.1C518.6 694.3 521.5 695.5 524.6 695.5H525.3C528.4 695.5 531.3 694.3 533.5 692.1C535.7 689.9 536.9 687 536.9 683.9V631H513Z" fill="url(#paint1_linear)"/>
          </g>
          <g id="engineSides">
          <path id="Vector_3" d="M388 740.4C388 746.9 389.2 753.2 391.4 757.8C393.6 762.4 396.5 765 399.6 765H400.2C403.3 765 406.2 762.4 408.4 757.8C410.6 753.2 411.8 747 411.8 740.4V628H388V740.4Z" fill="url(#paint2_linear)"/>
          <path id="Vector_4" d="M591.7 628V740.5C591.7 747 592.9 753.3 595.1 757.9C597.3 762.5 600.2 765.1 603.3 765.1H603.9C607 765.1 609.9 762.5 612.1 757.9C614.3 753.3 615.5 747.1 615.5 740.5V628H591.7Z" fill="url(#paint3_linear)"/>
          </g>
          <path id="core" d="M509.1 49.7C507.9 48.2 506.3 47 504.6 46.2C502.9 45.4 501 45 499 45C497.1 45 495.2 45.4 493.4 46.2C491.7 47 490.1 48.2 488.9 49.7C481.9 57.6 475.5 68 469.9 79.1C453.4 112 445.1 149.4 445.1 187.2V606.6H552.1V185.6C552.1 148.8 544.1 112.5 528.5 80.3C521.1 65 514.3 55.5 509.1 49.7Z" fill="#EEEEEE"/>
          <g id="sides">
          <path id="Vector_5" d="M620.8 274.6C615.6 264.4 610.8 258.1 607.2 254.2C606.3 253.2 605.2 252.4 604 251.9C602.8 251.4 601.5 251.1 600.1 251.1C598.7 251.1 597.4 251.4 596.2 251.9C595 252.4 593.9 253.2 593 254.2C588.1 259.5 583.6 266.4 579.7 273.8C568.2 296 562.2 320.7 562.3 345.8V606.6H637.3V344.7C637.5 320.4 631.8 296.3 620.8 274.6Z" fill="#E0E0E0"/>
          <path id="Vector_6" d="M406.3 254.2C405.4 253.2 404.3 252.4 403.1 251.9C401.9 251.4 400.6 251.1 399.2 251.1C397.8 251.1 396.5 251.4 395.3 251.9C394.1 252.4 393 253.2 392.1 254.2C388.4 258 383.7 264.4 378.5 274.6C367.5 296.3 361.8 320.4 361.9 344.7V606.6H436.9V345.8C437 320.7 431 296 419.5 273.8C415.7 266.4 411.3 259.5 406.3 254.2Z" fill="#E0E0E0"/>
          <path id="Vector_7" d="M551.6 201.3H445.7V205.4H551.6V201.3Z" fill="#E0E0E0"/>
          </g>
          <g id="details">
          <path id="Vector_8" d="M362.4 372.3H380.2V350.4L362.4 350.3V372.3Z" fill="#535461"/>
          <path id="Vector_9" d="M590.8 606.7L587 631H621L617.2 606.7H590.8Z" fill="#535461"/>
          <path id="Vector_10" d="M386.8 606.7L383 631H417L413.2 606.7H386.8Z" fill="#535461"/>
          <path id="Vector_11" d="M511.8 606.7L508 631H542L538.2 606.7H511.8Z" fill="#535461"/>
          <path id="Vector_12" d="M463.8 606.7L460 631H494L490.2 606.7H463.8Z" fill="#535461"/>
          <path id="Vector_13" d="M437 350.4L419.2 350.3V372.3H437V368.1H445.1V361.3H437V350.4Z" fill="#535461"/>
          <path id="Vector_14" d="M562.4 361.3H552.1V368.1H562.4V372.3H580.2V350.4L562.4 350.3V361.3Z" fill="#535461"/>
          <path id="Vector_15" d="M619.2 350.3V372.3H637V350.4L619.2 350.3Z" fill="#535461"/>
          <path id="Vector_16" d="M481 121.8H514.8C520.9 121.8 525.8 116.9 525.8 110.8V107.2C525.8 101.1 520.9 96.2 514.8 96.2H481C474.9 96.2 470 101.1 470 107.2V110.8C470 116.9 474.9 121.8 481 121.8Z" fill="#535461"/>
          </g>
          </g>
          </g>
          <defs>
          <linearGradient id="paint0_linear" x1="476.865" y1="695.4" x2="476.865" y2="631" gradientUnits="userSpaceOnUse">
          <stop offset="0.23" stopColor="#F55F44"/>
          <stop offset="0.69" stopColor="#FCCC63"/>
          <stop offset="1" stopColor="#E0E0E0"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="524.865" y1="695.4" x2="524.865" y2="631" gradientUnits="userSpaceOnUse">
          <stop offset="0.23" stopColor="#F55F44"/>
          <stop offset="0.69" stopColor="#FCCC63"/>
          <stop offset="1" stopColor="#E0E0E0"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="399.865" y1="764.957" x2="399.865" y2="627.957" gradientUnits="userSpaceOnUse">
          <stop offset="0.23" stopColor="#F55F44"/>
          <stop offset="0.69" stopColor="#FCCC63"/>
          <stop offset="1" stopColor="#E0E0E0"/>
          </linearGradient>
          <linearGradient id="paint3_linear" x1="603.595" y1="764.957" x2="603.595" y2="627.957" gradientUnits="userSpaceOnUse">
          <stop offset="0.23" stopColor="#F55F44"/>
          <stop offset="0.69" stopColor="#FCCC63"/>
          <stop offset="1" stopColor="#E0E0E0"/>
          </linearGradient>
          </defs>
      </SvgIcon>
  );
};

export default RocketSvg;
