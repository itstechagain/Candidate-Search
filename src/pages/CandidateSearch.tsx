import { useState, useEffect } from 'react';

import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [results, setResults] = useState<Candidate[]>([]);
  const [currentUser, setCurrentUser] = useState<Candidate>({
    id: null,
    login: null,
    email: null,
    html_url: null,
    name: null,
    bio: null,
    company: null,
    location: null,
    avatar_url: null,
  });
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const searchForSpecificUser = async (user: string) => {
    const data: Candidate = await searchGithubUser(user);

    setCurrentUser(data);
  };

  const searchForUsers = async () => {
    const data: Candidate[] = await searchGithub();

    setResults(data);

    await searchForSpecificUser(data[currentIdx].login || '');
  };

  const makeDecision = async (isSelected: boolean) => {
    if (isSelected) {
      let parsedCandidates: Candidate[] = [];
      const savedCandidates = localStorage.getItem('savedCandidates');
      if (typeof savedCandidates === 'string') {
        parsedCandidates = JSON.parse(savedCandidates);
      }
      parsedCandidates.push(currentUser);
      localStorage.setItem('savedCandidates', JSON.stringify(parsedCandidates));
    }
    if (currentIdx + 1 < results.length) {
      setCurrentIdx(currentIdx + 1);
      await searchForSpecificUser(results[currentIdx + 1].login || '');
    } else {
      setCurrentIdx(0);
      await searchForUsers();
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Dependency array is correct
  useEffect(() => {
    searchForUsers();
    searchForSpecificUser(currentUser.login || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Candidate Search</h1>
      <CandidateCard currentUser={currentUser} makeDecision={makeDecision} />
    </>
  );
};

export default CandidateSearch;
