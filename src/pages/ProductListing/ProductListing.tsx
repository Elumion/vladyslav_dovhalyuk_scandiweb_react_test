import React from "react";
import { connect } from "react-redux";
import { ProductCardProps } from "../../@types/ProductCardType";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../redux/ProductsReducer";
import { withRouter } from "../../withRouter";
import { CategoryName } from "./ProductsListing.styles";
import { QUERY_PRODUCTS } from "./query";

class ProductListing extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.props.productsUpdate({
      query: QUERY_PRODUCTS,
      name: this.props.params.categoryName,
    });
  }
  componentDidMount() {
    // console.log(this.props, this.state);
  }

  componentWillMount() {}

  shouldComponentUpdate() {
    if (!this.props?.products) return true;
    if (this.props.params.categoryName !== this.props.products.category.name) {
      this.props.productsUpdate({
        query: QUERY_PRODUCTS,
        name: this.props.params.categoryName,
      });
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    console.log(this.props.products);
  }

  renderPhotos(photosArr: { products: ProductCardProps[] }) {
    return photosArr?.products?.map((el) => (
      <ProductCard
        brand={el.brand}
        gallery={el.gallery}
        id={el.id}
        inStock={el.inStock}
        name={el.name}
        prices={el.prices}
        key={el.id}
      />
    ));
  }

  render(): React.ReactNode {
    return (
      <>
        <CategoryName>
          {`${this.props.params.categoryName[0].toUpperCase()}${this.props.params.categoryName.substr(
            1
          )}`}
        </CategoryName>
        <ul>{this.renderPhotos(this.props.products?.category)}</ul>
      </>
    );
  }
}

// Redux

function mapStateToProps(state: any, ownProps: any) {
  return {
    products: state.products.data,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    productsUpdate: (query: { query: string; name: string }) =>
      dispatch(fetchProducts(query)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductListing)
);