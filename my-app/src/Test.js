import React from "react";

function Test(props) {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{textAlign:'center'}}>Student Array of Objects</h2>
      <div style={{ 
        border: "2px solid #333", 
        borderRadius: "8px", 
        padding: "20px",
        backgroundColor: "#f9f9f9"
      }}>
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {props.data && props.data.map((student, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Test;

/*import React from 'react'
import {useState} from 'react'
import './Counter.css'

const TicketBookingSystem = () => {
  // Step 1: Starting State
  const [ticket, setTicket] = useState({
    event: "React Developer Conference",
    row: "A",
    seatNumber: "",
    isVIP: false
  });

  // Step 2: Destructuring
  const { event, row, seatNumber, isVIP } = ticket;

  // Step 4: Handle Seat Number (Spread Operator)
  const handleSeatChange = (e) => {
    setTicket({
      ...ticket,
      seatNumber: e.target.value
    });
  };

  // Step 5: Handle VIP Toggle (Spread Operator)
  const handleVIPToggle = (e) => {
    setTicket({
      ...ticket,
      isVIP: e.target.checked
    });
  };

  return (
    <div className='body'>
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'sans-serif'}}>
      {/* Step 3: Layout / Form Controls */
    /*  <section style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Seat Number: </label>
          <input 
            type="text" 
            value={seatNumber} 
            onChange={handleSeatChange} 
            placeholder="e.g. 12"
          />
        </div>

        <div>
          <input 
            type="checkbox" 
            id="vip-check" 
            checked={isVIP} 
            onChange={handleVIPToggle} 
          />
          <label htmlFor="vip-check"> Make it a VIP Ticket</label>
        </div>
      </section>

      {/* Step 5: Dynamic Styling (Conditional Rendering) */
     /* <div className={isVIP ? "golden-border" : "regular-border"}>
        <h2>Ticket Summary</h2>
        {/* Step 2: Show Data */
       /* <h3>{event}</h3>
        <p>Row: {row} | Seat: {seatNumber || "Not selected"}</p>
        {isVIP && <p style={{ color: 'gold', fontWeight: 'bold' }}>✨ VIP ACCESS GRANTED ✨</p>}
      </div>
    </div>
    </div>
  );
};


  

export default TicketBookingSystem*/
  