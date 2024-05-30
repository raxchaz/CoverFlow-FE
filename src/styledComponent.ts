import styled from 'styled-components';

export const StyledPage = styled.div`
  height: 100vh;
  width: 700px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  margin: 0 auto;
  padding: 0.5%;
  overflow: auto;
`;

export const Heading = styled.div`
  display: flex;
  position: fixed;
  width:68rem;
  height:17rem;
  top:0;
  justify-content: center;
  align-items:center;
  font-size: 1rem;
  margin-left:1rem;
  padding-right:21rem;
  letter-spacing: -1px;
  font-weight: 600;
  background-color:white;
  z-index:55;
`;


export const StyledHeader = styled.div`
  position: relative;
  display: block;
  flex-direction: row;
  margin-top: 12%;
`;
