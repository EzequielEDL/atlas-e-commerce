import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const addStyles = props => {
    const useStyle = makeStyles(theme => ({
        imagotype : {
            width      : props.fullWidth ? '100%' : props.width || '48px',
            height     : props.fullHeight ? '100%' : props.height || '48px'
        }
    }))
    return useStyle;
}

const ImagoType = props => {

    const classes = addStyles(props)()

    return (
        <SvgIcon className={classes.imagotype} viewBox='0 0 57 56' margin={props.margin || 'dense'}>
            <g clipPath='url(#clip0)' filter='url(#filter0_d)'>
                <path 
                    fillRule='evenodd' 
                    clipRule='evenodd' 
                    d='M30.2778 1.24002C29.533 -0.204843 27.4671 -0.204845 26.7223 1.24002L4.32577 44.6893C3.63964 46.0204 4.60597 47.6057 6.10349 47.6057H17.7679C17.767 47.5858 17.7673 47.5658 17.7686 47.5458C18.0509 43.3222 19.8807 40.6405 21.366 39.1346C21.5371 38.9611 21.7072 38.7997 21.8749 38.6484C21.8755 32.5772 23.6389 28.5827 25.1183 26.3008C26.7309 23.8134 28.3307 22.7822 28.3979 22.7396C28.4847 22.6847 28.5915 22.6847 28.6782 22.7396C28.7456 22.7822 30.3454 23.8133 31.958 26.3008C33.4374 28.5827 35.2008 32.5773 35.2013 38.6484C35.369 38.7997 35.5391 38.9611 35.7102 39.1346C37.1955 40.6405 39.0253 43.3221 39.3076 47.5457C39.3089 47.5658 39.3092 47.5858 39.3083 47.6057H50.8966C52.3941 47.6057 53.3604 46.0204 52.6743 44.6893L30.2778 1.24002ZM31.0244 33.9359C31.0244 32.4293 29.9112 31.208 28.5382 31.208C27.165 31.208 26.052 32.4294 26.052 33.9359C26.052 35.4424 27.1651 36.6638 28.5382 36.6638C29.9113 36.6638 31.0244 35.4425 31.0244 33.9359Z' 
                    fill='url(#paint0_linear)'
                />
            </g>
            <defs>
            <filter 
                id='filter0_d' 
                x='0' 
                y='0' 
                width='57' 
                height='56' 
                filterUnits='userSpaceOnUse' 
                colorInterpolationFilters='sRGB'
            >
            <feFlood floodOpacity='0' result='BackgroundImageFix'/>
            <feColorMatrix 
                in='SourceAlpha' 
                type='matrix' 
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset dy='4'/>
            <feGaussianBlur stdDeviation='2'/>
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/>
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/>
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/>
            </filter>
            <linearGradient 
                id='paint0_linear' 
                x1='4.50929'
                y1='7.13421' 
                x2='60.1727' 
                y2='52.5228' 
                gradientUnits='userSpaceOnUse'
            >
                <stop stopColor='#21E4E4'/>
                <stop offset='1' stopColor='#FF07AB'/>
            </linearGradient>
            <clipPath id='clip0'>
                <rect width='49' height='48' fill='white' transform='translate(4)'/>
            </clipPath>
            </defs>
        </SvgIcon>
    )
}

export default ImagoType;