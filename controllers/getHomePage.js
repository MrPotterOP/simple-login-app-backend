const getHomePage = (req, res)=>{
    const {name} = req.user;

    res.json({name});
}

export default getHomePage;