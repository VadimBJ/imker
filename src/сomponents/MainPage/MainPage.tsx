import styles from "./MainPage.module.css";
import Slider from "../Slider/Slider";
import TypeOfHoney from "../TypeOfHoney/TypeOfHoney";
import OurMission from "../OurMission/OurMission";
import TopCallery from "../Gallery/TopCallery/TopCallery";
import Gallery from "../Gallery/Gallery";

export default function MainPage(): JSX.Element {
  return (
    <>
        <Slider />
        <OurMission />
        <TypeOfHoney />
        <TopCallery />
        <Gallery />
    </>
  );
}
