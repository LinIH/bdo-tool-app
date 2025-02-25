import { Link, Route, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail";

const product_list = [
    {id: 1, name: '小吉', link:'/00001'},
    {id: 2, name: '小八貓', link:'/00002'},
    {id: 3, name: '烏薩奇', link:'/00003'}
]
function Product(){

    return(
        <div>
            <ul style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1em'}}>
                {product_list.map((product, index) => (
                    <li key={index} style={{display: 'flex', flexDirection: 'column'}}>
                        <Link to={'/product/' + product.id} style={{display: 'flex', flexDirection: 'column'}} >
                            <img src={'./img' + product.link + '.png'} style={{width: '10em'}}/>
                            <label>{product.name}</label>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Product;