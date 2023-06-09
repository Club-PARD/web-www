import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Mob15 from "../../../Assets/img/Mob15.png";
import Mob30 from "../../../Assets/img/Mob30.png";
import MobTime from "../../../Assets/img/MobTime.png";
import "../../../App.css";

const PartDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  place-content: center;
  margin: 0 auto;
  margin-top: -10vh;
`;

const CarouselBox = styled.div`
  margin-top: 30vh;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100vh;
`;

const Image = styled.img`
  width: 300px;
  height: 400px;
  border-radius: 10px;
`;

const Textbox = styled.div`
  display: flex;
  color: #fff;
  text-align: center;
  font-size: 18px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 10px;
`;

const SimpleSlider = ({ setTime }) => {
  const [theme, setTheme] = useState(
    sessionStorage.getItem("THEME") || "default"
  );

  const handleOptionChange = (duration) => {
    sessionStorage.setItem("TIME", duration);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <PartDiv>
        <CarouselBox>
          <Textbox className="Barun-GothicUL-font">
            좌우로 넘겨서 시간을 선택해주세요
          </Textbox>
          <Slider {...settings}>
            <div>
              <Link
                to="/Video"
                style={{ textDecoration: "none" }}
                onClick={() => handleOptionChange(15)}
              >
                <Image src={Mob15} alt="15" />
              </Link>
            </div>
            <div>
              <Link
                to="/Video"
                style={{ textDecoration: "none" }}
                onClick={() => handleOptionChange(30)}
              >
                <Image src={Mob30} alt="30" />
              </Link>
            </div>
            <div>
              <Link
                to="/Video"
                style={{ textDecoration: "none" }}
                onClick={() => handleOptionChange(999)}
              >
                <Image src={MobTime} alt="Time" />
              </Link>
            </div>
          </Slider>
        </CarouselBox>
      </PartDiv>
    </div>
  );
};

export default SimpleSlider;
