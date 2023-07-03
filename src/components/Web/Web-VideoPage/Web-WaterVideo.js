import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { StorageService } from "../../../fbase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { dbService } from "../../../fbase";
import styled, { css } from "styled-components";
import Mute from "../../../Assets/img/mute2.png";
import NotMute from "../../../Assets/img/muteno2.png";
import LogoImage from "../../../Assets/img/Logowhite.png";
import Play from "../../../Assets/img/Play.png";
import Pause from "../../../Assets/img/Pause.png";
import Arrow1 from "../../../Assets/img/arrow1.png";
import Arrow2 from "../../../Assets/img/arrow2.png";
import Hamburgerhome from "../Web-HomePage/Web-Hamburgerhome";
import Lottie from "react-lottie";
import animationData from "../../../Assets/img/118176-day-and-night-transition-scene";
import Modal from "./Web-Modal";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TopWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 2;
  margin-top: -15px;
  margin-left: 5px;
  top: 0;
  left: 0;
`;

const Logo = styled.img`
  position: absolute;
  width: 165px;
  height: 46px;
  margin-left: 40px;
  margin-top: 55px;
  z-index: 2;
`;

const AudioArrowWrapper = styled.div`
  position: absolute;
  top: 140px;
  left: 190px;
  transform: translateX(-180px);
  z-index: 2;
  width: 376px;
  height: 650px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid var(--main-white, #f2f2f2);
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(15px);
  transition: transform 0.3s ease;

  
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */

  ${(props) =>
    props.move &&
    css`
      transform: translateX(-537px);
    `}
`;

const ArrowWrapper = styled.div`
  position: absolute;
  top: 220px;
  left: 100%;
  transform: translateX(-50%);
  z-index: 2;
  width: 54px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--main-white, #f2f2f2);
  cursor: pointer;
`;

const Arrow = styled.img`
  position: absolute;
  left: 12.5px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  margin-top: 10px;
`;

const ForestVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const AllAudioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AllMuteText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--main-white, #f2f2f2);
  font-size: 20px;
  font-family: NanumSquare Neo variable;
  font-weight: 100;
  line-height: 140%;
  margin-top: 24px;
  margin-left: 30px;
  margin-right: 145.8px;
`;

const AllAudioMuteButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  z-index: 1;
  cursor: pointer;
`;

const VideoMuteImage = styled.img`
  width: 16px;
  height: 16px;
`;

const AudioMuteImage = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 10px;
  `;

const PlayPauseImage = styled.img`
  width: 16px;
  height: 16px;
  margin-left: -130px;
  margin-top: 4px;
`;

const OneAudioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 요소 사이 간격 균등 분배 */
`;

const OneAudioWrapper1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 35px;
`;

const OneAudioWrapper2 = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
  transform: translateX(-172px); /* 왼쪽으로 200px 이동 */
  /* padding-left: -100px; 왼쪽 여백 설정 */
`;


const AudioSlider = styled.input`
  margin-top: 20px;
  margin-left: 20px;
  z-index: 1;
  width: 150px;
  height: 3px;
  background-color: #ffffff;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
  }
