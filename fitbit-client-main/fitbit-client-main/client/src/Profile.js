// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Profile() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//     const token = localStorage.getItem("access_token"); // or the key you're using
//     if (!token) return console.error("Access token not found in localStorage");

//     axios.get("https://fitbit-app-backend.vercel.app/profile", {
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         withCredentials: true
//     })
//     .then(response => setData(response.data))
//     .catch(error => console.error("Error fetching profile:", error));
// }, []);


//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h1>Fitbit Profile</h1>
//             {data ? (
//                 <div>
//                     <h2>Name: {data.profile.user.fullName}</h2>
//                     <p>Age: {data.profile.user.age}</p>
//                     <p>Height: {data.profile.user.height} cm</p>
//                     <p>Weight: {data.profile.user.weight} kg</p>
//                     <p>Gender: {data.profile.user.gender}</p>
//                     <h2>Steps Today: {data.steps["activities-steps"]?.[0]?.value || "N/A"}</h2>
//                     <h2>Calories Burned Today: {data.calories.caloriesOut || "N/A"} kcal</h2>
//                     <h2>Distance Walked: {
//                         data.calories?.distances?.find(d => d.activity === "total")?.distance ?? "N/A"
//                     } km</h2>
//                     <h2>Running distance: {
//                         data.calories?.distances?.find(d => d.activity === "veryActive")?.distance ?? "N/A"
//                     } km</h2>
//                 <h2>Cycling: {
//                         data.calories?.distances?.find(d => d.activity === "moderatelyActive")?.distance ?? "N/A"
//                     } km</h2>

//                 <h2>Challenge Today:</h2>
// <p>Steps: {data.groupInfo.challenge?.steps}</p>
// <p>Calories Burned: {data.groupInfo.challenge?.caloriesBurned}</p>
// <p>Calories Running: {data.groupInfo.challenge?.caloriesRunning}</p>
// <p>Calories Cycling: {data.groupInfo.challenge?.caloriesCycling}</p>

// <h2>Motivational Quote:</h2>
// <p>{data.groupInfo.quote}</p>

// <h2>Tips:</h2>
// <p>Water Intake: {data.groupInfo.tips?.waterIntake} L</p>
// <p>Calorie Intake: {data.groupInfo.tips?.calorieIntake}</p>
// <p>Sleep Hours: {data.groupInfo.tips?.sleepHours}</p>
//  <p>Sleep Hours: {data.groupInfo.tips?.foodRecommendation}</p>

// <h2>Group Leaderboard:</h2>
// <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
//     <thead>
//         <tr>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rank</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Points</th>
//         </tr>
//     </thead>
//     <tbody>
//         {data.leaderboard.map((user, index) => (
//             <tr key={user.name}>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.name}</td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.point}</td>
//             </tr>
//         ))}
//     </tbody>
// </table>


//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }


// export default Profile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/joy/CircularProgress';
import { AiOutlineEye } from 'react-icons/ai';
import './profile.css';

