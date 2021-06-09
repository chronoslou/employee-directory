import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null);
  const [listOrder, setListOrder] = useState(1);

  //this function only run after the first
  //retrun then check dep list to see if should run again
  useEffect(async () => {
    const response = await axios.get(
      "https://randomuser.me/api/?results=200&nat=us"
    );
    console.log("employeeData: ", response.data.results);
    //set the state and triggers rerender of the componenet
    setEmployeeData(response.data.results);
    setFilteredEmployees(response.data.results);
  }, []);

  const renderEmployeeRows = () => {
    let result = null;
    if (filteredEmployees) {
      result = filteredEmployees.map(
        ({ login, picture, name, email, phone, gender, dob }) => {
          return (
            <tr key={login.uuid}>
              <th>
                <img src={picture.medium} />
              </th>
              <th>{`${name.first} ${name.last}`}</th>
              <th>{email}</th>
              <th>{phone}</th>
              <th>{gender}</th>
              <th>{dob.date}</th>
            </tr>
          );
        }
      );
    }
    return result;
  };

  const handleChange = (event) => {
    //get the userinput
    const userInput = event.target.value.toLowerCase();
    //filter the emplolyeedata
    const filteredEmployeeList = employeeData.filter((employee) =>
      employee.name.first.toLowerCase().includes(userInput)
    );
    //set the filtered state
    setFilteredEmployees(filteredEmployeeList);
  };

  const handleClick = () => {
    let sortedList = null;

    if (listOrder === 1) {
      //sort in accending order
      sortedList = filteredEmployees.sort((a, b) =>
        a.name.first.toLowerCase() > b.name.first.toLowerCase() ? 1 : -1
      );
      setListOrder(-1);
    } else {
      //sort in decending order
      sortedList = filteredEmployees.sort((a, b) =>
        a.name.first.toLowerCase() > b.name.first.toLowerCase() ? -1 : 1
      );
      setListOrder(1);
    }

    setFilteredEmployees(sortedList);
  };

  return (
    <div>
      <input id="search" onChange={handleChange} />
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th onClick={handleClick}>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>{renderEmployeeRows()}</tbody>
      </table>
    </div>
  );
};

export default Main;
