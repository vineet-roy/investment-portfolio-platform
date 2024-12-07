import NewSidebar from "../sidebar/NewSidebar";

export default function NavButton() {
  return (
    <div className="fixed top-2 md:top-10 left-0 border border-colorBorder rounded-r-lg z-50 bg-colorBgSecondary md:w-20">
      <div className="p-3 pl-5 md:pl-10">
        <NewSidebar />
      </div>
    </div>
  );
}
