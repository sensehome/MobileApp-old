import * as SignalR from "@microsoft/signalr"

export class AgentService {
  public static RpcHubConnection : string = "AgentConnectionStatus"
  public static RpcHubBroadcast : string = "Broadcast"

  private static instance : AgentService
  public readonly Hub : SignalR.HubConnection

  private constructor(hubEndpoint : string) {
    this.Hub = new SignalR.HubConnectionBuilder()
                          .withUrl(hubEndpoint)
                          .build();
  }

  public static getInstance() : AgentService {
    if(!AgentService.instance){
      AgentService.instance = new AgentService('http://192.168.0.100:4000/agenthub')
    }
    return AgentService.instance
  }

  public dispose() {
    
  }
}