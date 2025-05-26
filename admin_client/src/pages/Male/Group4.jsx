
// import React, { useState, useEffect } from "react";

// function Group4() {
//   const [role, setRole] = useState("user"); // Change to "admin" to simulate admin access
//   const [challenges, setChallenges] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [tips, setTips] = useState([]);
//   const [newChallenge, setNewChallenge] = useState("");
//   const [newQuote, setNewQuote] = useState("");
//   const [newTip, setNewTip] = useState("");

//   // useEffect(() => {
//   //   // Fetch data from backend
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:5000/api/data");
//   //       const data = await response.json();
//   //       setChallenges(data.challenges || []);
//   //       setQuotes(data.quotes || []);
//   //       setTips(data.tips || []);
//   //     } catch (err) {
//   //       console.error("Error fetching data:", err);
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);

//   const handleAdd = async (type) => {
//     const payload = {
//       content: type === "challenge" ? newChallenge : type === "quote" ? newQuote : newTip,
//     };

//     try {
//       const response = await fetch(`http://localhost:5000/api/v1/group4`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (response.ok) {
//         if (type === "challenge") {
//           setChallenges([...challenges, payload.content]);
//           setNewChallenge("");
//         } else if (type === "quote") {
//           setQuotes([...quotes, payload.content]);
//           setNewQuote("");
//         } else {
//           setTips([...tips, payload.content]);
//           setNewTip("");
//         }
//       }
//     } catch (err) {
//       console.error(`Error adding ${type}:`, err);
//     }
//   };

//   const handleDelete = async (type, index) => {
//     const id = type === "challenge" ? challenges[index] : type === "quote" ? quotes[index] : tips[index];

//     try {
//       const response = await fetch(`http://localhost:5000/api/v1/group4`, { method: "DELETE" });
//       if (response.ok) {
//         if (type === "challenge") {
//           setChallenges(challenges.filter((_, i) => i !== index));
//         } else if (type === "quote") {
//           setQuotes(quotes.filter((_, i) => i !== index));
//         } else {
//           setTips(tips.filter((_, i) => i !== index));
//         }
//       }
//     } catch (err) {
//       console.error(`Error deleting ${type}:`, err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Group Management</h1>
//       <p>Welcome! You are logged in as <strong>{role}</strong>.</p>

//       {["challenge", "quote", "tip"].map((type) => (
//         <div key={type} className="mt-6">
//           <h2 className="text-xl font-bold capitalize">{type}s</h2>
//           {role === "admin" && (
//             <>
//               <input
//                 type="text"
//                 className="border rounded p-2 w-full mt-2"
//                 value={type === "challenge" ? newChallenge : type === "quote" ? newQuote : newTip}
//                 onChange={(e) =>
//                   type === "challenge"
//                     ? setNewChallenge(e.target.value)
//                     : type === "quote"
//                     ? setNewQuote(e.target.value)
//                     : setNewTip(e.target.value)
//                 }
//                 placeholder={`Add a new ${type}`}
//               />
//               <button
//                 onClick={() => handleAdd(type)}
//                 className="bg-blue-500 text-white p-2 rounded mt-2"
//               >
//                 Add {type}
//               </button>
//             </>
//           )}
//           <ul className="list-disc ml-6 mt-4">
//             {(type === "challenge" ? challenges : type === "quote" ? quotes : tips).map((item, index) => (
//               <li key={index} className="mb-2">
//                 {item}
//                 {role === "admin" && (
//                   <button
//                     onClick={() => handleDelete(type, index)}
//                     className="text-red-500 ml-4"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Group4;






import React, { useState, useEffect } from "react";

function Group4() {
  const [role, setRole] = useState("user");
  const [challenges, setChallenges] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [tips, setTips] = useState([]);
  const [newChallenge, setNewChallenge] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const [newTip, setNewTip] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/group4");
        const data = await response.json();
        setChallenges(data.challenges || []);
        setQuotes(data.quotes || []);
        setTips(data.tips || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async (type) => {
    const payload = {
      content: type === "challenge" ? newChallenge : type === "quote" ? newQuote : newTip,
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/addItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        if (type === "challenge") {
          setChallenges([...challenges, payload.content]);
          setNewChallenge("");
        } else if (type === "quote") {
          setQuotes([...quotes, payload.content]);
          setNewQuote("");
        } else {
          setTips([...tips, payload.content]);
          setNewTip("");
        }
      }
    } catch (err) {
      console.error(`Error adding ${type}:`, err);
    }
  };

  const handleDelete = async (type, index) => {
    const id = type === "challenge" ? challenges[index] : type === "quote" ? quotes[index] : tips[index];

    try {
      const response = await fetch(`http://localhost:5000/api/v1/deleteItem/${id}`, { method: "DELETE" });
      if (response.ok) {
        if (type === "challenge") {
          setChallenges(challenges.filter((_, i) => i !== index));
        } else if (type === "quote") {
          setQuotes(quotes.filter((_, i) => i !== index));
        } else {
          setTips(tips.filter((_, i) => i !== index));
        }
      }
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Group Management</h1>
      <p>Welcome! You are logged in as <strong>{role}</strong>.</p>

      {["challenge", "quote", "tip"].map((type) => (
        <div key={type} className="mt-6">
          <h2 className="text-xl font-bold capitalize">{type}s</h2>
          {role === "admin" && (
            <>
              <input
                type="text"
                className="border rounded p-2 w-full mt-2"
                value={type === "challenge" ? newChallenge : type === "quote" ? newQuote : newTip}
                onChange={(e) =>
                  type === "challenge"
                    ? setNewChallenge(e.target.value)
                    : type === "quote"
                    ? setNewQuote(e.target.value)
                    : setNewTip(e.target.value)
                }
                placeholder={`Add a new ${type}`}
              />
              <button
                onClick={() => handleAdd(type)}
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Add {type}
              </button>
            </>
          )}
          <ul className="list-disc ml-6 mt-4">
            {(type === "challenge" ? challenges : type === "quote" ? quotes : tips).map((item, index) => (
              <li key={index} className="mb-2">
                {item}
                {role === "admin" && (
                  <button
                    onClick={() => handleDelete(type, index)}
                    className="text-red-500 ml-4"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Group4;
