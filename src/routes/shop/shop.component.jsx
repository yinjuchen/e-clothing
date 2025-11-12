
import { ProductsContext } from "../../context/shop.context"
import { useContext } from "react"
import ProductCard from "../../products-card/product-card.component"
import './shop.styles.scss'
const Shop  = () => {
  const {products} = useContext(ProductsContext)
  return (
    <div className="product-shop-continaer">
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))
      }
    </div>
  )
}

export default Shop