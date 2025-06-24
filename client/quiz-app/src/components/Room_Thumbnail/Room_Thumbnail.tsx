import React, { useEffect, useState } from 'react';

type Room = {
  slug: string;
  thumbnail_url: string;
  title: string;
};

const RoomThumbnail: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => {
        console.error('Failed to load rooms:', err);
      });
  }, []);

  return (
    <div className="room-thumbnail">
      <h3>Rooms</h3>
      <p>All Rooms</p>
      <div id="quizContainer">
        {rooms.map(room => (
          <div className="quiz-box" key={room.slug}>
            <a href={`/quiz/${room.slug}`}>
              <img src={room.thumbnail_url} alt={room.title} />
              <h3>{room.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomThumbnail;