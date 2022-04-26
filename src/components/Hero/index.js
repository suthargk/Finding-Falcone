import "../../App.css";
import Sun from "../../icons/Planet";

const FalconeHero = ({onReset}) => {
  return (
    <>
      <div className="header">
        <div className="header-reset">
          {" "}
          <Sun className="header-planet-svg"/>
          <button type="button" onClick={onReset}>Reset</button>
        </div>

        <div className="divider">
          <span></span>
        </div>
      </div>
      <div className="hero">
        <h1 className="primary-heading">Finding Falcone!</h1>
        <h2 className="secondary-heading">
          Select planets you want to search in:
        </h2>
      </div>
    </>
  );
};

export default FalconeHero;
