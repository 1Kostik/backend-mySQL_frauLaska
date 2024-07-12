
const deletePhoto= async(req,res,next)=>{
    const publicId = req.params.id;
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports= deletePhoto;