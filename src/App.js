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
const SCIENC3 = "science";

const titlez = [SOMETIMES, SCIENCE, IS, MORE, ART, THAN, SCIENC3];
const titlezList = [
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
  ...titlez,
];

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
  margin-top: 3px;
  margin-bottom: 2rem;
`;

const Content = styled.section`
  display: flex;
  justify-content: center;
  align-items: start;
`;

const Section = styled.section`
  border: 1px solid #fff;
  padding: 4rem;
  padding-top: 0;
`;

const Image = styled.img`
  max-width: 100%;
`;

const ContentWrapper = styled.section`
  height: 100%;
  width: 100%;
  color: #fff;
  overflow: auto;
`;

const Menu = styled.aside`
  padding: 0 1rem;
  overflow: auto;
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

function getId(ID, index) {
  return `${ID}__ID__${index}`;
}

function App() {
  const [activeSectionID, setActiveSectionID] = React.useState(null);
  const [activeTitle, setActiveTitle] = React.useState("");
  const scrollRef = React.useRef(null);
  const menuRef = React.useRef(null);

  const handleEnter = (ID, title) => (thing) => {
    const { event } = thing;
    setActiveSectionID(ID);
    setActiveTitle(title);

    // scroll into view if hidden
    const $menuRef = menuRef?.current;
    const $activeElement = $menuRef.querySelector(`#${ID}__menu`);
    const isOutOfViewport = getIsOutOfViewport($activeElement, $menuRef);

    if (isOutOfViewport) {
      $activeElement.scrollIntoView();
    }
  };

  const handleMenuItemClick = (ID, title) => () => {
    const $scrollContainter = scrollRef?.current;
    const $scrollHeader = $scrollContainter.querySelector(`#${ID}`);

    $scrollHeader.scrollIntoView();
  };

  console.log("activez: ", activeSectionID, activeTitle);

  return (
    <Main>
      <GlobalStyle />
      <TitleBar>{activeTitle}</TitleBar>
      <MainContentWrapper>
        <Menu ref={menuRef}>
          {titlezList.map((title, index) => {
            const ID = getId(title, index);
            const isActive = ID === activeSectionID;
            const text = `${title} ${index}`;
            return (
              <MenuItem
                id={`${ID}__menu`}
                key={text}
                isActive={isActive}
                onClick={handleMenuItemClick(ID, text)}
              >
                {text}
              </MenuItem>
            );
          })}
        </Menu>
        <ContentWrapper ref={scrollRef}>
          {titlezList.map((title, index) => {
            const ID = getId(title, index);
            const text = `${title} ${index}`;
            return (
              <Waypoint
                onEnter={handleEnter(ID, text)}
                fireOnRapidScroll={false}
                key={text}
              >
                <Section id={ID}>
                  <H1>{text}</H1>
                  <Content>
                    <Image src={logoObject[title]} alt={text} />
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

/*!
 * Check if an element is out of the viewport
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * https://vanillajstoolkit.com/helpers/isoutofviewport/
 * @param  {Node}  elem The element to check
 * @return {Object}     A set of booleans for each side of the element
 */
function getIsOutOfViewport(element, container) {
  console.log("element", element);
  console.log("container", container);
  // Get element's bounding
  var bounding = element.getBoundingClientRect();

  // Check if it's out of the viewport on each side
  var out = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > container.innerHeight;
  out.right = bounding.right > container.innerWidth;
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;

  return out;
}
