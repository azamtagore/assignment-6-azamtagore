export const AllWorkOuts = async () => {
    const res = await fetch(
        `https://fitlog-api.onrender.com/api/fitlog/`);
        return res.json();
    };