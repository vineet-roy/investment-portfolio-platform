import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function Widget(props) {
  return (
    <div className="flex-1 mt-10 hover:-translate-y-5 transition duration-500 min-w-52 max-w-fill">
      <div className="max-w-sm   rounded-lg custom-shadow bg-colorBgSecondary ">
        <div className="flex justify-center">
          <img
            className="w-24 h-24 rounded-full shadow-dark relative -top-14"
            src={props.image}
            alt=""
          />
        </div>
        <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-colorTextPrimary">
          {props.name} ${props.price}
        </h5>
        <div className="flex justify-center mb-2 font-normal text-colorTextGraySecond">
          <span className={props.isUp ? "text-green-200" : "text-red-100"}>
            {props.isUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {props.percent}%
          </span>
          <p className="ml-2">last week</p>
        </div>
      </div>
    </div>
  );
}
