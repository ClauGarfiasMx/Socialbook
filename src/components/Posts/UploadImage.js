import React from "react";
import styled from "styled-components";

const UploadBtnWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

const UploadBtn = styled.button`
  border: 1px solid gray;
  color: gray;
  background-color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 5px;
  font-size: 16px;
`;

const ImagePreview = styled.img`
  max-width: 30%;
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
`;
const UploadImage = props => {
  return (
    <div>
      <UploadBtnWrapper>
        <UploadBtn
        // type={"button"}
        // onClick={() => {
        //   document.getElementById("uploadFile").click();
        // }}
        >
          {props.buttonLabel}
        </UploadBtn>
        <HiddenInput
          // id={"uploadFile"}
          type="file"
          accept="image/*"
          onChange={props.handleImage}
        />
      </UploadBtnWrapper>
      <div>
        <ImagePreview src={props.imageUrl} />
      </div>
      <div>
        <ErrorParagraph>{props.error}</ErrorParagraph>
      </div>
    </div>
  );
};

// const UploadImageEdited = props => {
//   return (
//     <div>
//       <form>
//         <button
//           type={"button"}
//           onClick={() => {
//             document.getElementById("uploadFileEdited").click();
//           }}
//         >
//           {props.buttonLabel}
//         </button>
//         <HiddenInput
//           id={"uploadFileEdited"}
//           type="file"
//           accept="image/*"
//           onChange={props.handleImageEdit}
//         />
//       </form>
//       <ImagePreview src={props.imageUrl} />
//       <div>
//         <ErrorParagraph>{props.error}</ErrorParagraph>
//       </div>
//     </div>
//   );
// };

export { UploadImage /*UploadImageEdited*/ };
