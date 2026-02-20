<?php
$allowedOrigins = [
    'https://digitix08.github.io',
    'http://digitix08.ddns.net',
    'https://digitix08.ddns.net',
    'http://gabi.redtro.net',
    'https://gabi.redtro.net'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
    //file_put_contents('debug.log', date('c') . " [{$origin}] Was allowed access\n", FILE_APPEND);
}
//else file_put_contents('debug.log', date('c') . " [{$origin}] Was denied access\n", FILE_APPEND);

function reader($tapes){
  if (file_exists("./" . $tapes . ".txt")){
  $txt_file = mb_convert_encoding(file_get_contents("./" . $tapes . ".txt"), 'UTF-8', 'UTF-8');
  $rows     = explode("\n", $txt_file);
  array_shift($rows);
  $last = 0;
  $info = array();
  $print = false;
  $tape = 0;
  $side = NULL;
  $count = 0;
  $album = false;
  $albCnt = 0;
  $arrCount = 0;
  $hasComments = false;
  $commCount = 0;
  foreach($rows as $row => $data)
  {
    if(strlen($data)>0){
      //get row data
      $row_data = explode(' - ', $data);
      if(strcasecmp($row_data[0], "alte shazamuri:")==0) break; // in case it gets to "other shazams, it stops"
      if(count($row_data)==1){
        $name = explode(' ', $row_data[0]);
        if(strcasecmp($name[0], "side")==0&&$tape>0){//side append
          $sideName = $name[1];
          $side++;
          $info[$tape]["side_".$side] = array(0 => array("name" => $sideName));
          $count = 1;
          $arrCount = 1;
          //echo 'side ' . $info[$row]['side'] . '<br />';
        }
        else if($row - $last >1){//tape append
          $detail = $row_data[0];
          if(strpos($detail, "---")!=0){
            $print = true;
            $detail = substr($detail, 0, strpos($detail, "---"));
          }
          if($print){

            //some tapes have an * to show they were on the old site

            if(substr($detail,0,1)=='*')$detail = substr($detail, 1);
            //numeric id

            //$idnr = null;

            $lbrpos = strpos($detail, "]");

            if($lbrpos!==false && $lbrpos<8){

              $info[$row]["id"] = substr($detail, 1, $lbrpos - 1);

              $detail = substr($detail, $lbrpos+1, strlen($detail) - $lbrpos);

            }
            $info[$row]["name"] = $detail;
            $side = 0;
            $tape = $row;
          }
          //echo 'id: ' . $info[$row]['id'] . '<br />';
        }
        else
          if($print&&$side!=NULL){//melody without author append
            if(str_starts_with($row_data[0], "___")){
            $comment = substr($row_data[0], 3);
            if(!$hasComments){
              $hasComments = true;
              $commCount = 0;
            }
            if($album){
              $albCnt--;
              $info[$tape]["side_".$side][$arrCount]['album'][$albCnt][$commCount] = $comment;
              $albCnt++;
            }
            else{
              $arrCount--;
              $info[$tape]["side_".$side][$arrCount]["comments"][$commCount] = $comment;
              $arrCount++;
            }
            $commCount++;
          }
          
          else if(str_starts_with($row_data[0], "__")){
            $comment = substr($row_data[0], 2);
            $hasComments = true;
            $commCount = 0;
            if($album){
              $albCnt--;
              $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]["comments"][$commCount] = array("name" => $comment);
              $albCnt++;
            }
            else{
              $arrCount--;
              $info[$tape]["side_".$side][$arrCount]["comments"][$commCount] = array("name" => $comment);
              $arrCount++;
            }
            $commCount++;
          }

            if($album && str_starts_with($row_data[0], "+++++")){
              $album = false;
              $arrCount++;
              $count = $albCnt + $arrCount;
            }
            else if($album && substr($row_data[0],0,1)=='|' && !$hasComments){
              $title = substr($row_data[0], 1);
              $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]['nr'] = $count;
              $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]['title'] = $title;
              $count++;
              $albCnt++;
              $hasComments = false;
            }

            else if(!$album && !$hasComments){
              $info[$tape]["side_".$side][$arrCount]['nr'] = $count;
              $info[$tape]["side_".$side][$arrCount]['title'] = $row_data[0];
              $arrCount++;
              $count++;
              $hasComments = false;
            }
          }
          //echo 'Title: ' . $info[$row]['title'] . '<br />';
      }
      else{
        if($side!=NULL){
          if(substr($row_data[0],0,1)=='+' && !$album){//album mode
            $albAuth = substr($row_data[0], 1);
            $albName = $row_data[1];
            $albCnt = 0;
            $arrCount = $count;
            if(strpos($albName, "++")!=0){
              $albName = substr($albName, 0, strpos($albName, "++"));
            }
            $album = true;
            $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]['author'] = $albAuth;
            $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]['name'] = $albName;
            $albCnt++;
          }
          
          else if($album && substr($row_data[0],0,1)=='|'){
            $author = substr($row_data[0], 1);
            $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]['nr'] = $count;
            $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]['author'] = $author;
            $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]['title'] = $row_data[1];
            $count++;
            $albCnt++;
            $hasComments = false;
          }
          
          if(str_starts_with($row_data[0], "___")){
            $comment = substr($row_data[0], 3);
            if(!$hasComments){
              $hasComments = true;
              $commCount = 0;
            }
            if($album){
              $albCnt--;
              $info[$tape]["side_".$side][$arrCount]['album'][$albCnt][$commCount] = $comment . " - " . $row_data[1];
              $albCnt++;
            }
            else{
              $arrCount--;
              $info[$tape]["side_".$side][$arrCount]["comments"][$commCount] = $comment . " - " . $row_data[1];
              $arrCount++;
            }
            $commCount++;
          }
          
          else if(str_starts_with($row_data[0], "__")){
            $comment = substr($row_data[0], 2);
            $hasComments = true;
            $commCount = 0;
            if($album){
              $albCnt--;
              $info[$tape]["side_".$side][$arrCount]['album'][$albCnt]["comments"][$commCount] = array("name" => $comment);
              $albCnt++;
            }
            else{
              $arrCount--;
              $info[$tape]["side_".$side][$arrCount]["comments"][$commCount] = array("name" => $comment);
              $arrCount++;
            }
            $commCount++;
          }
          
          else if(!$album){//melody with author append
            $info[$tape]["side_".$side][$arrCount]['nr'] = $count;
            $info[$tape]["side_".$side][$arrCount]['author'] = $row_data[0];
            $info[$tape]["side_".$side][$arrCount]['title'] = $row_data[1];
            $arrCount++;
            $count++;
            $hasComments = false;
          }
        }
        /*echo 'Row ' . $row . ' ID: ' . $info[$row]['author'] . '<br />';
        echo 'Row ' . $row . ' NAME: ' . $info[$row]['title'] . '<br />';*/
      }  
      //echo '<br />';
      $last = $row;;
    }
  }
  return $info;
  }
  else sendError("failed to get list of tapes", 400, "invalid request sent");
}
// Always return JSON - no more IE8 HTML detection
function sendResponse($data, $status = 200) {
    http_response_code($status);

    // Always JSON, always these headers for IE8 compatibility
    header("Content-Type: application/json");
    header("Cache-Control: no-cache, no-store, must-revalidate");
    header("Pragma: no-cache");
    header("Expires: 0");
    
    mb_convert_encoding($data, 'UTF-8', 'UTF-8');

    echo json_encode($data);
    if(!json_encode($data))echo json_last_error_msg();
}

function sendError($message, $status = 400, $details = null) {
    $error = ["error" => $message];
    if ($details) $error["details"] = $details;
    sendResponse($error, $status);
}
if(isset($_GET['list'])){
  $request = $_GET['list'];
  $result = reader($request);

  sendResponse(array("tapes" => array_values($result)));
}
else sendError("failed to get list of tapes", 400, "invalid request sent");

?>