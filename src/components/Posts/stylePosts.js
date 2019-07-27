import styled from "styled-components";
import { chairchat } from "../../assets";

const PostContainer = styled.div`
  // display: flex;
`;
const TextArea = styled.textarea`
  background-color: #fff;
  border: none;
  width: 80%;
  margin-bottom:1.5rem;
  -moz-border-radius: 1px solid #b6b6b6
  -webkit-border-radius:1px solid #b6b6b6
  font-family: "Thasadith", sans-serif;
  font-size: 15px;
  color: #404b56;
  padding: .5rem;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;
const CreatePostSection = styled.section`
  display: flex;
  align-items: center;
  background-image: url(${chairchat});
  background-repeat: no-repeat;
  background-size: cover;
  height: 50rem;
  width: 100%;
  margin: auto;
  span {
    margin: auto;
    background-color: #ffffffbd;
    width: 60%;
    padding: 0 0 1rem 0;
  }
  button {
    margin: 0.5rem;
    padding: 0.5rem;
    font-family: "Thasadith", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    width: 8rem !important;
    background-color: #283033;
    color: #ffff;
    border: none;
    cursor: pointer;
    :hover {
      background-color: #20aefa;
    }
  }
`;

const ButtonRed = styled.button`
  :hover {
    background-color: #cc0404 !important;
  }
`;

export { PostContainer, TextArea, CreatePostSection, ButtonRed };
