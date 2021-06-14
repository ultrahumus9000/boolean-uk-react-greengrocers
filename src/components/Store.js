function Store({ product, addCartItemToServer }) {
  // console.log(product.id);

  function value(product) {
    if (product.amount < 1) return true;
    return false;
  }

  return (
    <li className={`list ${product.amount < 1 ? "unavailable" : "available"}`}>
      <div className="store--item-icon">
        <img src={`../icons/${product.id}.svg`} alt="beetroot" />
      </div>
      <p>£{product.price}</p>
      <p>{product.name}</p>
      <button
        disabled={value(product)}
        onClick={() => {
          let object = { id: product.id, quantity: 1 };
          addCartItemToServer(object);
        }}
      >
        Add to cart
      </button>
    </li>
  );
}
export default Store;
