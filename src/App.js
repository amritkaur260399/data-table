import React, { useState, useEffect } from "react";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [currentSortField, setCurrentSortField] = useState(null);

  // Function to fetch data from the JSONPlaceholder API
  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  };

  // Function to sort the table by the specified field
  const sortTable = (field) => {
    const sortedData = [...userData].sort((a, b) => {
      const valueA = field === "company" ? a[field].name : a[field];
      const valueB = field === "company" ? b[field].name : b[field];

      if (field === "name" || field === "email" || field === "city") {
        return valueA.localeCompare(valueB);
      } else {
        return valueA - valueB;
      }
    });

    setUserData(sortedData);
    setCurrentSortField(field);

    // Update the URL query string
    const params = new URLSearchParams(window.location.search);
    params.set("sort", field);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  // Function to generate the table rows
  const generateTableRows = () => {
    return userData.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.address.city}</td>
        <td>{user.company.name}</td>
      </tr>
    ));
  };

  // Fetch data and sort on initial render or when sort parameter changes
  useEffect(() => {
    fetchData().then((data) => {
      setUserData(data);

      const params = new URLSearchParams(window.location.search);
      const sortParam = params.get("sort");

      if (sortParam && !currentSortField) {
        sortTable(sortParam);
      } else {
        // Check local storage for sorting information
        const storedSortField = localStorage.getItem("sortField");
        if (storedSortField && !currentSortField) {
          sortTable(storedSortField);
        }
      }
    });
  }, [currentSortField]);

  // Update local storage when sorting state changes
  useEffect(() => {
    if (currentSortField) {
      localStorage.setItem("sortField", currentSortField);
    }
  }, [currentSortField]);

  return (
    <div>
      <table id="data-table">
        <thead>
          <tr>
            <th onClick={() => sortTable("name")}>Name</th>
            <th onClick={() => sortTable("email")}>Email</th>
            <th onClick={() => sortTable("city")}>City</th>
            <th onClick={() => sortTable("company")}>Company</th>
          </tr>
        </thead>
        <tbody>{generateTableRows()}</tbody>
      </table>
    </div>
  );
};

export default App;
// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [userData, setUserData] = useState([]);
//   const [currentSortField, setCurrentSortField] = useState(null);

//   // Function to fetch data from the JSONPlaceholder API
//   const fetchData = async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await response.json();
//     return data;
//   };

//   // Function to sort the table by the specified field
//   const sortTable = (field) => {
//     const sortedData = [...userData].sort((a, b) => {
//       const valueA = field === "company" ? a[field].name : a[field];
//       const valueB = field === "company" ? b[field].name : b[field];

//       if (field === "name" || field === "email" || field === "city") {
//         return valueA.localeCompare(valueB);
//       } else {
//         return valueA - valueB;
//       }
//     });

//     setUserData(sortedData);
//     setCurrentSortField(field);

//     // Update the URL query string
//     const params = new URLSearchParams(window.location.search);
//     if (field !== currentSortField) {
//       params.set("sort", field);
//       window.history.replaceState(
//         {},
//         "",
//         `${window.location.pathname}?${params}`
//       );
//     } else {
//       params.delete("sort");
//       window.history.replaceState(
//         {},
//         "",
//         `${window.location.pathname}?${params}`
//       );
//     }
//   };

//   // Function to generate the table rows
//   const generateTableRows = () => {
//     return userData.map((user) => (
//       <tr key={user.id}>
//         <td>{user.name}</td>
//         <td>{user.email}</td>
//         <td>{user.address.city}</td>
//         <td>{user.company.name}</td>
//       </tr>
//     ));
//   };

//   // Fetch data on initial render
//   useEffect(() => {
//     fetchData().then((data) => {
//       setUserData(data);

//       const params = new URLSearchParams(window.location.search);
//       const sortParam = params.get("sort");
//       if (sortParam) {
//         setCurrentSortField(sortParam);
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <table id="data-table">
//         <thead>
//           <tr>
//             <th onClick={() => sortTable("name")}>Name</th>
//             <th onClick={() => sortTable("email")}>Email</th>
//             <th onClick={() => sortTable("city")}>City</th>
//             <th onClick={() => sortTable("company")}>Company</th>
//           </tr>
//         </thead>
//         <tbody>{generateTableRows()}</tbody>
//       </table>
//     </div>
//   );
// };

// export default App;