`;

const LoadingAnimationWrapper = styled.div``;

const ForestVideoComponent = ({ setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [audioURLs, setAudioURLs] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState([]);
  const [isAudioAllMuted, setIsAudioAllMuted] = useState(false);
  const [audioVolumes, setAudioVolumes] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState([]);
  const [arrowImageIndex, setArrowImageIndex] = useState(1);
  const [audioArrowVisible, setAudioArrowVisible] = useState("");
  const [isMoved, setIsMoved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAudioArrowExpanded, setIsAudioArrowExpanded] = useState(true);
  const audioRefs = useRef([]);
  const videoRef = useRef("");


  const muteTexts = ["모래 밟는 소리", "물 첨벙 소리", "비소리", "바람 소리", "대화 소리"];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVideoEnded = () => {
    openModal();
    setArrowImageIndex(1);
    setIsAudioArrowExpanded(false);
    setIsMoved(true);
  };

  const handleDivAClick = () => {
    setIsMoved(!isMoved);
    setArrowImageIndex((prevIndex) => (prevIndex === 1 ? 2 : 1));
    setAudioArrowVisible(false);
  };

  const handleAudioTogglePlay = (index) => {
    setIsAudioPlaying((prevIsPlaying) => {
      const newIsPlaying = [...prevIsPlaying];
      newIsPlaying[index] = !newIsPlaying[index];
      return newIsPlaying;
    });

    if (audioRefs.current[index].paused) {
      audioRefs.current[index].play();
    } else {
      audioRefs.current[index].pause();
    }
  };

  const handleAudioVolumeChange = (event, index) => {
    const newVolume = parseFloat(event.target.value);
    if (!isAudioMuted[index]) {
      setAudioVolumes((prevVolumes) => {
        const newVolumes = [...prevVolumes];
        newVolumes[index] = newVolume;
        return newVolumes;
      });
      if (audioRefs.current[index]) {
        audioRefs.current[index].volume = newVolume;
      }
    }
  };

  const handleAllSoundToggleMute = () => {
    setIsAudioAllMuted((prevIsMuted) => !prevIsMuted);

    audioRefs.current.forEach((audio) => {
      audio.muted = !isAudioAllMuted;
    });
  };

  const handleAudioToggleMute = (index) => {
    setIsAudioMuted((prevIsMuted) => {
      const newIsMuted = [...prevIsMuted];
      newIsMuted[index] = !prevIsMuted[index];
      return newIsMuted;
    });

    if (audioRefs.current[index]) {
      audioRefs.current[index].muted = !isAudioMuted[index];
    }
  };

  const saveAudioVolumes = async (audioVolumes) => {
    const audioVolumesRef = doc(dbService, "audioVolumes", "user3");
    await setDoc(audioVolumesRef, { volumes: audioVolumes });
  };

  const loadAudioVolumes = async () => {
    const audioVolumesRef = doc(dbService, "audioVolumes", "user3");
    const docSnapshot = await getDoc(audioVolumesRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return data.volumes;
    } else {
      return [];
    }
  };

  const saveAudioVolumesToFirebase = async () => {
    const currentVolumes = await loadAudioVolumes();

    if (JSON.stringify(currentVolumes) !== JSON.stringify(audioVolumes)) {
      await saveAudioVolumes(audioVolumes);
    }
  };

  const loadAudioVolumesFromFirebase = async () => {
    const volumes = await loadAudioVolumes();
    if (volumes.length > 0) {
      setAudioVolumes((prevVolumes) => {
        const newVolumes = [...prevVolumes];
        volumes.forEach((volume, index) => {
          if (newVolumes[index] !== undefined) {
            newVolumes[index] = volume;
          }
        });
        return newVolumes;
      });
    }
  };

  useEffect(() => {
    const fetchVideoURL = async () => {
      const videoReference = ref(StorageService, "Video/Water/water1.mp4");
      const url = await getDownloadURL(videoReference);
      setVideoURL(url);
      await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
      setIsVideoLoaded(true);
    };

    const fetchAudioURLs = async () => {
      const audioFolderReference = ref(StorageService, "Audio/Water");
      const audioFiles = await listAll(audioFolderReference);

      const urls = await Promise.all(
        audioFiles.items.map(async (audioFile) => {
          const url = await getDownloadURL(audioFile);
          return url;
        })
      );

      setAudioURLs(urls);
      setIsAudioPlaying(new Array(urls.length).fill(false));
      setIsAudioMuted(new Array(urls.length).fill(false));
    };

    const fetchAudioVolumes = async () => {
      const volumes = await loadAudioVolumes();
      if (volumes.length > 0) {
        setAudioVolumes(volumes);
      }
    };

    fetchVideoURL();
    fetchAudioURLs();
    fetchAudioVolumes();
  }, []);

  useEffect(() => {
    // 동영상 로딩이 끝나면 재생
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoLoaded]);

  useEffect(() => {
    // 로딩 상태 감지하여 Lottie 애니메이션 실행 제어
    if (isLoading) {
      const loadingAnimationTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 4.5 * 1000);

      return () => {
        clearTimeout(loadingAnimationTimeout);
      };
    }
  }, [isLoading]);

  useEffect(() => {
    saveAudioVolumesToFirebase();
  }, [audioVolumes]);

  useEffect(() => {
    loadAudioVolumesFromFirebase();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingAnimationWrapper>
          <Lottie
            options={{
              animationData: animationData,
              loop: true,
              autoplay: true,
            }}
          />
        </LoadingAnimationWrapper>
      ) : (
        <div>
          {audioURLs.length > 0 && (
            <VideoContainer>
              {videoURL && (
                <ForestVideo
                  autoPlay
                  loop
                  src={videoURL}
                  muted
                  ref={videoRef}
                  onEnded={handleVideoEnded}
                />
              )}
              <TopWrapper>
                <Link to="/">
                  <Logo src={LogoImage} alt="Logo Image" />
                </Link>
                <Hamburgerhome setUser={setUser} />
              </TopWrapper>
              <AudioArrowWrapper move={isMoved}>
                <AllAudioWrapper>
                  <AllMuteText>전체 소리</AllMuteText>
                  <AllAudioMuteButton onClick={handleAllSoundToggleMute}>
                    <VideoMuteImage
                      src={isAudioAllMuted ? Mute : NotMute}
                      alt="Mute Image"
                    />
                  </AllAudioMuteButton>
                </AllAudioWrapper>
                {audioURLs.map((audioURL, index) => (
                  <div key={index}>
                    <audio
                      src={audioURL}
                      ref={(el) => (audioRefs.current[index] = el)}
                      //   autoPlay
                      //   muted={index === 0 ? isAudioMuted[index] : true}
                    />
                    <OneAudioWrapper>
                      <OneAudioWrapper1>
                        <AllMuteText>{muteTexts[index]}</AllMuteText>
                        <AllAudioMuteButton
                          onClick={() => handleAudioTogglePlay(index)}
                        >
                          <PlayPauseImage
                            src={isAudioPlaying[index] ? Pause : Play}
                            alt="Mute Image"
                          />
                        </AllAudioMuteButton>
                      </OneAudioWrapper1>
                      <OneAudioWrapper2>
                        <AllAudioMuteButton
                          onClick={() => handleAudioToggleMute(index)}
                        >
                          <AudioMuteImage
                            src={isAudioMuted[index] ? Mute : NotMute}
                            alt="Mute Image"
                          />
                        </AllAudioMuteButton>
                        <AudioSlider
                          type="range"
                          min="0"
                          max="1"
                          step="0.001"
                          value={audioVolumes[index] || 0}
                          onChange={(event) =>
                            handleAudioVolumeChange(event, index)
                          }
                        />
                      </OneAudioWrapper2>
                    </OneAudioWrapper>
                  </div>
                ))}
                <ArrowWrapper onClick={handleDivAClick}>
                  <Arrow src={arrowImageIndex === 1 ? Arrow1 : Arrow2} />
                </ArrowWrapper>
              </AudioArrowWrapper>
            </VideoContainer>
          )}
        </div>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}></Modal>
      )}
    </div>
  );
};

export default ForestVideoComponent;
