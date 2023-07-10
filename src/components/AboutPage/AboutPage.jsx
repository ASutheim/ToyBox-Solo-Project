import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div id="about-container">
      <div className="text-plus-image">
        <div className="about-section">
          <div className="about-header">
          <img src={require("./tealbox.jpg")} width="100px" />
            <h1>Why ToyBox?</h1>{" "}
          
          </div>
          <p>
            Before entering school for software development, I worked in
            early-childhood and elementary education for many years. Again and
            again while watching children play, I noticed that children played
            more deeply and creatively, and shared more readily with peers, when
            they had access to a modest collection of carefully chosen toys,
            rather than an abundance of toys that didn’t really suit them. I
            also noticed how much the clutter and chaos created by excess toys could negatively impact
            mood - both children's and grown-up's!  I also recognized
            that the most high-quality toys - durable, thoughtfully-designed,
            beautiful, and compelling - also tended to be expensive. Meanwhile
            the less well-made alternatives often ended up broken or neglected
            within a very short period of time.
          </p>

          <p>
            Every child should have access to toys that spark their imagination,
            help them learn, support their interests, bring them joy, and
            connect them with friends. Parents and caregivers on tight budgets
            shouldn’t have to spend crazy amounts of money on toys that children
            may outgrow all too quickly. And toys shouldn’t go to the landfill,
            or sit neglected in a basement or attic, when some other child might
            be ready to love and play with them!
          </p>

          <p>
            ToyBox was created to mediate the process of finding, lending,
            borrowing, and enjoying toys freely. I envision growing it into a
            tool to help connect children with similar interests, as well as
            families that can help support each other by sharing resources.
          </p>

          <p>
            Less waste, excess, need and worry - more joy, fun, generosity, and
            community.
          </p>
        </div>
      </div>
      <div className="about-section">
      <div className="about-header">
          <img src={require("./stock1.jpg")} width="100px" />
        <h1>How was Toybox built?</h1></div>

        <p>
          ToyBox was created in a two-week sprint by one student developer, as
          part of Tier 3 of Prime Academy’s Full-Stack Software Engineering
          program. (Actually, it was a bit more like a one-week sprint - I got
          quite sick in the middle of it!)
        </p>

        <p>
          Technologies used include Javascript React, Redux Saga, Node.js,
          PostgreSQL, HTML/CSS, and Material UI.
        </p>

        <p>
          If you have feedback or would like to get in touch to talk about
          software, educational/developmental psychology, community building,
          creative reuse, or to tell me about your kid’s favorite thing to play
          with, I’d love to hear from you!
        </p>

        <a href="https://www.linkedin.com/in/anna-sutheim-867500277/">
          LinkedIn
        </a>
        <br></br>
        <a href="https://github.com/ASutheim?tab=repositories">GitHub</a>
      </div>
      <div className="about-section">
      <div className="about-header">
          <img src={require("./stock4.jpg")} width="100px" />
        <h1>Acknowledgements</h1></div>
        <p>
          Thanks to Prime Academy’s staff and instructors for their expertise
          and hard work in fostering brand new engineers!
        </p>

        <p>
          Thanks to my fellow students of Diamond Cohort for their camaraderie,
          generosity, empathy, and determined bug-hunting.
        </p>

        <p>
          My wonderful partner Mary, who gave so much expertise, patience, time,
          and moral and practical support to this project. You’re amazing and
          I’m so grateful.
        </p>

        <p>
          Thanks to the parents of the former TentHouse Daycare, who gave me
          some real user data for this app!
        </p>

        <p>
          And thanks to all the children in my life who inspired this: Liam,
          Sam, Solveig, Maeve, Matilda, Leo, Little Sam, Quinn, Xavier, Valerie,
          my former students at Sunny Hollow, and many others. Play on, small
          friends.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