function Profile() {
    const [data, setData] = useState(null);
    const [metrics, setMetrics] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) return console.error("Access token not found in localStorage");

        const fetchProfile = () => {
            axios.get("https://fitbit-app-backend.vercel.app/profile", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            })
                .then(response => {
                    const res = response.data;
                    setData(res);

                    // Log and sort leaderboard
                    const sorted = (res.leaderboard || []).sort((a, b) => b.point - a.point);
                    console.log("Fetched and sorted leaderboard:", sorted);
                    setLeaderboard(sorted);

                    const goals = res.groupInfo?.challenge || {};

                    const running = parseFloat(res.activities?.veryActive || 0);
                    const cycling = parseFloat(res.activities?.moderatelyActive || 0);
                    const steps = parseInt(res.steps?.["activities-steps"]?.[0]?.value || 0);

                    const temp = [
                        {
                            name: 'Calories Burned',
                            value: parseInt(res.calories?.caloriesOut || 0),
                            unit: 'kcal',
                            goal: parseInt(goals.caloriesBurned) || 2500,
                            goalUnit: 'kcal'
                        },
                        {
                            name: 'Running',
                            value: running,
                            unit: 'km',
                            goal: parseFloat(goals.caloriesRunning) || 5,
                            goalUnit: 'km'
                        },
                        {
                            name: 'Cycling',
                            value: cycling,
                            unit: 'km',
                            goal: parseFloat(goals.caloriesCycling) || 10,
                            goalUnit: 'km'
                        },
                        {
                            name: 'Steps',
                            value: steps,
                            unit: 'steps',
                            goal: parseInt(goals.steps) || 8000,
                            goalUnit: 'steps'
                        }
                    ];
                    setMetrics(temp);
                })
                .catch(error => console.error("Error fetching profile:", error));
        };

        fetchProfile(); // Initial fetch
        const intervalId = setInterval(fetchProfile, 60000); // Poll every 60s
        return () => clearInterval(intervalId);
    }, []);

    function simplifyFraction(numerator, denominator) {
        function gcd(a, b) {
            return b === 0 ? a : gcd(b, a % b);
        }
        const commonDivisor = gcd(numerator, denominator);
        return [Math.round(numerator / commonDivisor), Math.round(denominator / commonDivisor)];
    }

    return (
        <div className="main-layout">
            {!isMobile && (
                <div className="sidebar">
                    <h4>Leaderboard</h4>
                    {leaderboard.length > 0 ? (
                        <ol className="leaderboard-list">
                            {leaderboard.map((user, index) => (
                                <li key={index} className="leaderboard-item">
                                    <span className="leaderboard-rank">#{index + 1}</span>
                                    <span className="leaderboard-name">{user.name}</span>
                                    <span className="leaderboard-points">{user.point} pts</span>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p>Loading leaderboard...</p>
                    )}
                </div>
            )}

            <div className={`topbar ${isMobile ? 'mobile' : ''}`}>
                <div className="app-name">MyFitnessApp</div>
                <div className="nav-links">
                    <button onClick={() => window.location.href = "/about"}>About</button>
                    <button onClick={() => {
                        localStorage.removeItem("access_token");
                        window.location.href = "/login";
                    }}>Logout</button>
                </div>
            </div>

            {!isMobile && (
                <div className="right-box">
                    <h4>User Info</h4>
                    {data && data.profile && data.profile.user ? (
                        <ul>
                            <li><strong>Name:</strong> {data.profile.user.fullName}</li>
                            <li><strong>Age:</strong> {data.profile.user.age || "N/A"}</li>
                            <li><strong>Height:</strong> {data.profile.user.height} cm</li>
                            <li><strong>Weight:</strong> {data.profile.user.weight} kg</li>
                            <li><strong>Gender:</strong> {data.profile.user.gender}</li>
                        </ul>
                    ) : (
                        <p>Loading user info...</p>
                    )}
                </div>
            )}

            <div className={`content ${isMobile ? 'mobile' : ''}`}>
                {data ? (
                    <>
                        <div className="header-section">
                            <h2>Welcome, {data.profile.user.fullName}</h2>
                            {isMobile && (
                                <div className="mobile-user-info">
                                    <p><strong>Age:</strong> {data.profile.user.age || "N/A"} | <strong>Gender:</strong> {data.profile.user.gender}</p>
                                    <p><strong>Height:</strong> {data.profile.user.height} cm | <strong>Weight:</strong> {data.profile.user.weight} kg</p>
                                </div>
                            )}
                        </div>

                        <div className="meters">
                            {metrics.map((item, index) => (
                                <div className="card" key={index}>
                                    <div className="card-header">
                                        <div className="card-header-box">
                                            <div className="card-header-box-name">{item.name}</div>
                                            <div className="card-header-box-value">{item.value} {item.unit}</div>
                                        </div>
                                        <div className="card-header-box">
                                            <div className="card-header-box-name">Target</div>
                                            <div className="card-header-box-value">{item.goal} {item.goalUnit}</div>
                                        </div>
                                    </div>
                                    <CircularProgress
                                        color="neutral"
                                        determinate
                                        variant="solid"
                                        size="lg"
                                        value={(item.value / item.goal) * 100}
                                    >
                                        <span className="textincircle">
                                            {simplifyFraction(item.value, item.goal).join(' / ')}
                                        </span>
                                    </CircularProgress>
                                    <button onClick={() => window.location.href = `/report/${item.name}`}>
                                        Show Report <AiOutlineEye />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="tips-container">
                            <h3 className="tips-title">Health Tips</h3>
                            <div className="tips-grid">
                                {[
                                    { name: "Water Intake", tip: `You should drink at least ${data.groupInfo.tips?.waterIntake || 2.5} L of water.` },
                                    { name: "Calorie Intake", tip: `Try to burn at least ${data.groupInfo.tips?.calorieIntake || 500} kcal through exercise.` },
                                    { name: "Food", tip: `${data.groupInfo.tips?.foodRecommendation || "Maintain a balanced diet rich in proteins and fibers."}` },
                                    { name: "Sleep", tip: `Aim to sleep ${data.groupInfo.tips?.sleepHours || 7} hours for proper recovery.` },
                                ].map((item, idx) => (
                                    <div className="tip-card" key={idx}>
                                        <h4>{item.name}</h4>
                                        <p>{item.tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="quote-container">
                            <h3 className="quote-title">Motivational Quote</h3>
                            <blockquote className="motivational-quote">
                                {data.groupInfo?.quote || "Push yourself, because no one else is going to do it for you."}
                            </blockquote>
                        </div>
                    </>
                ) : (
                    <div className="loading-container">
                        <CircularProgress size="lg" />
                        <p>Loading your fitness data...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CircularProgress from '@mui/joy/CircularProgress';
// import { AiOutlineEye } from 'react-icons/ai';
// import './profile.css';

// function Profile() {
//     const [data, setData] = useState(null);
//     const [metrics, setMetrics] = useState([]);
//     const [leaderboard, setLeaderboard] = useState([]);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 768);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem("access_token");
//         if (!token) return console.error("Access token not found in localStorage");

//         axios.get("https://fitbit-app-backend.vercel.app/profile", {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true
//         })
//         .then(response => {
//             const res = response.data;
//             setData(res);
//             setLeaderboard(res.leaderboard || []);

//             const goals = res.groupInfo?.challenge || {};

//             const running = parseFloat(res.activities?.veryActive || 0);
//             const cycling = parseFloat(res.activities?.moderatelyActive || 0);
//             const steps = parseInt(res.steps?.["activities-steps"]?.[0]?.value || 0);

//             const temp = [
//                 {
//                     name: 'Calories Burned',
//                     value: parseInt(res.calories?.caloriesOut || 0),
//                     unit: 'kcal',
//                     goal: parseInt(goals.caloriesBurned) || 2500,
//                     goalUnit: 'kcal'
//                 },
//                 {
//                     name: 'Running',
//                     value: running,
//                     unit: 'km',
//                     goal: parseFloat(goals.caloriesRunning) || 5,
//                     goalUnit: 'km'
//                 },
//                 {
//                     name: 'Cycling',
//                     value: cycling,
//                     unit: 'km',
//                     goal: parseFloat(goals.caloriesCycling) || 10,
//                     goalUnit: 'km'
//                 },
//                 {
//                     name: 'Steps',
//                     value: steps,
//                     unit: 'steps',
//                     goal: parseInt(goals.steps) || 8000,
//                     goalUnit: 'steps'
//                 }
//             ];
//             setMetrics(temp);
//         })
//         .catch(error => console.error("Error fetching profile:", error));
//     }, []);

//     function simplifyFraction(numerator, denominator) {
//         function gcd(a, b) {
//             return b === 0 ? a : gcd(b, a % b);
//         }
//         const commonDivisor = gcd(numerator, denominator);
//         return [Math.round(numerator / commonDivisor), Math.round(denominator / commonDivisor)];
//     }

//     return (
//         <div className="main-layout">
//             {!isMobile && (
//                 <div className="sidebar">
//                     <h4>Leaderboard</h4>
//                     {leaderboard.length > 0 ? (
//                         <ol className="leaderboard-list">
//                             {leaderboard.map((user, index) => (
//                                 <li key={index} className="leaderboard-item">
//                                     <span className="leaderboard-rank">#{index + 1}</span>
//                                     <span className="leaderboard-name">{user.name}</span>
//                                     <span className="leaderboard-points">{user.point} pts</span>
//                                 </li>
//                             ))}
//                         </ol>
//                     ) : (
//                         <p>Loading leaderboard...</p>
//                     )}
//                 </div>
//             )}

//             <div className={`topbar ${isMobile ? 'mobile' : ''}`}>
//                 <div className="app-name">MyFitnessApp</div>
//                 <div className="nav-links">
//                     <button onClick={() => window.location.href = "/about"}>About</button>
//                     <button onClick={() => {
//                         localStorage.removeItem("access_token");
//                         window.location.href = "/login";
//                     }}>Logout</button>
//                 </div>
//             </div>

//             {!isMobile && (
//                 <div className="right-box">
//                     <h4>User Info</h4>
//                     {data && data.profile && data.profile.user ? (
//                         <ul>
//                             <li><strong>Name:</strong> {data.profile.user.fullName}</li>
//                             <li><strong>Age:</strong> {data.profile.user.age || "N/A"}</li>
//                             <li><strong>Height:</strong> {data.profile.user.height} cm</li>
//                             <li><strong>Weight:</strong> {data.profile.user.weight} kg</li>
//                             <li><strong>Gender:</strong> {data.profile.user.gender}</li>
//                         </ul>
//                     ) : (
//                         <p>Loading user info...</p>
//                     )}
//                 </div>
//             )}

//             <div className={`content ${isMobile ? 'mobile' : ''}`}>
//                 {data ? (
//                     <>
//                         <div className="header-section">
//                             <h2>Welcome, {data.profile.user.fullName}</h2>
//                             {isMobile && (
//                                 <div className="mobile-user-info">
//                                     <p><strong>Age:</strong> {data.profile.user.age || "N/A"} | <strong>Gender:</strong> {data.profile.user.gender}</p>
//                                     <p><strong>Height:</strong> {data.profile.user.height} cm | <strong>Weight:</strong> {data.profile.user.weight} kg</p>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="meters">
//                             {metrics.map((item, index) => (
//                                 <div className="card" key={index}>
//                                     <div className="card-header">
//                                         <div className="card-header-box">
//                                             <div className="card-header-box-name">{item.name}</div>
//                                             <div className="card-header-box-value">{item.value} {item.unit}</div>
//                                         </div>
//                                         <div className="card-header-box">
//                                             <div className="card-header-box-name">Target</div>
//                                             <div className="card-header-box-value">{item.goal} {item.goalUnit}</div>
//                                         </div>
//                                     </div>
//                                     <CircularProgress
//                                         color="neutral"
//                                         determinate
//                                         variant="solid"
//                                         size="lg"
//                                         value={(item.value / item.goal) * 100}
//                                     >
//                                         <span className="textincircle">
//                                             {simplifyFraction(item.value, item.goal).join(' / ')}
//                                         </span>
//                                     </CircularProgress>
//                                     <button onClick={() => window.location.href = `/report/${item.name}`}>
//                                         Show Report <AiOutlineEye />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="tips-container">
//                             <h3 className="tips-title">Health Tips</h3>
//                             <div className="tips-grid">
//                                 {[
//                                     { name: "Water Intake", tip: `You should drink at least ${data.groupInfo.tips?.waterIntake || 2.5} L of water.` },
//                                     { name: "Calorie Intake", tip: `Try to burn at least ${data.groupInfo.tips?.calorieIntake || 500} kcal through exercise.` },
//                                     { name: "Food", tip: `${data.groupInfo.tips?.foodRecommendation || "Maintain a balanced diet rich in proteins and fibers."}` },
//                                     { name: "Sleep", tip: `Aim to sleep ${data.groupInfo.tips?.sleepHours || 7} hours for proper recovery.` },
//                                 ].map((item, idx) => (
//                                     <div className="tip-card" key={idx}>
//                                         <h4>{item.name}</h4>
//                                         <p>{item.tip}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="quote-container">
//                             <h3 className="quote-title">Motivational Quote</h3>
//                             <blockquote className="motivational-quote">
//                                 {data.groupInfo?.quote || "Push yourself, because no one else is going to do it for you."}
//                             </blockquote>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="loading-container">
//                         <CircularProgress size="lg" />
//                         <p>Loading your fitness data...</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Profile;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CircularProgress from '@mui/joy/CircularProgress';
// import { AiOutlineEye } from 'react-icons/ai';
// import './profile.css';

// function Profile() {
//     const [data, setData] = useState(null);
//     const [metrics, setMetrics] = useState([]);
//     const [leaderboard, setLeaderboard] = useState([]);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem("access_token");
//         if (!token) return console.error("Access token not found in localStorage");

//         axios.get("https://fitbit-app-backend.vercel.app/profile", {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true
//         })
//         .then(response => {
//             const res = response.data;
//             setData(res);
//             setLeaderboard(res.leaderboard || []);

//             const goals = res.groupInfo?.challenge || {};

//             const running = parseFloat(res.activities?.veryActive || 0);
//             const cycling = parseFloat(res.activities?.moderatelyActive || 0);

//             const temp = [
//                 {
//                     name: 'Calories Burned',
//                     value: parseInt(res.calories?.caloriesOut || 0),
//                     unit: 'kcal',
//                     goal: parseInt(goals.caloriesBurned) || 2500,
//                     goalUnit: 'kcal'
//                 },
//                 {
//                     name: 'Running',
//                     value: running,
//                     unit: 'km',
//                     goal: parseFloat(goals.caloriesRunning) || 5,
//                     goalUnit: 'km'
//                 },
//                 {
//                     name: 'Cycling',
//                     value: cycling,
//                     unit: 'km',
//                     goal: parseFloat(goals.caloriesCycling) || 10,
//                     goalUnit: 'km'
//                 }
//             ];
//             setMetrics(temp);
//         })
//         .catch(error => console.error("Error fetching profile:", error));
//     }, []);

//     function simplifyFraction(numerator, denominator) {
//         function gcd(a, b) {
//             return b === 0 ? a : gcd(b, a % b);
//         }
//         const commonDivisor = gcd(numerator, denominator);
//         return [Math.round(numerator / commonDivisor), Math.round(denominator / commonDivisor)];
//     }

//     return (
//         <div className="main-layout">
//             {!isMobile && (
//                 <div className="sidebar">
//                     <h4>Leaderboard</h4>
//                     {leaderboard.length > 0 ? (
//                         <ol className="leaderboard-list">
//                             {leaderboard.map((user, index) => (
//                                 <li key={index} className="leaderboard-item">
//                                     <span className="leaderboard-rank">#{index + 1}</span>
//                                     <span className="leaderboard-name">{user.name}</span>
//                                     <span className="leaderboard-points">{user.point} pts</span>
//                                 </li>
//                             ))}
//                         </ol>
//                     ) : (
//                         <p>Loading leaderboard...</p>
//                     )}
//                 </div>
//             )}

//             <div className={`topbar ${isMobile ? 'mobile' : ''}`}>
//                 <div className="app-name">MyFitnessApp</div>
//                 <div className="nav-links">
//                     <button onClick={() => window.location.href = "/about"}>About</button>
//                     <button onClick={() => {
//                         localStorage.removeItem("access_token");
//                         window.location.href = "/login";
//                     }}>Logout</button>
//                 </div>
//             </div>

//             {!isMobile && (
//                 <div className="right-box">
//                     <h4>User Info</h4>
//                     {data && data.profile && data.profile.user ? (
//                         <ul>
//                             <li><strong>Name:</strong> {data.profile.user.fullName}</li>
//                             <li><strong>Age:</strong> {data.profile.user.age || "N/A"}</li>
//                             <li><strong>Height:</strong> {data.profile.user.height} cm</li>
//                             <li><strong>Weight:</strong> {data.profile.user.weight} kg</li>
//                             <li><strong>Gender:</strong> {data.profile.user.gender}</li>
//                         </ul>
//                     ) : (
//                         <p>Loading user info...</p>
//                     )}
//                 </div>
//             )}

//             <div className={`content ${isMobile ? 'mobile' : ''}`}>
//                 {data ? (
//                     <>
//                         <div className="header-section">
//                             <h2>Welcome, {data.profile.user.fullName}</h2>
//                             {isMobile && (
//                                 <div className="mobile-user-info">
//                                     <p><strong>Age:</strong> {data.profile.user.age || "N/A"} | <strong>Gender:</strong> {data.profile.user.gender}</p>
//                                     <p><strong>Height:</strong> {data.profile.user.height} cm | <strong>Weight:</strong> {data.profile.user.weight} kg</p>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="meters">
//                             {metrics.map((item, index) => (
//                                 <div className="card" key={index}>
//                                     <div className="card-header">
//                                         <div className="card-header-box">
//                                             <div className="card-header-box-name">{item.name}</div>
//                                             <div className="card-header-box-value">{item.value} {item.unit}</div>
//                                         </div>
//                                         <div className="card-header-box">
//                                             <div className="card-header-box-name">Target</div>
//                                             <div className="card-header-box-value">{item.goal} {item.goalUnit}</div>
//                                         </div>
//                                     </div>
//                                     <CircularProgress
//                                         color="neutral"
//                                         determinate
//                                         variant="solid"
//                                         size="lg"
//                                         value={(item.value / item.goal) * 100}
//                                     >
//                                         <span className="textincircle">
//                                             {simplifyFraction(item.value, item.goal).join(' / ')}
//                                         </span>
//                                     </CircularProgress>
//                                     <button onClick={() => window.location.href = `/report/${item.name}`}>
//                                         Show Report <AiOutlineEye />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="tips-container">
//                             <h3 className="tips-title">Health Tips</h3>
//                             <div className="tips-grid">
//                                 {[
//                                     { name: "Water Intake", tip: `You should drink at least ${data.groupInfo.tips?.waterIntake || 2.5} L of water.` },
//                                     { name: "Calorie Intake", tip: `Try to burn at least ${data.groupInfo.tips?.calorieIntake || 500} kcal through exercise.` },
//                                     { name: "Food", tip: `${data.groupInfo.tips?.foodRecommendation || "Maintain a balanced diet rich in proteins and fibers."}` },
//                                     { name: "Sleep", tip: `Aim to sleep ${data.groupInfo.tips?.sleepHours || 7} hours for proper recovery.` },
//                                 ].map((item, idx) => (
//                                     <div className="tip-card" key={idx}>
//                                         <h4>{item.name}</h4>
//                                         <p>{item.tip}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="loading-container">
//                         <CircularProgress size="lg" />
//                         <p>Loading your fitness data...</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Profile;















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CircularProgress from '@mui/joy/CircularProgress';
// import { AiOutlineEye } from 'react-icons/ai';
// import './profile.css';

// function Profile() {
//     const [data, setData] = useState(null);
//     const [metrics, setMetrics] = useState([]);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem("access_token");
//         if (!token) return console.error("Access token not found in localStorage");

    //     axios.get("https://fitbit-app-backend.vercel.app/profile", {
    //         headers: { Authorization: `Bearer ${token}` },
    //         withCredentials: true
    //     })
    //     .then(response => {
    //         const res = response.data;
    //         setData(res);
    //         const goals = res.groupInfo?.challenge || {};
    //         const temp = [
    //             { name: 'Calories Burned', value: parseInt(res.calories.caloriesOut || 0), unit: 'kcal', goal: parseInt(goals.caloriesBurned) || 2500, goalUnit: 'kcal' },
    //             { name: 'Running', value: parseFloat(res.calories?.distances?.find(d => d.activity === "veryActive")?.distance || 0), unit: 'km', goal: parseFloat(goals.caloriesRunning) || 5, goalUnit: 'km' },
    //             { name: 'Cycling', value: parseFloat(res.calories?.distances?.find(d => d.activity === "moderatelyActive")?.distance || 0), unit: 'km', goal: parseFloat(goals.caloriesCycling) || 10, goalUnit: 'km' },                
    //         ];
    //         setMetrics(temp);
    //     })
    //     .catch(error => console.error("Error fetching profile:", error));
    // }, []);

    // function simplifyFraction(numerator, denominator) {
    //     function gcd(a, b) {
    //         return b === 0 ? a : gcd(b, a % b);
    //     }
    //     const commonDivisor = gcd(numerator, denominator);
    //     return [Math.round(numerator / commonDivisor), Math.round(denominator / commonDivisor)];
    // }

    // return (
    //     <div className="main-layout">
    //         {!isMobile && <div className="sidebar">Leaderboard</div>}

    //         <div className={`topbar ${isMobile ? 'mobile' : ''}`}>
    //             <div className="app-name">MyFitnessApp</div>
    //             <div className="nav-links">
    //                 <button onClick={() => window.location.href = "/about"}>About</button>
    //                 <button onClick={() => {
    //                     localStorage.removeItem("access_token");
    //                     window.location.href = "/login";
    //                 }}>Logout</button>
    //             </div>
    //         </div>

            // {!isMobile && (
            //     <div className="right-box">
            //         <h4>User Info</h4>
            //         {data && data.profile && data.profile.user ? (
            //             <ul>
            //                 <li><strong>Name:</strong> {data.profile.user.fullName}</li>
            //                 <li><strong>Age:</strong> {data.profile.user.age || "N/A"}</li>
            //                 <li><strong>Height:</strong> {data.profile.user.height} cm</li>
            //                 <li><strong>Weight:</strong> {data.profile.user.weight} kg</li>
            //                 <li><strong>Gender:</strong> {data.profile.user.gender}</li>
            //             </ul>
            //         ) : (
            //             <p>Loading user info...</p>
            //         )}
            //     </div>
            // )}

            // <div className={`content ${isMobile ? 'mobile' : ''}`}>
            //     {data ? (
            //         <>
            //             <div className="header-section">
            //                 <h2>Welcome, {data.profile.user.fullName}</h2>
                        //     {isMobile && (
                        //         <div className="mobile-user-info">
                        //             <p><strong>Age:</strong> {data.profile.user.age || "N/A"} | <strong>Gender:</strong> {data.profile.user.gender}</p>
                        //             <p><strong>Height:</strong> {data.profile.user.height} cm | <strong>Weight:</strong> {data.profile.user.weight} kg</p>
                        //         </div>
                        //     )}
                        // </div>
                        
                        // <div className="meters">
                        //     {metrics.map((item, index) => (
                        //         <div className="card" key={index}>
                        //             <div className="card-header">
                        //                 <div className="card-header-box">
                        //                     <div className="card-header-box-name">{item.name}</div>
                        //                     <div className="card-header-box-value">{item.value} {item.unit}</div>
                        //                 </div>
                        //                 <div className="card-header-box">
                        //                     <div className="card-header-box-name">Target</div>
                        //                     <div className="card-header-box-value">{item.goal} {item.goalUnit}</div>
                        //                 </div>
                        //             </div>
                        //             <CircularProgress
                        //                 color="neutral"
                        //                 determinate
                        //                 variant="solid"
                        //                 size="lg"
                        //                 value={(item.value / item.goal) * 100}
                        //             >
                        //                 <span className="textincircle">
                        //                     {simplifyFraction(item.value, item.goal).join(' / ')}
                        //                 </span>
                        //             </CircularProgress>
                        //             <button onClick={() => window.location.href = `/report/${item.name}`}>
                        //                 Show Report <AiOutlineEye />
                        //             </button>
                        //         </div>
                        //     ))}
                        // </div>

                        // <div className="tips-container">
                        //     <h3 className="tips-title">Health Tips</h3>
                        //     <div className="tips-grid">
                        //         {[
                        //             { name: "Water Intake", tip: `You should drink at least ${data.groupInfo.tips?.waterIntake || 2.5} L of water.` },
                        //             { name: "Calorie Intake", tip: `Try to burn at least ${data.groupInfo.tips?.calorieIntake || 500} kcal through exercise.` },
                        //             { name: "Food", tip: `${data.groupInfo.tips?.foodRecommendation || "Maintain a balanced diet rich in proteins and fibers."}` },
                        //             { name: "Sleep", tip: `Aim to sleep ${data.groupInfo.tips?.sleepHours || 7} hours for proper recovery.` },
                        //         ].map((item, idx) => (
                        //             <div className="tip-card" key={idx}>
//                                         <h4>{item.name}</h4>
//                                         <p>{item.tip}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="loading-container">
//                         <CircularProgress size="lg" />
//                         <p>Loading your fitness data...</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Profile;

















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CircularProgress from '@mui/joy/CircularProgress';
// import { AiOutlineEye } from 'react-icons/ai';
// import './profile.css';

// function Profile() {
//     const [data, setData] = useState(null);
//     const [metrics, setMetrics] = useState([]);
//     const [leaderboard, setLeaderboard] = useState([]);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem("access_token");
//         if (!token) return console.error("Access token not found in localStorage");

//         axios.get("https://fitbit-app-backend.vercel.app/profile", {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true
//         })
//         .then(response => {
//             const res = response.data;
//             setData(res);
//             setLeaderboard(res.leaderboard || []);

//             const goals = res.groupInfo?.challenge || {};
//             const temp = [
//                 { name: 'Calories Burned', value: parseInt(res.calories.caloriesOut || 0), unit: 'kcal', goal: parseInt(goals.caloriesBurned) || 2500, goalUnit: 'kcal' },
//                 { name: 'Running', value: parseFloat(res.calories?.distances?.find(d => d.activity === "veryActive")?.distance || 0), unit: 'km', goal: parseFloat(goals.caloriesRunning) || 5, goalUnit: 'km' },
//                 { name: 'Cycling', value: parseFloat(res.calories?.distances?.find(d => d.activity === "moderatelyActive")?.distance || 0), unit: 'km', goal: parseFloat(goals.caloriesCycling) || 10, goalUnit: 'km' },                
//             ];
//             setMetrics(temp);
//         })
//         .catch(error => console.error("Error fetching profile:", error));
//     }, []);

//     function simplifyFraction(numerator, denominator) {
//         function gcd(a, b) {
//             return b === 0 ? a : gcd(b, a % b);
//         }
//         const commonDivisor = gcd(numerator, denominator);
//         return [Math.round(numerator / commonDivisor), Math.round(denominator / commonDivisor)];
//     }

//     return (
//         <div className="main-layout">
//             {!isMobile && (
//                 <div className="sidebar">
//                     <h4>Leaderboard</h4>
//                     {leaderboard.length > 0 ? (
//                         <ol className="leaderboard-list">
//                             {leaderboard.map((user, index) => (
//                                 <li key={index} className="leaderboard-item">
//                                     <span className="leaderboard-rank">#{index + 1}</span>
//                                     <span className="leaderboard-name">{user.name}</span>
//                                     <span className="leaderboard-points">{user.point} pts</span>
//                                 </li>
//                             ))}
//                         </ol>
//                     ) : (
//                         <p>Loading leaderboard...</p>
//                     )}
//                 </div>
//             )}

//             <div className={`topbar ${isMobile ? 'mobile' : ''}`}>
//                 <div className="app-name">MyFitnessApp</div>
//                 <div className="nav-links">
//                     <button onClick={() => window.location.href = "/about"}>About</button>
//                     <button onClick={() => {
//                         localStorage.removeItem("access_token");
//                         window.location.href = "/login";
//                     }}>Logout</button>
//                 </div>
//             </div>

//             {!isMobile && (
//                 <div className="right-box">
//                     <h4>User Info</h4>
//                     {data && data.profile && data.profile.user ? (
//                         <ul>
//                             <li><strong>Name:</strong> {data.profile.user.fullName}</li>
//                             <li><strong>Age:</strong> {data.profile.user.age || "N/A"}</li>
//                             <li><strong>Height:</strong> {data.profile.user.height} cm</li>
//                             <li><strong>Weight:</strong> {data.profile.user.weight} kg</li>
//                             <li><strong>Gender:</strong> {data.profile.user.gender}</li>
//                         </ul>
//                     ) : (
//                         <p>Loading user info...</p>
//                     )}
//                 </div>
//             )}

//             <div className={`content ${isMobile ? 'mobile' : ''}`}>
//                 {data ? (
//                     <>
//                         <div className="header-section">
//                             <h2>Welcome, {data.profile.user.fullName}</h2>
//                             {isMobile && (
//                                 <div className="mobile-user-info">
//                                     <p><strong>Age:</strong> {data.profile.user.age || "N/A"} | <strong>Gender:</strong> {data.profile.user.gender}</p>
//                                     <p><strong>Height:</strong> {data.profile.user.height} cm | <strong>Weight:</strong> {data.profile.user.weight} kg</p>
//                                 </div>
//                             )}
//                         </div>
                        
//                         <div className="meters">
//                             {metrics.map((item, index) => (
//                                 <div className="card" key={index}>
//                                     <div className="card-header">
//                                         <div className="card-header-box">
//                                             <div className="card-header-box-name">{item.name}</div>
//                                             <div className="card-header-box-value">{item.value} {item.unit}</div>
//                                         </div>
//                                         <div className="card-header-box">
//                                             <div className="card-header-box-name">Target</div>
//                                             <div className="card-header-box-value">{item.goal} {item.goalUnit}</div>
//                                         </div>
//                                     </div>
//                                     <CircularProgress
//                                         color="neutral"
//                                         determinate
//                                         variant="solid"
//                                         size="lg"
//                                         value={(item.value / item.goal) * 100}
//                                     >
//                                         <span className="textincircle">
//                                             {simplifyFraction(item.value, item.goal).join(' / ')}
//                                         </span>
//                                     </CircularProgress>
//                                     <button onClick={() => window.location.href = `/report/${item.name}`}>
//                                         Show Report <AiOutlineEye />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="tips-container">
//                             <h3 className="tips-title">Health Tips</h3>
//                             <div className="tips-grid">
//                                 {[
//                                     { name: "Water Intake", tip: `You should drink at least ${data.groupInfo.tips?.waterIntake || 2.5} L of water.` },
//                                     { name: "Calorie Intake", tip: `Try to burn at least ${data.groupInfo.tips?.calorieIntake || 500} kcal through exercise.` },
//                                     { name: "Food", tip: `${data.groupInfo.tips?.foodRecommendation || "Maintain a balanced diet rich in proteins and fibers."}` },
//                                     { name: "Sleep", tip: `Aim to sleep ${data.groupInfo.tips?.sleepHours || 7} hours for proper recovery.` },
//                                 ].map((item, idx) => (
//                                     <div className="tip-card" key={idx}>
//                                         <h4>{item.name}</h4>
//                                         <p>{item.tip}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="loading-container">
//                         <CircularProgress size="lg" />
//                         <p>Loading your fitness data...</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Profile;








