import { useEffect, useState } from "react";

export default function Pagination(props) {
  function item_component(value) {
    let dots = "...";
    return (
      <div onClick={() => props.handlePageChange(value)}>
        <p
          className={`flex items-center justify-center px-3 py-1 text-colorTextGraySecond bg-colorBgSecondary border border-colorBorder rounded-lg dark:bg-colorBgThird cursor-pointer ${
            value === props.page ? "border-blue-100 border-2" : "hover:bg-colorBgThird hover:text-colorTextPrimary"
          }`}
        >
          {value}
        </p>
      </div>
    );
  }

  function paginate(current, max) {
    if (!current || !max) return null;

    let items = [item_component(1)];

    if (current === 1 && max === 1) return items;
    if (current > 4) items.push(item_component("…"));

    let r = 2,
      r1 = current - r,
      r2 = current + r;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++)
      items.push(item_component(i));

    if (r2 + 1 < max) items.push(item_component("…"));
    if (r2 < max) items.push(item_component(max));

    return items;
  }

  const [items, setItems] = useState([]);
  const current = props.page;

  paginate(props.page, props.total);
  useEffect(() => {
    console.log("paginate use effect");
    setItems(paginate(props.page, props.total));
  }, [current, props.total]);

  return (
    <div class="flex justify-start md:justify-end items-center text-sm gap-1">
      {items.map((item) => (
        <div key={item.index}>{item} </div>
      ))}
    </div>
  );
}
