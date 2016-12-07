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

$(function() {
  $.getScript("./js/se_data_reader.js");
  var se_list = getSeData();
  //$.getJSON("./json/fret_hyper_se.min.json" , function(data) {
    var
      ulObj = $("#se_data"),
      pick_up_count = 25,
      len = se_list.length,
      records = []
      
    var ids = []
    for (var i = 0; i < pick_up_count; i++) {
      ids.push(
        Math.floor( Math.random() * len )
      );
    }

    ids.sort(function(a,b){
      if(a<b) return -1;
      if(a>b) return 1;
      return 0;
    });

    //for(var i = 0; i < pick_up_count; i++) {
    $.each(ids,
      function(index, elem){
        records.push(se_list[elem])
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