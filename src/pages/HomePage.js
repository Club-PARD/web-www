import React from "react";
import styled from "styled-components";
import HomeFirst from "../components/Web/Web-HomePage/Web-HomeFirst";
import HomeThird from "../components/Web/Web-HomePage/Web-HomeThrid";
import HomeSecond from "../components/Web/Web-HomePage/Web-HomeSecond";
import HomeReal from "../components/Web/Web-HomePage/Web-HomeReal";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import Hamburgermob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";

import MobFirst from "../components/Mobile/HomePage_Mob/Mob-HomeFirst";
import MobSecond from "../components/Mobile/HomePage_Mob/Mob-HomeSecond";
import MobReal from "../components/Mobile/HomePage_Mob/Mob-HomeReal";
import MobThird from "../components/Mobile/HomePage_Mob/Mob-HomeThird";

import { useMediaQuery } from "react-responsive";
import { FullPage, Slide } from "react-full-page";

const Home = ({ setUser, setTime, setTheme, theme }) => {
  // setTime을 props로 받아옵니다.
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.
  const HomePageComponent = styled.div``;

  const HomePageComponent_Mob = styled.div``;

  return (
    <HomePageComponent>
      {isDesktopOrMobile !== true ? (
        <div>
          <FullPage>
            <Hamburgerhome setUser={setUser} />
            <Slide>
              <HomeFirst />
            </Slide>

            <Slide>
              <HomeReal />
            </Slide>

            <Slide>
              <HomeSecond />
            </Slide>
            <HomeThird setTime={setTime} />
          </FullPage>
        </div>
      ) : (
        <HomePageComponent_Mob>
          <div>
            <FullPage>
              <Hamburgermob setUser={setUser} />
              <Slide>
                <MobFirst />
              </Slide>

              <Slide>
                <MobReal />
              </Slide>

              <Slide>
                <MobSecond />
              </Slide>

              <MobThird setTime={setTime} />
            </FullPage>
          </div>
        </HomePageComponent_Mob>
      )}
    </HomePageComponent>
  );
};

export default Home;
