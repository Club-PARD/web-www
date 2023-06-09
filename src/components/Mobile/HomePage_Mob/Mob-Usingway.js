import { styled } from "styled-components";

import { Link } from "react-router-dom";

import sand from "../../../Assets/img/Sea.png";
import Logo from "../../../Assets/img/Logowhite.png";

const ParentContainer = styled.div`
  overflow-y: auto;
  height: 100vh;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
`;
const Partdiv = styled.div`
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
  //width:800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;
const Inner = styled.div`
  padding: 0px 0px 0px;
  background: rgba(255, 255, 255, 0.01) url(${sand});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
`;
const Inquiryword = styled.div`
  color: var(--main-white, #f2f2f2);
  margin-left: -230px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 32px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
`;
const Sentence = styled.div`
  width: 340px;
  height: 1003px;

  margin-left: 0px;
  margin-top: 0px;

  display: flex;
  flex-direction: column;
`;
const Titlediv = styled.div`
  margin-top: 30px; // 고정된 값들인 div로 감싸고 난 뒤에 는 안에 요소들 margin줘도 div가 늘어나지 않음
  width: 345px;
  height: 30px;
  color: var(--main-white, #f2f2f2);
  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;
const Titlediv1 = styled.div`
  width: 340px;
  height: 30px;
  color: var(--main-white, #f2f2f2);
  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-top: 7vh;
`;
const Titlediv2 = styled.div`
  width: 340px;
  height: 20px;
  color: var(--main-white, #f2f2f2);
  font-size: 18px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-top: 5vh;
`;

const Titlediv3 = styled.div`
  margin-top: 5vh;
  width: 340px;
  height: 60px;
  color: var(--main-white, #f2f2f2);
  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;
const Titlediv4 = styled.div`
  width: 340px;
  color: var(--main-white, #f2f2f2);
  font-size: 20px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-top: 40px;
`;
const Contentdiv = styled.div`
  margin-top: 2vh;
  width: 340px;
  height: 30px;
  padding-top: 30px;
  font-size: 15px;
  color: var(--main-white, #f2f2f2);
`;
const Contentdiv1 = styled.div`
  width: 340px;
  margin-top: 5vh;
  color: var(--main-white, #f2f2f2);
  font-size: 14px;
`;
const Contentdiv2 = styled.div`
  width: 340px;
  padding-top: 3vh;
  color: var(--main-white, #f2f2f2);
  font-size: 14px;
`;
const Contentdiv22 = styled.div`
  width: 340px;
  height: 180px;
  margin-top: 3vh;
  color: var(--main-white, #f2f2f2);
  font-size: 14px;
  margin-bottom: 8vh;
`;
const MyLine = styled.div`
  margin-top: 0px;
  margin-left: 10px;
  height: 2px; /* 선의 두께를 변경하려면 이 값을 조정하세요. */
  background: var(
    --main-white,
    #f2f2f2
  ); /* 선의 색상을 변경하려면 이 값을 조정하세요. */
  width: 345px; /* 선의 길이를 조정하려면 이 값을 조정하세요. */
`;
const RestLink = styled(Link)`
  color: #f2f2f2;
  background-color: #a7a7a7;
  text-align: center;
  justify-content: center;
  font-size: 16px;
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
  padding-top: 10px;
  width: 200px;
  height: 40px;
  text-decoration: none;
  border-radius: 10px;

  cursor: pointer;
  &:hover {
    background: #4880ee;
    color: #f2f2f2;
  }

  margin-top: 10vh;
  margin-left: -140px;
`;

const MobUsing = () => {
  return (
    <>
      <ParentContainer>
        <Inner>
          <Partdiv>
            <Link style={{ border: "none" }} to="/">
              <img
                style={{
                  marginTop: "2.6vh",
                  marginLeft: "-175px",
                  border: "none",
                  width: "165px",
                  height: "47px",
                }}
                src={Logo}
              />
            </Link>

            <Inquiryword>
              <div className="Barun-GothicUL-font">이용방법</div>
            </Inquiryword>
            <MyLine />
            <Sentence>
              <Titlediv>
                <div className="Barun-GothicL-font">
                  1. 물멍, 불멍, 숲멍 테마가
                  <br /> 준비되어 있어요.
                </div>
              </Titlediv>
              <Contentdiv>
                <div className="Barun-GothicUL-font">
                  취향에 맞는 테마를 선택해보세요.
                </div>
              </Contentdiv>

              <Titlediv1>
                <div className="Barun-GothicL-font">
                  2. 짧게 집중적인 휴식을 원한다면
                  <br /> 15분 / 30분 시간 선택을 해주세요.
                </div>
              </Titlediv1>
              <Contentdiv1>
                <div className="Barun-GothicUL-font">
                  시간이 자동으로 멈출거에요 : &#41; <br />
                  <br />
                  일이나 공부에 집중하기 위해 사용한다면, <br />
                  <br />
                  무한 재생을 사용해보세요.
                  <br />
                  <br />
                  자연의 소리가 여러분들의 마음을 안정시키고, <br />
                  <br />
                  집중력을 올려줄거에요.
                </div>
              </Contentdiv1>

              <Titlediv2>
                <div className="Barun-GothicL-font">
                  3. 다양한 소리를 조절해서 들을 수 있어요.
                </div>
              </Titlediv2>
              <Contentdiv2>
                <div className="Barun-GothicUL-font">
                  나에게 딱 맞는 소리를 찾아보세요.
                </div>
              </Contentdiv2>

              <Titlediv3>
                <div className="Barun-GothicL-font">
                  4. 불안한 감정이나, 힘든 감정을 가지고만 있으면 더욱 커지기
                  마련이에요.
                </div>
              </Titlediv3>
              <Contentdiv22>
                <div className="Barun-GothicUL-font">
                  여러분들의 감정을 사람들과 나눠보세요.
                  <br />
                  <br />
                  실질적 조언이 필요하다면, 조언이 필요해요 게시판에,
                  <br />
                  <br />
                  그저 공감이 필요하다면, 공감이 필요해요 게시판에 <br />
                  <br />
                  글을 올려보세요.
                  <br />
                  <br />
                  공유해요 게시판에 글을 올려서 <br />
                  <br />
                  서로에 대한 팁을 공유해보세요
                  <br />
                  <br />
                  물론 기쁜 일은 함께 나누면 배가 될거에요 : &#41;
                  <br />
                  <br />
                  여러분들의 감정에 맞는 생각을 기록하고 나눠보세요.
                </div>
              </Contentdiv22>

              <Titlediv4>
                <div className="Barun-GothicL-font">
                  5. 여러분들만의 휴식 꿀팁이 있나요?
                </div>
              </Titlediv4>
              <Contentdiv2>
                <div className="Barun-GothicUL-font">
                  나만의 휴식 꿀팁을 나누며, 나에게 더욱 잘 맞는 <br /> <br />
                  휴식 방법을 찾아보세요.
                </div>
              </Contentdiv2>
            </Sentence>

            <RestLink to="/">
              <div className="Barun-GothicUL-font">지금 바로 쉬러가기</div>
            </RestLink>
          </Partdiv>
        </Inner>
      </ParentContainer>
    </>
  );
};

export default MobUsing;
