const { styled } = require("styled-components");

export const FullPageLoaderContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    background-color: aliceblue;
    
    span {
        color: orange;
        font-size: 68px;
        animation-name: popper;
        animation-duration: 700ms;
        animation-iteration-count: infinite;

        @keyframes popper {
            0% {
                font-size: 68px;
            } 50% {
                font-size: 38px;
            } 100% {
                font-size: 68px;
            }
        }
    }
`