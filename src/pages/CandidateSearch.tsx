import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  // Fetch candidates when the page loads
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  // Update the current candidate whenever the index changes
  useEffect(() => {
    if (candidates.length > 0) {
      setCandidate(candidates[currentIndex]);
    }
  }, [currentIndex, candidates]);

  const moveToNextCandidate = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % candidates.length);
  };

  const moveToPrevCandidate = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + candidates.length) % candidates.length);
  };

  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      moveToNextCandidate();
    }
  };

  return (
    <section>
      {candidate ? (
        <>
          <div>
            <img src={candidate.avatar_url} alt="Avatar" />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          </div>
          <div>
            <button onClick={moveToPrevCandidate}>-</button>
            <button onClick={saveCandidate}>+</button>
            <button onClick={moveToNextCandidate}>Next</button>
          </div>
        </>
      ) : (
        <p>No more candidates available.</p>
      )}
    </section>
  );
};

export default CandidateSearch;
