import React, { useState } from "react";
import "./App.css";

const contestantsData = [
  { name: "Suresh", votes: 0, voters: [] },
  { name: "Deepank", votes: 0, voters: [] },
  { name: "Abhik", votes: 0, voters: [] },
];

function App() {
  const [contestants, setContestants] = useState(contestantsData);
  const [totalVotes, setTotalVotes] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [selectedContestant, setSelectedContestant] = useState("Suresh");
  const [voteCount, setVoteCount] = useState(1);

  const handleVoteSubmit = () => {
    const updatedContestants = contestants.map((contestant) => {
      if (contestant.name === selectedContestant) {
        return {
          ...contestant,
          votes: contestant.votes + voteCount,
          voters: [...contestant.voters, { name: voterName, count: voteCount }],
        };
      }
      return contestant;
    });

    setContestants(updatedContestants);
    setTotalVotes(totalVotes + voteCount);
    setModalVisible(false);
    resetForm();
  };

  const handleDeleteVoter = (contestantName, voterIndex) => {
    const updatedContestants = contestants.map((contestant) => {
      if (contestant.name === contestantName) {
        const voterToDelete = contestant.voters[voterIndex];
        return {
          ...contestant,
          votes: contestant.votes - voterToDelete.count,
          voters: contestant.voters.filter((_, index) => index !== voterIndex),
        };
      }
      return contestant;
    });

    setContestants(updatedContestants);
    setTotalVotes(
      totalVotes - contestants[contestantName].voters[voterIndex].count
    );
  };

  const resetForm = () => {
    setVoterName("");
    setVoteCount(1);
  };

  return (
    <div className="container">
      <h1>Class Monitor Vote</h1>
      <h2>Total Votes: {totalVotes}</h2>
      <button onClick={() => setModalVisible(true)} className="add-btn">
        Add New Vote
      </button>

      <div id="contestants">
        {contestants.map((contestant) => (
          <div className="contestant" key={contestant.name}>
            <h3>{contestant.name}</h3>
            <p>Total: {contestant.votes}</p>
            <div className="voters">
              {contestant.voters.map((voter, index) => (
                <div key={index} className="voter-entry">
                  <p>{`${voter.name}: ${voter.count}`}</p>
                  <button
                    onClick={() => handleDeleteVoter(contestant.name, index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>Add Vote</h2>
            <input
              type="text"
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
              placeholder="Your Name"
              required
            />
            <select
              value={selectedContestant}
              onChange={(e) => setSelectedContestant(e.target.value)}>
              {contestants.map((contestant) => (
                <option key={contestant.name} value={contestant.name}>
                  {contestant.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={voteCount}
              onChange={(e) => setVoteCount(Number(e.target.value))}
              placeholder="Vote Count"
              min="1"
              required
            />
            <button onClick={handleVoteSubmit}>Submit Vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
