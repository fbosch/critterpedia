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

  .fade {
    opacity: 0;
    animation: fadeIn 250ms linear 100ms;
    animation-fill-mode: forwards;
  }

  /* .js {
    opacity: 0;
    &.loaded {
      animation: fadeIn 800ms cubic-bezier(0,.5,.5,1);
      animation-fill-mode: forwards;
    }
  } */

  .js {
    @media ${device.laptop} {
      main:before {
        display: none;
      }
    }
    &.loaded {
      main:before {
        opacity: 0;
        background-size: 12vh;
        z-index: -1;
      }
    }
    main:before {
      content: '';
      position: fixed;
      height: calc(100% + env(safe-area-inset-top));
      width: 100%;
      background: ${props => props.theme.orangeAccent};
      z-index: 99;
      top: calc(0% - env(safe-area-inset-top));
      opacity: 1;
      transition: opacity 800ms cubic-bezier(0,.5,.5,1) 200ms, z-index 0ms linear 1s, background-size 600ms ease;
      background-image: url(${logo});
      background-size: 10vh;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  @keyframes splashScreenFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
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