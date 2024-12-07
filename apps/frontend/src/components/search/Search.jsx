import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <div className="mx-5 md:ml-5 md:w-1/4 rounded-lg">
      <form className="">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon className="text-gray-500" />
          </div>
          <div className="h-12 block w-full bg-colorBgSecondary rounded-lg border border-colorBorder">
            <input
              className="h-11 w-3/4 p-4 ps-10 text-lg text-colorTextPrimary bg-colorBgSecondary rounded-lg focus:outline-none"
              placeholder="Quick search..."
              required
            />
            <button className="text-white absolute end-0 bottom-0 m-1.5 bg-blue-100 hover:bg-blue-50 font-medium rounded-lg text-sm px-4 py-2">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
