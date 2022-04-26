import React, { useRef } from "react";

const Result = ({ result, onReset }) => {
  const backgroundRef = useRef(null);
  document.body.style.overflowY = "hidden";
  return (
    <div className="final-falcone-result-background" ref={backgroundRef}>
      <div className="final-falcone-result-modal">
        <svg
          onClick={() => {
            backgroundRef.current.style.display = "none";
            document.body.style.overflowY = "scroll";
            onReset();
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        {/* {result.isError && <p>Something went wrong ...</p>} */}
        {result.isLoading ? (
          <p>Loading ....</p>
        ) : (
          <div className="final-falcone-result-modal_response">
            {result.data.status === "success" ? (
              <div className="final-falcone-result-modal_response--success">
                <h2 className="secondary-heading heading-break">
                  <span>🎉 🎉 Success! 🎉 🎉</span>
                  <div>
                    <span style={{ display: "block" }}>
                      Congratulations on Finding Falcone.
                    </span>
                    <span style={{ display: "block" }}>
                      King Shan is mightly pleased.
                    </span>
                  </div>
                </h2>
                <h3 className="tertiary-heading">
                  Planet found:{" "}
                  <span style={{ color: "rgb(16 185 129)" }}>
                    {result.data.planet_name}
                  </span>
                </h3>
              </div>
            ) : (
              <h3 className="tertiary-heading heading-break">
                <span style={{ margin: 0 }}>🙁 Failed to Finding Falcone</span>
                <span>Please Try Again...</span>
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
