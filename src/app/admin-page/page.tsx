/* eslint-disable jsx-a11y/label-has-associated-control */
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function CreateProduct() {
  return (
    <div className="m-12 p-5 flex justify-center items-center border border-gray-900/10 pb-12 rounded">
      <form>
        <div className="space-y-12">
          <h2 className="text-3xl font-semibold leading-7 text-blue-500">Create Product</h2>
          <p className="text-sm leading-6 text-gray-600">
            Fill all the details to create a new product.
          </p>

          <div className="mt-10 grid  gap-x-48 gap-y-10 grid-cols-2">
            <div className="flex items-center gap-5 justify-between">
              <label
                htmlFor="Product ID"
                className=" block text-sm font-medium leading-6 text-gray-900"
              >
                Product ID :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input
                    type="text"
                    name="Product ID"
                    id="Product ID"
                    autoComplete="Product ID"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 justify-between">
              <label htmlFor="Title" className="block text-sm font-medium leading-6 text-gray-900">
                Title :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input
                    type="text"
                    name="Title"
                    id="Title"
                    autoComplete="Title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 justify-between">
              <label
                htmlFor="Description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input
                    type="text"
                    name="Description"
                    id="Description"
                    autoComplete="Description"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <label htmlFor="Price" className="block text-sm font-medium leading-6 text-gray-900">
                Price :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input
                    type="text"
                    name="Price"
                    id="Price"
                    autoComplete="Price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <label htmlFor="Rating" className="block text-sm font-medium leading-6 text-gray-900">
                Rating :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input
                    type="text"
                    name="Rating"
                    id="Rating"
                    autoComplete="Rating"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <label
                htmlFor="Gradient From"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gradient From :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input
                    type="text"
                    name="Gradient From"
                    id="Gradient From"
                    autoComplete="Gradient From"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <label
                htmlFor="Gradient To"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gradient To :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input
                    type="text"
                    name="Gradient To"
                    id="Gradient To"
                    autoComplete="Gradient To"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <label
                htmlFor="Shadow Color"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Shadow Color :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input
                    type="text"
                    name="Shadow Color"
                    id="Shadow Color"
                    autoComplete="Shadow Color"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="Image" className="block text-sm font-medium leading-6 text-gray-900">
                Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a Image</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-5 justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
