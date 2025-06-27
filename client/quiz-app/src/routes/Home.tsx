import React from 'react';
import Slider from '../components/SliderShow/Slide';
import Banner from '../components/Banner_Adds/Banner_Add';
import Room_Thumbnail from '../components/Room_Thumbnail/Room_Thumbnail';

const Home = () => {
  return (
    <>
      <div className='main-content'>
        <Slider />
        <div className='add-banner-section'>
          <Banner 
            title="Welcome to Quiz App" 
            text="Test your knowledge with our quizzes" 
            buttonText="Get Started"
            className="top-banner"
          />
          <Banner 
            title="Ready for Another Challenge?" 
            text="Explore more quizzes below"
            buttonText="Try Now"
            className="bottom-banner"
          />
        </div>
      </div>
      <Room_Thumbnail />
    </>
  );
};

export default Home;