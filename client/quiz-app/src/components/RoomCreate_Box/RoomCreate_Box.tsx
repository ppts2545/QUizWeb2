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

  const handleCreateRoom = async () => {
    setCreatingRoom(true);

    // example: form data to send to backend
    const formData = new FormData();
    formData.append('title', roomTitle);
    formData.append('slug', roomSlug);
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
                    type="file"
                    onChange={(e) => {
                    if (e.target.files) {
                        setRoomThumbnail(e.target.files[0]);
                    }
                    }}
                />
                <button onClick={() => setStep(2)}>Next </button>
            </div>
        )}

        {step === 2 && (
            <div>
                <h3>Review Your Room</h3>
                <p>Title: {roomTitle}</p>
                <p>Slug: {roomSlug}</p>
                {roomThumbnail && <p>Thumbnail: {roomThumbnail.name}</p>}
                <button onClick={() => setStep(3)}>Next </button>
                <button onClick={() => setStep(1)}>Back </button>
            </div>
        )}

        {step === 3 && (
            <div>
                <h3></h3>
            </div>
        )}

        {step === 4 && (
            <div>
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
