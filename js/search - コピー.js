
$(function te() {
    // パラメータ追加
    $(document).on('click', '#send', function() {
        var word =  $('#inputSerchWord').val();
        location.search = '?find='+encodeURIComponent(word);
    });
});

function QueryString(name)
{
    var AllVars = window.location.search.substring(1);
    var Vars = AllVars.split("&");
    for (i = 0; i < Vars.length; i++)
    {
        var Var = Vars[i].split("=");
        if (Var[0] == name){
          return decodeURI(Var[1]);
       };
    }
    return "";
};
	
$(function() {
  $.getJSON("./json/fret_hyper_se.min.json" , function(data) {
    var
      ulObj = $("#se_data"),
      len = data.length;
    
    var search_word = QueryString("find");

    if (search_word != ""){
      records = data.filter(function(item, index){
        if ((item.word).indexOf(search_word) >= 0) return true;
      });
      
      for(var i = 0; i < records.length; i++) {
        ulObj.append(
          $("<tr></tr>")
              .append($("<td></td>").text(records[i].id))
              .append($("<td></td>").text(records[i].initial))
              .append($("<td></td>").attr({"id":"se_"+records[i].id}).text(records[i].word))
              .append($("<td></td>").text(records[i].len))
              .append($("<td></td>")
                .append($("<button></button>").attr({"class":"btn btn-primary", "data-clipboard-target":"#se_"+records[i].id}).text("copy")))
              .append($("<td></td>")
                .append($("<audio></audio>").attr({"src":records[i].url,"preload":"none", "id":"se_demo_"+ records[i].id}))
                .append($("<button></button>").attr({"class":"btn btn-success", "onClick":"audioPlay("+ records[i].id+")"}).text("demo"))
              )
          );
        
      }
      $("h1").append("結果：" + search_word + "(" + records.length + "件)");

    }

  });
});