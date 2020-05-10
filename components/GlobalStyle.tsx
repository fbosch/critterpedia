import { createGlobalStyle } from 'styled-components'
import { getFontFamily, getBodyBackground, device } from '../theme'
import logo from '../public/assets/images/logo.svg'

export default createGlobalStyle`
  html {
    position: static;
    overflow-y: hidden;
    height: 100%;
    max-height: 100%;
    background-color: ${getBodyBackground};
    .js {
      background-color: ${props => props.theme.orangeAccent};
    }
    .js.loaded {
      background-color: ${getBodyBackground};
    }
  }
  body {
    font-family: ${getFontFamily};
    text-rendering: optimizeLegibility;
    background-color: ${getBodyBackground};
    overflow: auto;
    -webkit-overflow-scrolling: touch;
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

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .page-transition-enter {
		opacity: 0;
	}
	.page-transition-enter-active {
		opacity: 1;
		transition: opacity 100ms linear;
	}
	.page-transition-exit {
		opacity: 1;
	}
	.page-transition-exit-active {
		opacity: 0;
		transition: opacity 100ms linear;
	}
`