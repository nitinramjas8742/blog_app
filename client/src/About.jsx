import React from 'react';
import './About.css'
function About() {
  return (
    <div className="about-container">
      <h1>Discovering Bali's Hidden Gems: Off the Beaten Path</h1>
      <p>
        Bali, Indonesia, is a tropical paradise known for its stunning beaches, vibrant culture, and lush rice terraces. While popular tourist destinations like Kuta and Ubud attract millions of visitors each year, there's so much more to Bali than meets the eye. In this travel blog post, we'll embark on a journey to uncover the island's hidden gems - those lesser-known treasures that offer an authentic Balinese experience.
      </p>

      <div className="gem">
        <h2>Tegalalang Rice Terraces</h2>
        <p>
          <strong>Description:</strong> Tegalalang is one of the most iconic rice terraces in Bali, but it's often overshadowed by more famous destinations. Here, you can hike through picturesque rice fields and connect with local farmers.
        </p>
        <p>
          <strong>Tips:</strong> Visit early in the morning to avoid crowds and experience the tranquility of the terraces.
        </p>
      </div>

      {/* Repeat a similar structure for each hidden gem. */}

      <h2>Conclusion</h2>
      <p>
        Bali's hidden gems are a testament to the island's rich cultural and natural diversity. While it's tempting to stick to the well-trodden path, exploring these lesser-known treasures will reward you with a deeper understanding of Bali and unforgettable memories. As you plan your next trip, consider adding some of these hidden gems to your itinerary for a truly authentic Balinese adventure.
      </p>
    </div>
  );
}

export default About;
