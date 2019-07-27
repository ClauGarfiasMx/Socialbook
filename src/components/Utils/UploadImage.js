import React, { Component } from "react";
import * as Style from "./UploadImageStyles";

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

  componentDidReceiveProps() {
    this.setState({ images: { imageUrl: this.props.imageUrl } });
  }
  componentDidMount() {
    this.setState({ images: { imageUrl: this.props.imageUrl } });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.images.imageUrl && (
            <Style.ImagePreview src={this.props.imageUrl} />
          )}
        </div>
        <div>
          <Style.ErrorParagraph>{this.state.error}</Style.ErrorParagraph>
        </div>
        <Style.FlexDiv>
          {this.props.editMode && (
            <Style.UploadBtn delete onClick={this.deleteImage}>
              Delete Image
            </Style.UploadBtn>
          )}
          <Style.UploadBtnWrapper>
            <Style.UploadBtn>{this.props.buttonLabel}</Style.UploadBtn>
            <Style.HiddenInput
              type="file"
              accept="image/*"
              onChange={this.handleImageChange}
            />
          </Style.UploadBtnWrapper>
        </Style.FlexDiv>
      </div>
    );
  }
}

export default UploadImage;
