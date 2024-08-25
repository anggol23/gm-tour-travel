const getFileURL = (req, filePath) => {
    const baseURL = `${req.protocol}://${req.hostname}`
    return `${baseURL}/images/${filePath}`
}

module.exports = getFileURL