import { Spinner } from "flowbite-react";

export default function DataTableLoading() {

    return(
        <div className="rounded-lg border border-colorBorder custom-shadow p-4 min-w-52 min-h-96 w-full flex justify-center items-center">

            <Spinner size="xl" className="text-gray-400" color="info"/>
        </div>
    )
}