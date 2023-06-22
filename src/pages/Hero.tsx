import Image from "next/image";

const Hero = () => {
  return (
    <div className="hero-div">
      <Image
        className="hero-image"
        src="/mountain.jpg"
        alt="lake"
        width="900"
        height="900"
      />
    </div>
  );
};
export default Hero;
