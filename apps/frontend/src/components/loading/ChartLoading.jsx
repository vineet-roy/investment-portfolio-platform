import { Spinner } from "flowbite-react";

export default function ChartLoading() {
  return (
    <div className="flex-3 bg-colorBgSecondary rounded-lg custom-shadow p-4 min-w-52 min-h-96 w-full flex justify-center items-center">

        <Spinner size="xl" className="text-gray-400" color="info"/>

    </div>
  );
}
