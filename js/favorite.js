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

function unfavorite_tag_generate(id){
  var favorite_tag_before = '<button class="btn btn-warning" onClick="removeFavoriteId(';
  var favorite_tag_after = ')">remove</button>';
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

function InitialSearch(name)
{
    var AllVars = window.location.search.substring(1);
    var Vars = AllVars.split("&");
    initial = ""
    for (i = 0; i < Vars.length; i++)
    {
        var Var = Vars[i].split("=");
        if (Var[0] == name){
          //console.log("decodeURI(Var[1])")
          //console.log(decodeURI(Var[1]))
          //console.log(decodeURI(Var[1]).split("a"))
          //console.log(decodeURI(Var[1]).split(" "))
          initial = decodeURI(Var[1]);
       };
       if (initial != ""){
         switch (initial){
           case 'a':
             return {initials: ['あ','い','う','え','お'], display: ":あ行"};
             break;
           case 'k':
             return {initials: ['か','き','く','け','こ','が','ぎ','ぐ','げ','ご'], display: ":か行"};
             break;
           case 's':
             return {initials: ['さ','し','す','せ','そ','ざ','じ','ず','ぜ','ぞ'], display: ":さ行"};
             break;
           case 't':
             return {initials: ['た','ち','つ','て','と','だ','ぢ','づ','で','ど'], display: ":た行"};
             break;
           case 'n':
             return {initials: ['な','に','ぬ','ね','の'], display: ":な行"};
             break;
           case 'h':
             return {initials: ['は','ひ','ふ','へ','ほ','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ'], display: ":は行"};
             break;
           case 'm':
             return {initials: ['ま','み','む','め','も'], display: ":ま行"};
             break;
           case 'y':
             return {initials: ['や','ゆ','よ'], display: ":や行"};
             break;
           case 'r':
             return {initials: ['ら','り','る','れ','ろ'], display: ":ら行"};
             break;
           case 'w':
             return {initials: ['わ','を','ん'], display: ":わ行"};
             break;
           default:
             return {initials: [], display: ":全部"};
             break;
         }
       }
    }
    //return "";
    return {initials: [], display: ":全部"};
};

$(function() {
  $.getScript("./js/se_data_reader.js");
  var favorite_ids = getFavoriteSeIds();
  var se_list = getSeData();
  //$.getJSON("./json/fret_hyper_se.min.json" , function(data) {

    var
      ulObj = $("#se_data"),
      len = se_list.length,
      records = []
      
    favorite_ids.sort(function(a,b){
      if(a<b) return -1;
      if(a>b) return 1;
      return 0;
    });

    //for(var i = 0; i < pick_up_count; i++) {
    $.each(favorite_ids,
      function(index, elem){
        records.push(se_list[elem-1])
      }
    )
    
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
        searching: true,
        info: true,
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
            return unfavorite_tag_generate(full.id);
          }, "orderable": false, "searchable": false}
        ],
        rowCallback:function( row, data, index ) {
          $(row).children().eq(2).attr('id','se_'+(data.id));
        }
      }); 
    
    if (records.size > 0){
      $("h1").append("：登録件数" + "(" + records.length + "件)");
    } else {
      $("h1").append("：登録件数" + "(" + records.length + "件)");
    }
    
    //$.each(ids,
    //  function(index, elem){
    //  ulObj.append(
    //    $("<tr></tr>")
    //      .append($("<td></td>").text(se_list[elem].id))
    //      .append($("<td></td>").text(se_list[elem].initial))
    //      .append($("<td></td>").attr({"id":"se_"+se_list[elem].id}).text(se_list[elem].word))
    //      .append($("<td></td>").text(se_list[elem].len))
    //      .append($("<td></td>")
    //         .append($("<button></button>").attr({"class":"btn btn-primary", "data-clipboard-target":"#se_"+se_list[elem].id}).text("copy")))
    //      .append($("<td></td>")
    //        .append($("<audio></audio>").attr({"src":se_list[elem].url,"preload":"none", "id":"se_demo_"+ se_list[elem].id}))
    //        .append($("<button></button>").attr({"class":"btn btn-success", "onClick":"audioPlay("+ se_list[elem].id+")"}).text("demo"))
    //       )
    //    );
    // }      
   //);
  //});
});