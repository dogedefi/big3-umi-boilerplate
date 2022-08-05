import { useState } from 'react';

const useForceUpdate = () => {
    const [factor, setFactor] = useState(0); // integer state
    return {
        forceUpdate: () => setFactor((factor) => factor + 1),
        factor,
    }; // update the state to force render
};

export default useForceUpdate;
