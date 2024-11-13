import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Fetch saved candidates from localStorage
    const candidatesFromStorage = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidatesFromStorage);
  }, []); 

  return (
    <section>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate, index) => (
          <div key={index}>
            <img src={candidate.avatar_url} alt="Avatar" />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          </div>
        ))
      ) : (
        <p>No candidates have been accepted.</p>
      )}
    </section>
  );
};

export default SavedCandidates;
