import { createGlobalStyle } from 'styled-components'
import { getFontFamily, getBodyBackground, ios, standalone } from '../theme'

export default createGlobalStyle`
  html {
    overflow-y: hidden;
    margin: 0;
    padding: 0;
    height: 100%;
    max-height: 100%;
    background-color: ${getBodyBackground};
    ${standalone} {
      &.js {
          body {
            transition: background 500ms linear;
            background-color: ${(props) => props.theme.orangeAccent};
          }
          &:after {
            content: '';
            display: block;
            height: 100vh;
            width: 100%;
            background: ${(props) => props.theme.orangeAccent};
            background-image: url('/assets/images/logo.svg');
            background-repeat: no-repeat;
            background-position: center calc(50% - 2.4vh);
            background-size: 22%;
            z-index: 99;
            position: fixed;
            top: 0;
            left: 0;
            transition: opacity 300ms ease-out 300ms, background-color 500ms linear, background-size 500ms linear 150ms, z-index 0ms linear 500ms;
          }

          &.loaded {
            body {
              background-color: ${getBodyBackground};
            }
            &:after {
              background-color: ${getBodyBackground};
              background-size: 30%;
              opacity: 0;
              z-index: -1;
            }
          }
        }
      }
  }
  body {
    min-width: 100vw;
    margin: 0;
    padding: 0;
    font-family: ${getFontFamily};
    text-rendering: optimizeLegibility;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    ${ios} {
      ${standalone} {
        position: fixed;
      }
    }
  }

  @font-face {
    font-family: Humming;
    font-display: fallback;
    src: url("./assets/fonts/humming.otf") format("opentype");
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
    will-change: opacity;
	}
	.page-transition-enter-active {
		opacity: 1;
		transition: opacity 200ms ${(props) => props.theme.timingFunction} 50ms;
	}
	.page-transition-exit {
    pointer-events: none;
		opacity: 1;
    will-change: opacity;
	}
	.page-transition-exit-active {
    pointer-events: none;
		opacity: 0;
		transition: opacity 250ms ${(props) => props.theme.timingFunction};
	}
`
