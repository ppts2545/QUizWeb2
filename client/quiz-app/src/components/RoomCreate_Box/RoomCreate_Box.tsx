import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './RoomCreate_Box.css';

const RoomCreateBox = () => {
  const navigate = useNavigate();

    const [creatingRoom, setCreatingRoom] = useState(false);
    const [roomTitle, setRoomTitle] = useState('');
    const [roomSlug, setRoomSlug] = useState('');
    const [roomThumbnail, setRoomThumbnail] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [roomDescription, setRoomDescription] = useState('');
    const [roomTags, setRoomTags] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(10); // Default max players
    const [isPublic, setIsPublic] = useState(true);
    const [roomColor, setRoomColor] = useState('#ffffff'); // Default room color
    const [roomPassword, setRoomPassword] = useState('false');
    
  const handleCreateRoom = async () => {
    setCreatingRoom(true);

    // example: form data to send to backend
    const formData = new FormData();
    formData.append('title', roomTitle);
    formData.append('slug', roomSlug);
    formData.append('description', roomDescription);
    formData.append('tags', roomTags);
    formData.append('maxPlayers', maxPlayers.toString());
    formData.append('isPublic', isPublic.toString());
    formData.append('color', roomColor);
    if(!isPublic) {
      formData.append('password', roomPassword);
    }
    if (roomThumbnail) {
      formData.append('thumbnail', roomThumbnail);
    }

    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        navigate(`/room/${roomSlug}`); // Go to the new room
      } else {
        setError(data.message || 'Failed to create room.');
      }
    } catch (err) {
      setError('An error occurred while creating the room.');
        console.error('Error creating room:', err);
    }

    setCreatingRoom(false);
  };

  return (
    <div className="room-create-box">
      <h2>Create a New Room</h2>

      {step === 1 && (
            <div>
                <h3>Basic Room Info</h3>
                <input
                    type="text"
                    placeholder="Room Title"
                    value={roomTitle}
                    onChange={(e) => setRoomTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Room Slug"
                    value={roomSlug}
                    onChange={(e) => setRoomSlug(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Room Description"
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => {
                    if (e.target.files) {
                        setRoomThumbnail(e.target.files[0]);
                    }
                    }}
                />
                <input
                    type="text"
                    placeholder="Room Tags (comma separated)"
                    value={roomTags}
                    onChange={(e) => setRoomTags(e.target.value)}
                />
                <button onClick={() => setStep(2)}>Next </button>
            </div>
        )}

        {step === 2 && (
            <div>
                <h3>Room Setting</h3>
                <p>Title: {roomTitle}</p>
                <br />
                <input
                    type="number"
                    placeholder="Max Players"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                />
                <br />
                <label htmlFor="">Public</label>
                <input
                    type="radio"
                    name='visibility'
                    checked={isPublic}
                    onChange={() => setIsPublic(true)}
                />
                <label htmlFor="">Private</label>
                <input
                    type="radio"
                    name='visibility'
                    checked={!isPublic}
                    onChange={() => setIsPublic(false)}
                />
                <br />
                {!isPublic && (
                  <input
                      type="text"
                      placeholder="Room Password (optional)"
                      value={roomPassword}
                      onChange={(e) => setRoomPassword(e.target.value)}
                  />
                )}
                <button onClick={() => setStep(3)}>Next </button>
                <button onClick={() => setStep(1)}>Back </button>
            </div>
        )}

        {step === 3 && (
            <div>
                <h3>Appearance</h3>
                <label htmlFor="roomThumbnail">Room Thumbnail</label>
                <input
                    type="file"
                    onChange={(e) => {
                    if (e.target.files) {
                        setRoomThumbnail(e.target.files[0]);
                    }
                    }}
                />
                <label htmlFor="roomColor">Room Color</label>
                <input type="color" onChange={(e) => setRoomColor(e.target.value)} />
                <br />
                <button onClick={() => setStep(4)}>Next</button>
                <button onClick={() => setStep(2)}>Back</button>
            </div>
        )}

        {step === 4 && (
            <div>
                <h3>Review & Create</h3>
                <p><strong>Room Thumbnail:</strong> {roomThumbnail ? roomThumbnail.name : 'No thumbnail selected'}</p>
                <p><strong>Room Color:</strong> <span style={{ backgroundColor: roomColor, padding: '5px', borderRadius: '5px' }}>{roomColor}</span></p>
                <p><strong>Title:</strong> {roomTitle}</p>
                <p><strong>Slug:</strong> {roomSlug}</p>
                <p><strong>Description:</strong> {roomDescription}</p>
                <p><strong>Tags:</strong> {roomTags}</p>
                <p><strong>Max Players:</strong> {maxPlayers}</p>
                <p><strong>Type:</strong> {isPublic ? 'Public' : 'Private'}</p>

                <br />
                {error && <p className="error">{error}</p>}
                <button disabled={creatingRoom} onClick={handleCreateRoom}>
                    {creatingRoom ? 'Creating...' : 'Create Room'}
                </button>
            </div>
        )}
    </div>
  );
};

export default RoomCreateBox;
