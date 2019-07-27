import styled, { css } from "styled-components";

const UploadBtnWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

const UploadBtn = styled.button`
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 14px;
  color: gray;
  margin: 0.25rem 0.5rem 0.25rem 0;
  padding: 0.25rem 1.25rem;
  cursor: pointer;
  ${props =>
    props.delete &&
    css`
      background: gray;
      border: none !important;
      color: white;
    `}
`;

const ImagePreview = styled.img`
  width: auto;
  max-height: 5rem;
`;
const ErrorParagraph = styled.p`
  color: #ff0000;
`;
const HiddenInput = styled.input`
  cursor: pointer;
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  margin: 0;
`;

const FlexDiv = styled.div`
  display: flex;
`;

export {
  UploadBtnWrapper,
  UploadBtn,
  ImagePreview,
  ErrorParagraph,
  HiddenInput,
  FlexDiv
};
