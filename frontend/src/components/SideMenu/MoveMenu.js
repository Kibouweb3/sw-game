import { useSelector, useDispatch } from "react-redux";
import sideMenuSlice from "../../store/sideMenu/sideMenuSlice";

import cl from "./MoveMenu.module.css";
import lightningSvg from "../../img/lightning-optimised.svg";

import { Button } from "react-bootstrap";
import MenuContainer from "./components/MenuContainer";
import MenuHeader from "./components/MenuHeader";
import ImgContainer from "./components/ImgContainer";
import InfoContainer, {
  SubInfo,
  SubInfoProp,
  SubInfoSvgValue,
} from "./components/InfoContainer";
import ActionBtnsContainer from "./components/ActionBtnsContainer";
import NavigationPanel from "./components/NavigationPanel";

export default (function () {
  const clickedShipIndex = useSelector(
    (state) => state.sideMenu.clickedShipIndex
  );
  const { avatarString, actionPoints } = useSelector(
    (state) => state.data.shipDataArray[clickedShipIndex]
  );
  const { transX, transY } = useSelector((state) => state.sideMenu.mockMoves);
  const dispatch = useDispatch();

  // Calculate how many moves it takes to translate
  const moves = Math.max(Math.abs(transX), Math.abs(transY));

  const goBack = () => {
    dispatch(sideMenuSlice.actions.chooseMenuType("info"));
  };

  return (
    <MenuContainer className={cl.moveMenu}>
      <MenuHeader>Move</MenuHeader>
      <ImgContainer src={avatarString}></ImgContainer>
      <InfoContainer>
        <SubInfo>
          <SubInfoProp>DARK MATTER</SubInfoProp>
          <SubInfoSvgValue repeats={actionPoints - moves} url={lightningSvg} />
        </SubInfo>
      </InfoContainer>
      <NavigationPanel />
      <ActionBtnsContainer>
        <Button variant="outline-light" onClick={goBack}>
          <span className="h5">Back to Ship Info</span>
        </Button>
        <Button variant="light">
          <span className="h3">Confirm Move</span>
        </Button>
      </ActionBtnsContainer>
    </MenuContainer>
  );
});
