import { Container } from 'react-bootstrap';
import Product from './Product';

const ProductsList = ({ searchTerm, products, handleQuantityChange }) => {
  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : products;

  if (filteredProducts.length === 0) {
    return <h1 className="display-1">No Items Found</h1>
  }

  else {
    return (
      <div style={{backgroundImage: 'linear-gradient(to bottom, #e6e6fa, #4b0082)'}}>
        <Container>
          <h1 className="display-1 text-center">Silly Store</h1>
          <div className="row row-cols-4">
            {filteredProducts.map((product) => (
              <div className="col" key={product._id}>
                <Product product={product} onQuantityChange={handleQuantityChange} />
              </div>
            ))}
          </div>
        </Container>
      </div>

    );
  }


};

export default ProductsList;