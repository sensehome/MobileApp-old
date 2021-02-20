import * as SignalR from "@microsoft/signalr"

export class AgentService {
  public static RpcHubConnection: string = "AgentConnectionStatus"
  public static RpcHubBroadcast: string = "Broadcast"
  public static RpcInvokePublish: string = 'PublishToMqttBroker';

  private static instance: AgentService
  public readonly Hub: SignalR.HubConnection

  private constructor(hubEndpoint: string) {
    this.Hub = new SignalR.HubConnectionBuilder()
      .withUrl(hubEndpoint)
      .build();
  }

  public static getInstance(): AgentService {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjVmZjBhOWQ1ZWMyNjIyNjViOTM2ZmFlZiIsInJvbGUiOiIxIiwibmJmIjoxNjEwMTI5Nzc0LCJleHAiOjE2MTA3MzQ1NzQsImlhdCI6MTYxMDEyOTc3NH0.JlAaprvMDvNhTMVK2CDYhixgOX7knupTDA2n-1CWvMg"
    if (!AgentService.instance) {
      AgentService.instance = new AgentService(`http://agent.sensehome.online/agenthub?access_token=${token}`)
    }
    return AgentService.instance
  }

  public dispose() {

  }
}