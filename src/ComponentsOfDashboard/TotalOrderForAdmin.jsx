import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function TotalOrderForAdmin() {
  const { totalOrderedItems, allItems, total } = useContext(AuthContext);

  return totalOrderedItems.length ? (
    <div
      className="mt-10 mb-10 pl-5"
      style={{
        maxHeight: "300px", // Set max height for vertical scrolling
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      <h1 className="text-center text-2xl">ORDER LIST</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <td></td>
              <td>Name</td>
              <td>Email</td>
              <td>Total Price</td>
              <td>Total Order</td>
              <th></th>
            </tr>
          </thead>
          <tbody className="p-10">
            {totalOrderedItems.map((item, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.userName}</td>
                <td>${item.totalPrice}</td>
                <td>{item.orderConfirmList?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <h1 className="font-secondFont text-center mt-20">NO ORDER</h1>
  );
}
