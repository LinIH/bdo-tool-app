import { use, useState } from "react";


const tradeitem = [
    {id: 1, name: '木材', price: 199},
    {id: 2, name: '鋼鐵', price: 333},
    {id: 3, name: '蘑菇', price: 66}
];

const tradeorigin = [
    {id: 1, name: '艾裴利亞港', dist: 16800},
    {id: 2, name: '卡爾佩恩', dist: 14500},
    {id: 3, name: '格拉納', dist: 18100}
]

const tradedestination = [
    {id:1, name: '瓦倫西亞'},
    {id:2, name: '爾提諾巴'}
]

function Cal(){
    const [item, setItem] = useState(1);
    const [total, setTotal] = useState(0);
    const [row, setRow] = useState([]);
    const [buff, setBuff] = useState(false);
    const [origin, setOrigin] = useState(1);


    const handleSelectedItem = (e) => {
        setItem(Number(e.target.value));
    }
    function handleAddRow(){
        const finditem = tradeitem.find(titem => titem.id === item);
        const tmpsubtotl = calculate_subtotal(finditem.price, 1 ,12000);
        const initOrigin = tradeorigin[0].name;
        const tmprow = {
            name: finditem.name, 
            price: finditem.price,
            pack: 1,
            origin: initOrigin,
            dist: 12000,
            subtotal: tmpsubtotl
        };
        const newRow = [...row, tmprow];
        setRow(newRow);
        setTotal(calculate(newRow, buff));
    }
    function handleRemoveRow(index){
        const tmprow = [...row]
        tmprow.splice(index, 1);
        setRow(tmprow);
        setTotal(calculate(tmprow, buff));
    }
    function handlePack(index, pack){
        const tmprow = [...row];
        tmprow[index].pack = Number(pack);
        console.log(tmprow[index].dist);
        tmprow[index].subtotal = calculate_subtotal(
                tmprow[index].price,
                tmprow[index].pack,
                tmprow[index].dist);
        setRow(tmprow);
        setTotal(calculate(tmprow, buff));
    }
    function handleBuff(e){
        console.log(e.target.checked);
        setBuff(e.target.checked);
        setTotal(calculate(row, e.target.checked));
    }
    function handleSelectedOrigin(value, index) {
        setOrigin(Number(value));

        const tmprow = [...row];
        const findOrigin = tradeorigin.find(torigin => torigin.id === Number(value));
        tmprow[index].dist = findOrigin.dist;
        tmprow[index].subtotal = calculate_subtotal(
            tmprow[index].price, tmprow[index].pack, tmprow[index].dist
        );
        setRow(tmprow);
        setTotal(calculate(tmprow, buff));
    }

    function calculate_subtotal(price, pack, dist){
        return price * pack * dist;
    }

    function calculate(in_row, in_buff){
        console.log('cal: ' + in_buff)
        let tmptotal = 0;
        in_row.forEach(r => {
            tmptotal += r.subtotal;
        });
        if(in_buff){
            tmptotal = tmptotal * 3 / 2;
        }
        return tmptotal;
    }

    return(
        <>
        <div>
            <label>貿易品</label>
            <select onChange={handleSelectedItem} value={item}>
                {tradeitem.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                ))}
            </select>
            <button onClick={handleAddRow}>+</button>
            <label>總計</label>
            <label>{total / 10000}</label>
        </div>
        <div>
            <label>貿易地</label>
            <input type="checkbox" onChange={handleBuff}/>
            <label>綠洲buff</label>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>貿易品</td>
                        <td>單價</td>
                        <td>數量</td>
                        <td>產地</td>
                        <td>距離加成</td>
                        <td>小計</td>
                    </tr>
                </thead>
                <tbody>
                    {row.map((r, index) => (
                        <tr key={index}>
                            <td><button onClick={() => handleRemoveRow(index)}>x</button></td>
                            <td>{r.name}</td>
                            <td>{r.price}</td>
                            <td>
                                <input 
                                type="number" 
                                min={1} 
                                value={r.pack} 
                                onChange={(e) => handlePack(index, e.target.value)}/>
                            </td>
                            <td>
                                <select onChange={(e) => handleSelectedOrigin(e.target.value, index)}>
                                    {tradeorigin.map((origin, index) => (
                                        <option key={index} value={origin.id}>{origin.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td>{r.dist / 10000}</td>
                            <td>{r.subtotal / 10000}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        </>
    )
}

export default Cal;