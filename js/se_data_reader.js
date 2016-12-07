function setSessionStorage(key, value) {
  if (!window.sessionStorage) return;
  try {
  sessionStorage.setItem(key, value);
  } catch (err) {
  console.error(err);
  }
}

function setLocalStorage(key, value) {
  if (!window.localStorage) return;
  try {
  localStorage.setItem(key, value);
  } catch (err) {
  console.error(err);
  }
}


// origin
function setFavoriteIds(ids){
  if (!window.localStorage) return;
  if(('localStorage' in window) && (window.localStorage !== null)) {
    try {
      unique_ids = $.unique(ids);
      localStorage.setItem(
        'favoriteIds',
        JSON.stringify(unique_ids)
      );
    } catch (err) {
      console.error(err);
    }
  } else {
    return;
  }
}

function clearFavoriteIds(){
  if (!window.localStorage) return;
  if(('localStorage' in window) && (window.localStorage !== null)) {
    try {
      // データの削除
      localStorage.removeItem('favoriteIds');
      window.localStorage.removeItem('favoriteIds');
      location.reload();
    } catch (err) {
      console.error(err);
    }
  } else {
    return;
  }
}


function setSeData(data){
  console.log("setSeData() innner")
  if (!window.sessionStorage) return;
  if(('sessionStorage' in window) && (window.sessionStorage !== null)) {
    try {
      console.log("try set sessionStorage.setItem")
      sessionStorage.setItem(
        'seData',
        JSON.stringify(data)
      );
      console.log("try set sessionStorage.setItem success!")
      return;
    } catch (err) {
      console.log("try to error. from set sessionStorage.setItem")
      console.error(err);
      return;
    }
  } else {
    console.log("using brouser is not support sessionStorage or sessionStorage is null")
    return;
  }
}

function getSeJSON(){
  console.log("getSeJSON() inner")
  var se_list = [];

  var xmlHttp;
  var textData = "";
  var lineData;
  var cellData;
  xmlHttp = new XMLHttpRequest();
  console.log("new XMLHttpRequest() created")
  xmlHttp.onreadystatechange = function() {
    console.log("readyState の値 : " + xmlHttp.readyState);
    switch(xmlHttp.readyState) {
      case 0:
        //読込開始前
        break;
      case 1:
        //読込中
        break;
      case 2:
        //とりあえず読み込んだ
        break;
      case 3:
        //読み込んだデータ解析中
        break;
      case 4:
        //処理完了。解析は失敗した可能性もあり
        console.log("try JSON.parse(xmlHttp.responseText)")
        se_list = JSON.parse(xmlHttp.responseText)
        console.log("success JSON.parse(xmlHttp.responseText)")
        //textData = xmlHttp.responseText;
        //lineData = textData.split(/\r\n|\r|\n/);
        //cellData;
        //gData = new Array( lineData.length-1 );
        //for( i=0; i < lineData.length-1; i++ ) {
        //  cellData = lineData[i+1].split(/,/);
        //  gData[i] = new Array( cellData.length );
        //  for( j=0; j < cellData.length; j++ ) {
        //    gData[i][j] = cellData[j].trim();
        //  }
        //}
        //console.log( gData );
        break;
      default:
        break;
    }
  }
  console.log("try XMLHttpRequest object open")
  xmlHttp.open("GET", "./json/fret_hyper_se.min.json", false);
  console.log("success XMLHttpRequest object open")
  console.log("try XMLHttpRequest object send(null)")
  xmlHttp.send(null);
  console.log("success XMLHttpRequest object send(null)")

  //$.ajax({
  //  url: './json/fret_hyper_se.min.json',
  //  dataType: 'json',
  //  async: false,
  //  data: { 'data' : 'data' },
  //  success: function(json) {
  //  se_list = json;
  //  }
  //});

  return se_list;
}

function getSeData(){
  console.log("getSeData() inner")
  var se_data = null;
  if (!window.sessionStorage){
    console.log("un support sessionStorage")
    se_data = null;
  }
  if(('sessionStorage' in window) && (window.sessionStorage !== null)) {
    try {
      console.log("try get se_data from sessionStorage")
      se_data = JSON.parse(
        sessionStorage.getItem('seData')
      );
      console.log("JSON.perse success from sessionStorage")
    } catch (err){
      console.log("sessionStorage JSON.parse error?")
      console.log(err)
      console.log("try getSeJSON()")
      se_data = getSeJSON();
    }
  } else {
    console.log("sessionStorage is null")
    console.log("try getSeJSON()")
    se_data = getSeJSON();
  }

  //if ((se_data != null) && ((Object.prototype.toString.call(se_data) == "[object Array]") && (se_data.size != 0))){
  if ((se_data != null) && (se_data.size != 0)){
    console.log("data acquisition success. and set sessionStorage")
    setSeData(se_data);
    return se_data;
  } else {
    console.log("data acquisition failed. try getSeJSON() and set sessionStorage")
    se_data = getSeJSON();
    setSeData(se_data);
    return se_data;
  }
}

function getFavoriteSeIds(){
  var favorite_ids = [];
  if (!window.localStorage){
    favorite_ids = [];
  }
  if(('localStorage' in window) && (window.localStorage !== null)) {
    try {
      favorite_ids = JSON.parse(
        localStorage.getItem('favoriteIds')
      );
    } catch (err){
      console.log(err)
      favorite_ids = [];
    }
  } else {
    favorite_ids = [];
  }

  if ((favorite_ids != null) && ((Object.prototype.toString.call(favorite_ids) == "[object Array]") && (favorite_ids.size != 0))){
    setFavoriteIds(favorite_ids);
    return favorite_ids;
  } else {
    favorite_ids = [];
    setFavoriteIds(favorite_ids);
    return favorite_ids;
  }
}

function removeFavoriteId(id){
  var favorite_ids = getFavoriteSeIds();
  favorite_ids.some(function(v, i){
    if (v==id) favorite_ids.splice(i,1);
  });
  setFavoriteIds(favorite_ids);
  location.reload();
  return favorite_ids;
}

function addFavoriteId(id){
  var favorite_ids = getFavoriteSeIds();
  
  favorite_ids.push(id);
  favorite_ids.sort(function(a,b){
    if(a<b) return -1;
    if(a>b) return 1;
    return 0;
  });
  setFavoriteIds(favorite_ids);
  return favorite_ids;
}