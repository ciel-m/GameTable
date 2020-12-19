const ParsingService = {
    getGenres: function(value) {
        const res = []
        value.forEach(function (value) {
            res.push(value.name)
        })
        return res
    },
    getESRB: function(value) {
        return value.name
    }
}
export default ParsingService;