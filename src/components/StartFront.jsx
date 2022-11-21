import { useState, useRef, useEffect } from 'react';

const StartFront = ({ startMeet }) => {
  const [meetname, setMeetname] = useState('');
  const [username, setUsername] = useState('');
  const [errorm, setErrorM] = useState('');
  const [erroru, setErrorU] = useState('');

  const handleStartMeeting = (isHost) => {
    if (meetname.length < 5 || username.length < 4) {
      if (meetname.length < 5) {
        setErrorM('Meeting title should be more than 5 letter');
      }
      if (username.length < 4) {
        setErrorU('Username should be more than 4 letter');
      }
      return;
    }
    startMeet({ meetname, username, isHost }, (status) => {
      if (status) {
        setMeetname('');
        setUsername('');
        setErrorM('');
        setErrorU('');
      }
    });
  };

  return (
    <div className="bg-white rounded px-8 pt-6 pb-8 mx-auto max-w-lg flex flex-col justify-center item-center h-full">
      <h1 className="text-2xl mb-8 mx-auto">Welcome to MeetOff</h1>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        {erroru && <p className="text-red-500 text-xs italic">{erroru}</p>}
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          Meeting Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
          value={meetname}
          onChange={(e) => setMeetname(e.target.value)}
          type="text"
          placeholder="Meeting Title"
        />
        {errorm && <p className="text-red-500 text-xs italic">{errorm}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-gray-800 hover:bg-gray-400 text-white font-bold w-full py-2 px-4 mr-1 rounded"
          type="button"
          onClick={() => handleStartMeeting(true)}
        >
          Start Meeting
        </button>
        <button
          className="bg-green-800 hover:bg-green-400 text-white font-bold w-full py-2 px-4 ml-1 rounded"
          type="button"
          onClick={() => handleStartMeeting(false)}
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default StartFront;
