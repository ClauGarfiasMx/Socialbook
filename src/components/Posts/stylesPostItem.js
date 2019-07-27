import styled, { css } from "styled-components";

//  //////POSTITEM//////
const ImageFromPost = styled.div`
  // max-width: 50%;
  height: auto;
  object-fit: cover;
  img {
    object-fit: contain;
    width: 100%;
    max-height: 10rem;
}
  }
`;
const TextArea = styled.textarea`
  background-color: #fff;
  border: 1px solid #b6b6b6;
  -moz-border-radius: 1px solid #b6b6b6
  -webkit-border-radius:1px solid #b6b6b6
  border-radius: 5px;
  font-family: Open Sans, Arial, sans-serif;
  font-size: 15px;
  color: #404b56;
  padding: 16px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const PostItemContainer = styled.article`
  padding: 1rem 2rem;
  background-color: #fff;
  margin: 1.5rem;
`;

const FlexRowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  div {
    width: 50%;
  }
  p {
    margin: 0 0.5rem;
    text-align: left;
    width: 50%;
  }
`;

const MonoSpaceP = styled.p`
  span {
    font-family: "Thasadith", sans-serif;
    letter-spacing: 0.025rem;
    font-weight: 600;
  }
  ${props =>
    props.light &&
    css`
      span {
        font-weight: 100 !important;
      }
    `}
`;

export { ImageFromPost, TextArea, PostItemContainer, FlexRowDiv, MonoSpaceP };
