import { createMuiTheme } from "@material-ui/core/styles";

const color = {
  primary: {
    light: "#15AEE2",
    main: "#0D90BC",
    dark: "#03759C",
  },
  secondary: {
    light: "#FD5800",
    main: "#FF3403",
    dark: "#D34206",
  },
  light: "#21303F",
  dark: "#162330",
}
//Colores antiguos de fondo
//1A1B2F //47495b

const theme = createMuiTheme({
  breakpoints: {
    values: {
      sm: 640,
      xl: 1440,
    },
  },
  palette: {
    primary: {
      light: `${color.primary.light}`,
      main: `${color.primary.main}`,
      dark: `${color.primary.dark}`,
    },
    secondary: {
      light: `${color.secondary.light}`,
      main: `${color.secondary.main}`,
      dark: `${color.secondary.dark}`,
    },
    warning: {
      light: "#FFB92F",
      main: "#F2A207",
      dark: "#BF8005",
    },
    text: {
      primary: "rgba(255,255,255,0.90)",
      secondary: "rgba(255,255,255,0.70)",
      disabled: "rgba(255,255,255,0.38)",
    },
    divider: "rgba(255,255,255,0.05)",
    background: {
      default: `${color.dark}`,
      paper: `${color.dark}`,
      light: `${color.light}`
    },
  },
  shape: {
    borderRadius: 8,
  },
  elevation: [
    "rgba(255, 255, 255, 0.05)",
    "rgba(255, 255, 255, 0.07)",
    "rgba(255, 255, 255, 0.08)",
    "rgba(255, 255, 255, 0.09)",
    "rgba(255, 255, 255, 0.11)",
    "rgba(255, 255, 255, 0.14)",
    "rgba(255, 255, 255, 0.14)",
    "rgba(255, 255, 255, 0.15)",
    "rgba(255, 255, 255, 0.16)",
  ],
  props: {
    MuiButtonBase: {
      disableRipple: true,
      // disablefocusripple: true,
      disableTouchRipple: true,
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: "rgba(255,255,255,1)",
        borderRadius: 8,
        backgroundColor: `${color.primary.main}`,
        "&:hover": {
          boxShadow: `0 0px 12px 0 ${color.primary.main}`,
          backgroundColor: `${color.primary.main}`,
        },
        "&:focus": {
          border: "none",
          outline: "none",
        },
        "&:active": {
          backgroundColor: `${color.primary.dark}`,
        },
      },
      containedSecondary: {
        color: "rgba(255,255,255,0.90)",
        borderRadius: 8,
        backgroundColor: `${color.secondary.main}`,
        "&:hover": {
          boxShadow: `0 0px 12px 0 ${color.secondary.main}`,
          backgroundColor: `${color.secondary.main}`,
        },
        "&:focus": {
          border: "none",
          outline: "none",
        },
        "&:active": {
          backgroundColor: `${color.secondary.dark}`,
        },
      },
    },
    MuiPaper: {
      root: {
        background: `${color.dark}`,
      },
    },
    MuiCssBaseline: {
			'@global': {
				body: {
					// background: 'radial-gradient(circle, rgba(25,171,171,1) 0%, rgba(26,75,88,1) 0%, rgba(26,27,47,1) 100%)',
				},
	      '*::-webkit-scrollbar': {
	        width: '0.8em'
	      },
	      '*::-webkit-scrollbar-track': {
	        borderRadius: "10px",
	        '-webkit-box-shadow': `${color.dark}`,
	      },
	      '*::-webkit-scrollbar-thumb': {
	        background: `${color.secondary.dark}`,
	        borderRadius: "6px",
          border: `3px solid ${color.dark}`,
				},
	      '*::-webkit-scrollbar:vertical':{
	        '-webkit-appearance': "none"
	      },
	      '*::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button': {
	        display: "none"
	      },
	      '*::-webkit-scrollbar:horizontal': {
	        height: '0.8em'
	      },
	    },
    },
	  MuiDrawer: {
	    root: {
	    	marginTop: "32px",
	    }
		},
		MuiDataGrid:{
			root:{
				background: `radial-gradient(circle at top left, ${color.light}, ${color.dark})`,
				border:'none',
				borderBottom:'none',
				fontSize:'1.1rem',
		 	},
		},
	}
});

export default theme;
