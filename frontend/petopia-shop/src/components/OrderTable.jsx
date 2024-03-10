import React, { useRef } from "react";

const OrderTable = (props) => {
  
  {/* Get color for the status cell */}
  const getStatusColor = (status) => { 
    switch (status) {
      case 1:
        return "bg-green-200 text-green-500 border-green-500";
      case 2:
        return "text-blue-500";
      case 0:
        return "bg-red-200 text-red-400 border-red-400";
      default:
        return "text-gray-500";
    }
  };

  {/* Get text for the status cell */}
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Completed";
      case 2:
        return "Test";
      case 0:
        return "In Progress";
      default:
        return "Unknown";
    }
  };
  
  {/* The data of the table */}
  return ( 
          <tr>
            <td className="p-4">{props.orderId}</td>
            <td className="p-4">HK${props.orderTotal}</td>
            <td className="p-4">
              <span className={`${getStatusColor(props.orderStatus)} px-2 py-2 rounded-lg border`}>
                • {getStatusText(props.orderStatus)}
              </span>
            </td>
          </tr>
  );
  };

export default OrderTable;


