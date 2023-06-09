import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";

import ForestVideoWeb from "../components/Web/Web-VideoPage/Web-ForstVideo";
import ForestVideoMob from "../components/Mobile/VideoPage_Mob/Mob-ForstVideo";
import FireVideoWeb from "../components/Web/Web-VideoPage/Web-FireVideo";
import FireVideoMob from "../components/Mobile/VideoPage_Mob/Mob-FireVideo";
import WaterVideoWeb from "../components/Web/Web-VideoPage/Web-WaterVideo";
import WaterVideoMob from "../components/Mobile/VideoPage_Mob/Mob-WaterVideo";

const Video = ({ setUser, user, time }) => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" });
  const AboutPageComponent = styled.div``;
  const theme = sessionStorage.getItem("THEME");

  const renderVideoContent = () => {
    if (isDesktopOrMobile) {
      switch (theme) {
        case "1":
          return <FireVideoMob setUser={setUser} time={time}/>;
        case "2":
          return <ForestVideoMob setUser={setUser} time={time}/>;
        case "3":
          return <WaterVideoMob setUser={setUser} time={time}/>;
        default:
          return null;
      }
    } else {
      switch (theme) {
        case "1":
          return <FireVideoWeb setUser={setUser} time={time}/>;
        case "2":
          return <ForestVideoWeb setUser={setUser} time={time}/>;
        case "3":
          return <WaterVideoWeb setUser={setUser} time={time}/>;
        default:
          return null;
      }
    }
  };

  return <AboutPageComponent>{renderVideoContent()}</AboutPageComponent>;
};

export default Video;
