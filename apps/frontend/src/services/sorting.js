function sorting(col, order, data, setOrder) {
    console.log(col, order, data, setOrder);
    if (order.direction === "ASC") {
      const sorted = [...data.results].sort((a, b) =>
        a[col].localeCompare(b[col], undefined, { numeric: true })
      );

      setOrder({
        key: col,
        direction: "DSC",
      });
      return sorted
    } else {
      const sorted = [...data.results].sort((a, b) =>
        b[col].localeCompare(a[col], undefined, { numeric: true })
      );

      setOrder({
        key: col,
        direction: "ASC",
      });
      return sorted
    }
  };

export default sorting;