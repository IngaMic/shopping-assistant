import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Matches() {
    // let finalPrice = useSelector((state) => state.finalPrice);
    const [items, setItems] = useState([]);
    let [final, setFinal] = useState(0);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        //console.log("useEffect is running!");//runs when the component mounts
        (async () => {
            try {
                const resp = await axios.get("/api/matches", {
                    params: { cd: "60784" }, //fix this here
                });
                console.log("resp.data :", resp.data.items);
                setItems(resp.data.items);
                let final = 0;
                for (var index = 0; index < resp.data.items.length; index++) {
                    final += resp.data.items[index].price;
                    setFinal(final);
                }
                console.log("final price  :", final);
            } catch (err) {
                console.log("err : ", err);
            }
        })();
    }, []);
    if (!items) {
        return null;
    }
    const matches = (
        <div className="matches">
            {items.map((item) => (
                <div className="match" key={item.id}>
                    <img
                        id="match-img"
                        src={item.imageurl}
                        alt="{item.name}"
                        width="300"
                        height="350"
                    ></img>
                    <p id="match-text">
                        {item.name}_{item.price} eur
                    </p>
                </div>
            ))}
        </div>
    );
    return (
        <div id="hot">
            {!items.length && <div>No Matches Yet!</div>}
            {!!items.length && matches}
            {final > 0 && (
                <div>
                    <p>Price of all items together : {final} euro</p>
                </div>
            )}
        </div>
    );
}