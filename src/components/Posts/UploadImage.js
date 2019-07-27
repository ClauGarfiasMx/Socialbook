import React, { Component } from "react";
import {
  UploadBtnWrapper,
  UploadBtn,
  ImagePreview,
  ErrorParagraph,
  HiddenInput,
  FlexDiv
} from "./styleUploadImage";

const INITIAL_STATE = {
  error: null,
  images: {}
};

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  uploadImageToParent() {
    this.props.uploadImage(this.state.images);
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
          this.uploadImageToParent();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  deleteImage() {
    this.setState({ images: {} });
    this.uploadImageToParent();
  }

  render() {
    return (
      <div>
        <div>
          <ImagePreview src={this.props.imageUrl} />
        </div>
        <div>
          <ErrorParagraph>{this.state.error}</ErrorParagraph>
        </div>
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
      </div>
    );
  }
}

export default UploadImage;
