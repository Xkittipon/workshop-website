import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const getCategory = useEcomStore((state) => state.getCategory);
  const category = useEcomStore((state) => state.category);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);

  const [price, setPrice] = useState([0, 30000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };
  //console.log(categorySelected);

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);
  const handlePrice = (value) => {
    //console.log(value);
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search Product</h1>

      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="search product"
        className="border rounded-sm w-full mb-4 px-2"
      />
      <hr />
      {/*search by category*/}
      <div>
        <h1 className="">Product Category</h1>
        <div>
          {category.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <input type="checkbox" value={item.id} onChange={handleCheck} />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      {/* Search by Price */}
      <hr />
      <div>
        <h1>Price</h1>
        <div>
          <div className="flex justify-between">
            <span>Min: {numberFormat(price[0])}</span>
            <span>Max: {numberFormat(price[1])}</span>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={50000}
            defaultValue={[0, 30000]}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
