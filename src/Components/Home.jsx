import Card from "./Card";
import Carosel from "./Carosel";
import Jwt from "./Jwt";
import SliderOfHome from "./SliderOfHome";

export default function Home() {
  return (
    <div>
      <SliderOfHome></SliderOfHome>
      <Carosel></Carosel>
      <Card></Card>  
    </div>
  );
}
