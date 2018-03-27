
$(document).ready(function(){
    $("#clearButton").click(function(){
        $("#searchTerm").val("");
        $("#startYear").val("");
        $("#endYear").val("");
        numResults = 0;
    });
    $("#searchButton").click(function(){
        // Url to query the NYT API
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        // Link to what user puts in search box
        var search = $("#searchTerm").val();
        var beginDate = $("#startYear").val() + "0101";
        var endDate = $("#endYear").val() + "0101";
        console.log(search);
        console.log(beginDate);
        console.log(endDate);
        // Our different attributes we're adding to the URL
        url += '?' + $.param({
            'api-key': "9a00547b33214577b7f6c874717d1065",
            'q': search,
            'begin_date': beginDate,
            'end_date': endDate
            });
        // Query the NYT api with an ajax call
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            $('#article-list').html(
                `
                <section>
                <h1>${result.response.docs["0"].headline.main}</h1>
                <hr />
                <p>${result.response.docs["0"].pub_date}</p>
                <h2>${result.response.docs["0"].byline.original}</h2>
                <p>${result.response.docs["0"].web_url}</p>
                </section>
                `
            );
        }).fail(function(err) {
            throw err;
        });
    });
});