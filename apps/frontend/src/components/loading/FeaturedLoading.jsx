import { Spinner } from "flowbite-react";

export default function FeaturedLoading() {
  return (
    <div className="flex-1 min-w-52 ">
      <div className="max-w-sm bg-colorBgSecondary rounded-lg custom-shadow p-4 md:p-6 h-96 flex justify-center items-center">
        <Spinner size="xl" className="text-gray-400" color="info"/>
      </div>
    </div>
  );
}
