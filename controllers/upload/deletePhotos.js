const deletePhotos= async(req,res,next)=>{
    const { ids } = req.body;
    try {
        const results = await Promise.all(ids.map(id => cloudinary.uploader.destroy(id)));
        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports= deletePhotos;