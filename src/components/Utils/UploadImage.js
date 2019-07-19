import React, { Component } from "react";
import styled, { css } from "styled-components";

const UploadBtnWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin: 0 auto;
`;

const UploadBtn = styled.button`
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

const ImagePreview = styled.img`
  max-width: 30%;
`;
const ErrorParagraph = styled.p`
  color: #ff0000;
  margin: 0 auto;
`;
const HiddenInput = styled.input`
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

const FlexDiv = styled.div`
  display: flex;
`;
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
          images: {}
        });
      } else if (!size) {
        this.setState({
          error: "Sorry, the file is too big",
          images: {}
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

  componentWillReceiveProps() {
    this.setState({ images: { imageUrl: this.props.imageUrl } });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.images.imageUrl && (
            <ImagePreview src={this.props.imageUrl} />
          )}
        </div>
        <div>
          <ErrorParagraph>{this.state.error}</ErrorParagraph>
        </div>
        <FlexDiv>
          {this.props.editMode && (
            <UploadBtn delete onClick={this.deleteImage}>
              Delete Image
            </UploadBtn>
          )}
          <UploadBtnWrapper>
            <UploadBtn>{this.props.buttonLabel}</UploadBtn>
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={this.handleImageChange}
            />
          </UploadBtnWrapper>
        </FlexDiv>
      </div>
    );
  }
}

export default UploadImage;
