import React from 'react';

const FinalFindFalconeResult = ({result}) => {


    return (
        <div>
            {result.isError && <p>Something went wrong ...</p>}
           {result.isLoading ? <p>Loading ....</p> : <p>{result.data.status === 'success' ? `Queen find in planet ${result.data.planet_name}` : `Queen not found`}</p>}
        </div>
    );
};

export default FinalFindFalconeResult;