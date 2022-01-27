import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { Waypoint } from "react-waypoint";
import SometimesPNG from "./Sometimes.png";
import artPNG from "./art.png";
import isPNG from "./is.png";
import morePNG from "./more.png";
import scienc3PNG from "./scienc3.png";
import sciencePNG from "./science.png";
import thanPNG from "./than.png";

const SOMETIMES = "Sometimes";
const SCIENCE = "science";
const IS = "is";
const MORE = "more";
const ART = "art";
const THAN = "than";
const SCIENC3 = "scienc3";

const titlez = [SOMETIMES, SCIENCE, IS, MORE, ART, THAN, SCIENC3];

const logoObject = {
  [SOMETIMES]: SometimesPNG,
  [SCIENCE]: sciencePNG,
  [IS]: isPNG,
  [MORE]: morePNG,
  [ART]: artPNG,
  [THAN]: thanPNG,
  [SCIENC3]: scienc3PNG,
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;   
  }

  html,body,#root {
    height: 100%;
    width: 100%;
  }
`;

const H1 = styled.h1`
  font-size: 4rem;
`;

const Content = styled.section`
  height 100rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  border: 1px solid #fff;
  padding: 4rem;
  padding-top: 0;
`;

const Image = styled.img`
  max-width: 40rem;
`;

const ContentWrapper = styled.section`
  height 100%;
  width: 100%;
  color: #fff;
  overflow: auto;
`;

const Menu = styled.aside`
  padding: 0 1rem;
`;

const activeMenuItem = css`
  background-color: #fff;
  color: #333;
`;

const MenuItem = styled.button`
  display: block;
  margin: 1rem 0;
  cursor: pointer;
  background-color: transparent;
  font-size: 2rem;
  border: none;
  color: #fff;
  width: 100%;

  ${({ isActive }) => isActive && activeMenuItem}

  &:hover {
    ${activeMenuItem}
  }
`;

const Main = styled.main`
  background-color: #282c34;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainContentWrapper = styled.section`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const TitleBar = styled.section`
  width: 100%;
  font-size: 2rem;
  color: #fff;
  padding: 1rem;
  border-bottom: 1px solid;
`;

function getId(ID) {
  return `${ID}__ID`;
}

function App() {
  const [activeSectionID, setActiveSectionID] = React.useState(null);
  const [activeTitle, setActiveTitle] = React.useState("");
  const scrollRef = React.useRef(null);

  const handleEnter = (ID, title) => (thing) => {
    const { event } = thing;
    setActiveSectionID(ID);
    setActiveTitle(title);
    // console.log("thing:enter", thing, ID);
  };

  const handleLeave = (ID) => (thing) => {
    const { event } = thing;
    // console.log("thing:leave", thing, ID);
  };

  const handleMenuItemClick = (ID, title) => () => {
    const $scrollContainter = scrollRef?.current;
    const $scrollHeader = $scrollContainter.querySelector(`#${ID}`);

    // $scrollHeader.scrollIntoView({ behavior: "smooth" });
    $scrollHeader.scrollIntoView();
    // setActiveSectionID(ID);
    // setActiveTitle(title);
  };
  console.log(activeSectionID, activeTitle);

  return (
    <Main>
      <GlobalStyle />
      <TitleBar>{activeTitle}</TitleBar>
      <MainContentWrapper>
        <Menu>
          {titlez.map((title) => {
            const ID = getId(title);
            const isActive = ID === activeSectionID;
            return (
              <MenuItem
                id={`${ID}__menu`}
                key={title}
                isActive={isActive}
                onClick={handleMenuItemClick(ID, title)}
              >
                {title}
              </MenuItem>
            );
          })}
        </Menu>
        <ContentWrapper ref={scrollRef}>
          {titlez.map((title) => {
            const ID = getId(title);
            return (
              <Waypoint
                onEnter={handleEnter(ID, title)}
                onLeave={handleLeave(ID)}
                key={title}
              >
                <Section id={ID}>
                  <H1>{title}</H1>
                  <Content>
                    <Image src={logoObject[title]} alt={title} />
                  </Content>
                </Section>
              </Waypoint>
            );
          })}
        </ContentWrapper>
      </MainContentWrapper>
    </Main>
  );
}

export default App;
