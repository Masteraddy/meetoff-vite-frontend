import { useState, useRef, useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import axios from 'axios';
// import './App.css';
import StartFront from './components/StartFront';
import Feedback from './components/Feedback';

const DOMAIN = 'aws.masteraddy.tech';
// const DOMAIN = 'meet.trivoh.com';

function App() {
  // const [meeting, setMeeting] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [jwt, setJWT] = useState('');

  const startMeet = ({ meetname, username, isHost }, cb = () => {}) => {
    axios
      .get(`https://me.masteraddy.tech/meet/${meetname}?name=${username}`)
      .then((res) => {
        let data = res.data;
        if (isHost) {
          setJWT(data.moderator.token);
        } else {
          setJWT(data.member.token);
        }
        setRoomName(meetname);
        setFeedback(false);
        cb(true);
      })
      .catch((error) => {
        console.log(error);
        cb(false);
      });
  };

  const submitFeedback = () => {
    setJWT('');
    setFeedback(false);
  };

  // console.log(jwt);
  // useEffect(() => {}, [jwt]);

  return (
    <div className="h-screen w-screen">
      {!jwt && (
        <>
          {!feedback ? (
            <StartFront startMeet={startMeet} />
          ) : (
            <Feedback submitFeedback={submitFeedback} />
          )}
        </>
      )}
      {jwt && (
        <JitsiMeeting
          domain={DOMAIN}
          roomName={roomName}
          jwt={jwt}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            enableWelcomePage: false,
            disableDeepLinking: true,
            prejoinConfig: {
              // When 'true', it shows an intermediate page before joining, where the user can configure their devices.
              // This replaces `prejoinPageEnabled`.
              enabled: false,
              // Hides the participant name editing field in the prejoin screen.
              // If requireDisplayName is also set as true, a name should still be provided through
              // either the jwt or the userInfo from the iframe api init object in order for this to have an effect.
              hideDisplayName: false,
              // List of buttons to hide from the extra join options dropdown.
              hideExtraJoinButtons: ['no-audio', 'by-phone'],
            },
            toolbarConfig: {
              alwaysVisible: true,
            },
            // toolbarButtons: ['hangup'],
            // toolbarButtons: ['microphone', 'camera', 'hangup'],
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            SHOW_BRAND_WATERMARK: false,
            VERTICAL_FILMSTRIP: true,
          }}
          // userInfo={{
          //   displayName: 'USERNAME',
          // }}
          onApiReady={(externalApi) => {
            // here you can attach custom event listeners to the Jitsi Meet External API
            // you can also store it locally to execute commands
            // externalApi.addEventListener('hangup', () => {
            //   alert('Hanged Up');
            // });
            // console.log(externalApi);
          }}
          onReadyToClose={() => {
            setJWT('');
            setFeedback(true);
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = `${window.innerHeight}px`;
            iframeRef.style.width = `${window.innerWidth}px`;
          }}
        />
      )}
    </div>
  );
}

export default App;
