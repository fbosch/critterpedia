import { createGlobalStyle } from 'styled-components'
import { getFontFamily, getBodyBackground } from '../theme'

export default createGlobalStyle`
  html {
    background-color: ${getBodyBackground};
  }
  body {
    font-family: ${getFontFamily};
    text-rendering: optimizeLegibility;
    background-color: ${getBodyBackground};
    background: linear-gradient(to right, rgb(239, 233, 188) 70%, #f7f3d0 100%);
  }

  @font-face {
    font-family: Humming;
    font-weight: normal;
    font-display: swap;
    src:
      url("./assets/fonts/humming.otf") format("opentype"),
      url("./assets/fonts/humming.ttf")  format("truetype");
  }

  main {
    overflow: hidden;
    background-color: #efe4b7;
    background: linear-gradient(to right, rgb(234, 227, 169) 5%, #efe4b7 100%);
  }

  .page-transition-enter {
		opacity: 0;
	}
	.page-transition-enter-active {
		opacity: 1;
		transition: opacity 150ms ease-in;
	}
	.page-transition-exit {
		opacity: 1;
	}
	.page-transition-exit-active {
		opacity: 0;
		transition: opacity 200ms ease-out;
	}
`