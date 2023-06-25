import React, { useState, useEffect, useRef } from "react";
import mute from "../../../Assets/img/mute.png";
import muteno from "../../../Assets/img/muteno.png";

import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import { authService } from "../../../fbase";

import { 
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,


} from "firebase/auth";

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: ${({ isExpanded }) => (isExpanded ? "400px" : "0px")}; /* Adjust the width based on expansion */
  height: 100vh;
  background-color: white; /* Change the background color here */
 transition: width 0.5s ease;
  z-index: 999;
  border-radius : 30px 0 0 30px;
  /*
  선택자 {
  border-radius: 위쪽 좌측 위드, 위쪽 우측 끝, 아래쪽 우측 끝, 아래쪽 좌측 끝;
}
  */

`;

const ExpandButton = styled.button`
  position: absolute;
  top: 20px;
  left: -40px;
  width: 40px;
  height: 40px;
  background-color: red;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 2;
`;
const ExpandButton1 = styled.button`
line-height: 70px;
width: 36px;
height: 36px;
font-size: 36px;

padding-right: 40px;

  background-color: white;
  border: none;
  color: black;
  cursor: pointer;
  z-index: 2;
`;

const ExpandedSidebar = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  width:400px; /* Width of the expanded sidebar */
  height: 100%;
  background-color: white; /* Change the background color here */

  z-index: 999;
 border-radius : 30px 0 0 30px;
  transition: width 0.5s ease;
`;

const Menuside= styled.div`

display: flex;
flex-direction: column;
width: 100%;
height: 100%;
color: red;
border-radius: 20px;
 z-index: 999;
background-color: white;

`

const MenuItemLogin = styled.div`

text-align: right;
    width: 100%; // Add this
padding-right: 27px;
  height: 85px;
  color: #808080;
  font-size: 16px;
  font-family: NanumSquare Neo variable;
  font-weight: 500;
  line-height: 70px;
  
  cursor: pointer;
`;



const MenuItemLink = styled(Link)`
text-decoration: none;

color: #0F1011;

/* Main/Header/H3-32 R */
font-size: 32px;
font-family: NanumSquare Neo variable;
font-weight: 300;
line-height: 75px; // 글자 세로 위치
  padding-left: 32px; // 글자 가로 위치
  //width: 100%;
  height: 85px;
  text-align: left;
  cursor: pointer;
  color: black;
  &:hover {
    background: rgba(0, 255, 0, 0.1);
  }
`;
const Line= styled.div`
margin-left:32px; // div자체위치
background: #0F1011;
width: 348px;
height: 1px;
`
const Hamburgerhome= ({setUser})=>{
    const [isExpanded, setIsExpanded] = useState(false);
    const[isLoggedin,setisLoggedin] = useState(false);
    const [UserObj,setUserObj] =useState(null);

    useEffect(()=>{

        const auth= getAuth();
       onAuthStateChanged(auth,(user)=>{
          if(user){
      
          setisLoggedin(true);
          setUserObj(
            user
            //displayName : user.displayName,
            //uid: user.uid,
           // updateProfile: (args)=> updateProfile(user,{displayName:user.displayName}),
            //이 function은 rerturn 값으로 우리한테 진짜 user.updateProfile을 줄것
      
          );
         setUser(user);
        }else{
            setisLoggedin(false);
            setUserObj(null);
          }
        
        }
      
        );
      
      
      })
      
        const handleExpandSidebar = () => {
          setIsExpanded(!isExpanded);
        };

    const onSocialclick = async (event) => {
        const { target: { name } } = event;
        let provider;
      
        if (name === 'google') {
          provider = new GoogleAuthProvider();
          
          try {
            const data = await signInWithPopup(authService, provider);
            console.log(data);
          } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
              console.log('User closed the login popup.');
            } else {
              console.error(error);
            }
          }
        }
      };

    return(

        <>
        <SidebarContainer isExpanded={isExpanded}>
        {isExpanded ? (
          <>
          
          <ExpandedSidebar>
        <Menuside>
       <div style={{display:'flex'}}>
        
        {UserObj ? <MenuItemLogin>{UserObj.displayName}</MenuItemLogin>
          :<MenuItemLogin  name="google" onClick={onSocialclick}>로그인</MenuItemLogin>}

</div>
          <Line/>
          <MenuItemLink to='/'>홈</MenuItemLink>
          <Line/>
          {isLoggedin ? <MenuItemLink to='/Mypage'>마이 페이지</MenuItemLink>:
           <MenuItemLink name="google" onClick={onSocialclick}>마이 페이지</MenuItemLink> }
            <Line/>
          <MenuItemLink to='/About'>소개</MenuItemLink>
          <Line/>
          <MenuItemLink to='/Community'>커뮤니티</MenuItemLink>
          
           
          <Line/>
                    
          <MenuItemLink to='/Inquiry'>문의</MenuItemLink>
          
        </Menuside>
     
       </ExpandedSidebar>
       <ExpandButton onClick={handleExpandSidebar}>{'<'}</ExpandButton>

     
          </>
        ) : (
        
         
          <ExpandButton onClick={handleExpandSidebar}>{'<'}</ExpandButton>

        )}
          </SidebarContainer>
        </>
    )
};
{/*<ExpandButton1 onClick={handleExpandSidebar}>{'X'}</ExpandButton1> */}

export default Hamburgerhome