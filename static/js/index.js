// for barplot

d3.json("/api/features/fire").then(function(result) {
    console.log(result)
    x = result.map(x => x.max)
    console.log(x)
})

