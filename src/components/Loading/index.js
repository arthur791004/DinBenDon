import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const getSize = ({ size }) => size || 64;

const getBorderSize = ({ size }) => getSize({ size }) / 8;

const Loading = styled.div`
  width: ${getSize}px;
  height: ${getSize}px;
  border: ${getBorderSize}px solid #dddddd;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: ${rotate} 1s ease-in-out infinite;
  will-change: transform;
`;

export default Loading;