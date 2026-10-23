import React from 'react';

const WorkOuts = async () => {
    const res = await fetch(
        `https://fitlog-api.onrender.com/api/fitlog/`);
        return res.json();

};

export default WorkOuts;