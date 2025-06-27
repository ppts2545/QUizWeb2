import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RoomDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch room data here using the slug
    const fetchRoomData = async () => {
      try {
        // Example fetch call - replace with your actual API
        const response = await fetch(`/api/room/${slug}`);
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoomData();
  }, [slug]);
  
  if (loading) return <div>Loading...</div>;
  if (!room) return <div>Room not found</div>;
  
  return (
    <div className="room-detail">
      <h2>{room.title || 'Room Details'}</h2>
      <p>{room.description || 'No description available'}</p>
      {/* Add more room details here */}
    </div>
  );
};

export default RoomDetail;