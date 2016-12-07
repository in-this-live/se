function copy_tag_generate(id){
  var copy_tag_before = '<button class="btn btn-primary" data-clipboard-target="#se_';
  var copy_tag_after = '">copy</button>';
  return (copy_tag_before + id + copy_tag_after);
}

function demo_tag_generate(id, url){
  var demo_tag_first = '<audio src="';
  var demo_tag_second = '" preload="none" id="se_demo_';
  var demo_tag_third = '"></audio><button class="btn btn-success" onClick="audioPlay(';
  var demo_tag_fourth = ')">demo</button>';
  return (demo_tag_first + url + demo_tag_second + id + demo_tag_third + id + demo_tag_fourth);
}

function favorite_tag_generate(id){
  var favorite_tag_before = '<button class="btn btn-warning" onClick="addFavoriteId(';
  var favorite_tag_after = ')">favorite</button>';
  return (favorite_tag_before + id + favorite_tag_after);
}

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
          //console.log("decodeURI(Var[1])")
          //console.log(decodeURI(Var[1]))
          //console.log(decodeURI(Var[1]).split("a"))
          //console.log(decodeURI(Var[1]).split(" "))
          return decodeURI(Var[1]).split(" ");
       };
    }
    //return "";
    return []
};
	
$(function() {
  $.getScript("./js/se_data_reader.js");
  var se_list = getSeData();

  //$.getJSON("./json/fret_hyper_se.min.json" , function(data) {
    var
      ulObj = $("#se_data"),
      len = se_list.length;
    
    var search_words = QueryString("find");

    if (search_words != [] && search_words.length > 0){
      //records = se_list.filter(function(item, index){
      //  if ((item.word).indexOf(search_word) >= 0) return true;
      //});
      
      records = []
      search_word_regexp = new RegExp(search_words.join("|"))
      search_word_alone = false
      if (search_words.length == 1){
        search_word_alone = true;
      }
      //console.log(search_word_regexp)
      //throw new Error("エラー発生")

      records = $.grep(se_list, function(item, index){
        if(search_word_regexp.test(item.word) == true){
          return (search_word_regexp.test(item.word));
        } else if (search_word_alone == true) {
          return (search_words[0] == item.len)
        } else {
          return false;
        }
      });

      //$.extend( $.fn.DataTable.defaults, { 
      //  language: {
      //    url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
      //  } 
      //}); 
      $("#foo-table").DataTable({
        data:records,
        autoWidth:false,
        processing:true,
        orderClasses:false,
        paging: false,
        pagingType: "simple_numbers",
        pageLength: 100,
        "lengthMenu": [ 50, 100, 250, 500, 1000, "ALL" ],
        searching: false,
        info: false,
        columns:[
          {data: 'id', "searchable": false},
          {data: 'initial'},
          {data: 'word', "orderable": false},
          {data: 'len'},
          {"render": function( data, type, full, meta ) {
            return copy_tag_generate(full.id);
          }, "orderable": false, "searchable": false},
          {"render": function( data, type, full, meta ) {
            return demo_tag_generate(full.id, full.url);
          }, "orderable": false, "searchable": false},
          {"render": function( data, type, full, meta ) {
            return favorite_tag_generate(full.id);
          }, "orderable": false, "searchable": false}
        ],
        rowCallback:function( row, data, index ) {
          $(row).children().eq(2).attr('id','se_'+(data.id));
        }
      }); 
      
      //for start
      //for(var i = 0; i < records.length; i++) {
      //  ulObj.append(
      //    $("<tr></tr>")
      //        .append($("<td></td>").text(records[i].id))
      //        .append($("<td></td>").text(records[i].initial))
      //        .append($("<td></td>").attr({"id":"se_"+records[i].id}).text(records[i].word))
      //        .append($("<td></td>").text(records[i].len))
      //        .append($("<td></td>")
      //          .append($("<button></button>").attr({"class":"btn btn-primary", "data-clipboard-target":"#se_"+records[i].id}).text("copy")))
      //        .append($("<td></td>")
      //          .append($("<audio></audio>").attr({"src":records[i].url,"preload":"none", "id":"se_demo_"+ records[i].id}))
      //          .append($("<button></button>").attr({"class":"btn btn-success", "onClick":"audioPlay("+ records[i].id+")"}).text("demo"))
      //        )
      //    );        
      //}
      //for end
      
      $("h1").append("結果：" + search_words + "(" + records.length + "件)");

    }

  //});
});