import type { Candidate } from '../interfaces/Candidate.interface';
import { IoRemoveCircle } from 'react-icons/io5';

// To be rendered in the SavedCandidateList
type SavedCandidateProps = {
  candidate: Candidate;
  rejectCandidate: (id: number) => void;
};
const SavedCandidate = ({
  candidate,
  rejectCandidate,
}: SavedCandidateProps) => {
  return (
    <tr>
      {candidate ? (
        <>
          <td>
            <img
              src={`${candidate.avatar_url}`}
              alt={`Profile of ${candidate.login}`}
              style={{
                width: '70px',
                borderRadius: '10px',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </td>
          <td>
            <a href={candidate.html_url || ''} target='_blank' rel='noreferrer'>
              <h3 style={{ color: 'white' }}>
                {candidate.name}
                <br />
                <em>({candidate.login})</em>
              </h3>
            </a>
          </td>
          <td>{candidate.location}</td>
          <td>
            <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
          </td>
          <td>{candidate.company}</td>
          <td>
            <div style={{ maxHeight: '100px', overflowY: 'scroll' }}>
              {candidate.bio}
            </div>
          </td>
          <td>
            <IoRemoveCircle
              style={{
                color: 'red',
                margin: '0 auto',
                display: 'block',
                cursor: 'pointer',
                fontSize: '50px',
              }}
              onClick={() => rejectCandidate(candidate.id || 0)}
            />
          </td>
        </>
      ) : (
        <h2>No Candidates at this time</h2>
      )}
    </tr>
  );
};

export default SavedCandidate;
