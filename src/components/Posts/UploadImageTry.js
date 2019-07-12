import React, { Component } from "react";
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
  ${props =>
    props.delete &&
    css`
      background: gray;
      border: none !important;
      color: white;
    `}
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
  margin: 0;
`;

const FlexDiv = styled.div`
  display: flex;
`;

class UploadImageTry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      images: {}
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    const fileTypes = ["jpg", "jpeg", "png", "gif"];
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      let extension = file.name
        .split(".")
        .pop()
        .toLowerCase();
      const isImage = fileTypes.indexOf(extension) > -1;

      const size = file.size < 1048487;
      if (!isImage) {
        this.setState({
          error: "Sorry, the file is not an image",
          images: { imageUrl: "" }
        });
      } else if (!size) {
        this.setState({
          error: "Sorry, the file is too big",
          images: { imageUrl: "" }
        });
      } else {
        this.setState({ error: null });
        reader.onloadend = () => {
          this.setState({
            error: null,
            images: { imageName: file.name, imageUrl: reader.result }
          });
          console.log(this.state.images);
          this.props.uploadImage(this.state.images);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  deleteImage() {
    this.setState({ images: {} });
  }
  render() {
    return (
      <div>
        <FlexDiv>
          <UploadBtnWrapper>
            <UploadBtn>{this.props.buttonLabel}</UploadBtn>
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={this.handleImageChange}
            />
          </UploadBtnWrapper>
          {this.props.editMode && (
            <UploadBtn delete onClick={this.deleteImage}>
              Delete Image
            </UploadBtn>
          )}
        </FlexDiv>
        <div>
          <ImagePreview src={this.state.images.imageUrl} />
        </div>
        <div>
          <ErrorParagraph>{this.state.error}</ErrorParagraph>
        </div>
      </div>
    );
  }
}

export default UploadImageTry;

// const UploadImage = props => {
//   return (
//     <div>
//       <FlexDiv>
//         <UploadBtnWrapper>
//           <UploadBtn>{props.buttonLabel}</UploadBtn>
//           <HiddenInput
//             type="file"
//             accept="image/*"
//             onChange={props.handleImage}
//           />
//         </UploadBtnWrapper>
//         {props.editMode && (
//           <UploadBtn delete onClick={props.deleteImage}>
//             Delete Image
//           </UploadBtn>
//         )}
//       </FlexDiv>
//       <div>
//         <ImagePreview src={props.imageUrl} />
//       </div>
//       <div>
//         <ErrorParagraph>{props.error}</ErrorParagraph>
//       </div>
//     </div>
//   );
// };

// export default UploadImage;
