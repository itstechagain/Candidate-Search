import { useEffect, useState } from 'react';
import SavedCandidate from './SavedCandidate';
import type { Candidate } from '../interfaces/Candidate.interface';

// Map over the savedCandidates array in local storage and render a SavedCandidate card for each candidate.
const SavedCandidateList = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(
    []
  );

  useEffect(() => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    let candidates: Candidate[] = [];
    if (typeof savedCandidates === 'string') {
      candidates = JSON.parse(savedCandidates);
    }
    setPotentialCandidates(candidates);
  }, []);
  const rejectCandidate = (id: number) => {
    let parsedCandidates: Candidate[] = [];
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (typeof savedCandidates === 'string') {
      parsedCandidates = JSON.parse(savedCandidates);
    }
    parsedCandidates = parsedCandidates.filter(
      (person: Candidate) => person.id !== id
    );
    localStorage.setItem('savedCandidates', JSON.stringify(parsedCandidates));
    setPotentialCandidates(parsedCandidates);
  };
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
        {potentialCandidates.map((candidate) => (
          <SavedCandidate
            key={candidate.id}
            candidate={candidate}
            rejectCandidate={rejectCandidate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SavedCandidateList;
