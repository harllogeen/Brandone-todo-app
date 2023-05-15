import React from "react";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <ui key={id}>
            <li className="flex justify-between items-center self-center font-semibold pr-10 mr-6 grow  my-2 bg-white shadow-lg py-3 w-full rounded-lg">
              <div className="pl-4">{title}</div>

              <div>
                <button
                  type="button"
                  className=" bg-sky-950 text-white px-5 py-2 mx-1 rounded-md font-bold hover:bg-sky-800"
                  onClick={() => editItem(id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className=" bg-red-500 text-white p-2 mx-1 rounded-md font-bold hover:bg-red-600"
                  onClick={() => removeItem(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          </ui>
        );
      })}
    </div>
  );
};

export default List;
