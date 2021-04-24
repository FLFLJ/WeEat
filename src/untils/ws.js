
  

      //alert("您的浏览器支持 WebSocket!");
      
      // 打开一个 web socket
      let ws = new WebSocket("ws://localhost:8081");
       
      ws.onopen = function()
      {
         // Web Socket 已连接上，使用 send() 方法发送数据
         //ws.send(wsText);
         //alert("数据发送中...");
      };
       
      ws.onmessage = function (evt) 
      { 

      };
       
      ws.onclose = function()
      { 
         // 关闭 websocket
         //alert("连接已关闭..."); 
      };
   
 

export default{
    ws
}
