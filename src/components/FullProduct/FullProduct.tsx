import React from "react";
import { AttributeType, ProductCardProps } from "../../@types/ProductTypes";
import AttributeButton from "../AttributeButton";
import { FullProductContainer } from "./FullProduct.styles";

interface Props {
  product: ProductCardProps;
  currency: { label: string | undefined };
  checkedItems: any;
  count: number | undefined;
  isFullSize?: boolean;
  setAttribute: (productId: string, attributes: AttributeType) => void;
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

const arrow: string = require("../../assets/CaretLeft.svg").default;

class FullProduct extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedImg: this.props.product.gallery[0],
    };
  }

  dispatchAttribute(attribute: AttributeType) {
    if (this.props.product.storeId)
      this.props.setAttribute(this.props.product.storeId, attribute);
  }

  renderAttributes(attributesArr: AttributeType[] | undefined) {
    if (typeof attributesArr === "undefined") return null;
    return attributesArr.map((el, index) => {
      return (
        <li key={el.id} className="attributes__item">
          <p className="attribute__name">{el.name}:</p>
          <ul className="buttons">
            {el.items.map((item) => {
              // debugger;
              return (
                <li key={item.id} className="buttons__item">
                  {" "}
                  <AttributeButton
                    parentId={el.id}
                    parentName={el.name}
                    parentType={el.type}
                    setAttribute={(attribute) =>
                      this.dispatchAttribute(attribute)
                    }
                    isChecked={
                      item.id === this.props.checkedItems[index].items.id
                    }
                    displayValue={item.displayValue}
                    isSwatch={el.type === "swatch"}
                    key={item.id}
                    value={item.value}
                    id={item.id}
                    isFullSize={this.props.isFullSize}
                  />{" "}
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  }

  setNextimg = () => {
    const { gallery } = this.props.product;
    const { selectedImg } = this.state;
    const index = gallery.indexOf(selectedImg);
    const nextImg = gallery[index + 1] || gallery[0];
    this.setState({ selectedImg: nextImg });
  };

  setPrevimg = () => {
    const { gallery } = this.props.product;
    const { selectedImg } = this.state;
    const index = gallery.indexOf(selectedImg);
    const prevImg = gallery[index - 1] || gallery[gallery.length - 1];
    this.setState({ selectedImg: prevImg });
  };

  render() {
    const selectedPrice = this.props.product.prices.filter(
      (el) => el.currency.label === this.props.currency.label
    )[0];

    return (
      <FullProductContainer
        className={this.props.isFullSize ? "full-size" : ""}
      >
        <div className={`product__info`}>
          <p className="product__name">
            {this.props.product.brand}
            <br />
            <span>{this.props.product.name}</span>
          </p>
          <p className="price">
            {selectedPrice.currency.symbol}
            {selectedPrice.amount}
          </p>
          <ul className="attributes">
            {this.renderAttributes(this.props.product.attributes)}
          </ul>
        </div>
        <div className="counter">
          <button
            className="counter__button plus"
            onClick={() =>
              this.props.addProduct(
                this.props.product.storeId ? this.props.product.storeId : ""
              )
            }
          ></button>
          {this.props.count}
          <button
            className="counter__button minus"
            onClick={() =>
              this.props.removeProduct(
                this.props.product.storeId ? this.props.product.storeId : ""
              )
            }
          ></button>
        </div>
        {!this.props.isFullSize ? (
          <img
            className="product__image"
            src={this.props.product.gallery[0]}
            alt={this.props.product.name}
            width={121}
          />
        ) : (
          <div className="img-slider__container">
            <img
              className="product__image"
              src={this.state.selectedImg}
              alt={this.state.selectedImg}
              width={121}
            />
            {this.props.product.gallery.length > 1 && (
              <div className="slider-btns__container">
                <button className="slider__btn" onClick={this.setPrevimg}>
                  <img className="arrow__rotate" src={arrow} alt={arrow} />
                </button>
                <button className="slider__btn" onClick={this.setNextimg}>
                  <img src={arrow} alt={arrow} />
                </button>
              </div>
            )}
          </div>
        )}
      </FullProductContainer>
    );
  }
}

export default FullProduct;
