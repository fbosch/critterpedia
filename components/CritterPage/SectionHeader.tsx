import styled from 'styled-components'

export default styled.header`
  h2 {
    letter-spacing: 0.04em;
    padding: 0;
    margin: 0 0 0.5em 0;
    color: ${(props) => props.theme.greenText};
    z-index: 1;
    position: relative;
    font-family: 'Helvetica Neue';
    font-weight: 500;
    font-size: 1.4em;
    transform: skew(-7deg);
    font-style: italic;
    white-space: nowrap;
    &:after {
      content: '';
      background: ${(props) => props.theme.greenHighlight};
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      display: block;
      z-index: -1;
      border-radius: 5% 22% 50% 15% / 50% 50% 20% 10%;
      transform: skew(-10deg);
    }
  }
`
