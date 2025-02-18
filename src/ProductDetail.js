import { useParams } from "react-router-dom";

const product_list = [
    {id: 1, name: '小吉', link:'/00001'},
    {id: 2, name: '小八貓', link:'/00002'},
    {id: 3, name: '烏薩奇', link:'/00003'}
]

function ProductDetail(){
    const {id} = useParams();
    const product = product_list.find(product => product.id === Number(id));

    function handle(){
        console.log(product);
    }

    return(
        <div>
            <h2>產品編號{id} &nbsp;&nbsp;&nbsp;{product.name}</h2>
            <img src={'/img' + product.link + '.png'} style={{width: '20em'}}/>
            <button onClick={handle}>加到購物車</button>
        </div>
    );
}

export default ProductDetail;