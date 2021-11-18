// for barplot

d3.json("give url to api you created from app.py").then(function(result) {
    console.log(result)
    x = result.map(x => x.max)
    console.log(x)
})

