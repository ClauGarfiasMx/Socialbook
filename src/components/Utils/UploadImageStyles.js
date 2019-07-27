import styled, { css } from "styled-components";

export const UploadBtnWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin: 0 auto;
`;

export const UploadBtn = styled.button`
  background-color: #31739d !important;
  border: 1px solid gray;
  font-size: 14px;
  color: gray;
  margin: 0 auto 0.5rem auto;
  padding: 0.15rem !important;
  cursor: pointer;
  ${props =>
    props.delete &&
    css`
      background: gray;
      border: none !important;
      color: white;
    `}
`;

export const ImagePreview = styled.img`
  width: auto;
  max-height: 10rem;
`;
export const ErrorParagraph = styled.p`
  color: #ff0000;
  margin: 0 auto;
`;
export const HiddenInput = styled.input`
  cursor: pointer;
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  margin: 0 auto;
  height: 3rem;
  width: 100%;
`;

export const FlexDiv = styled.div`
  display: flex;
`;
