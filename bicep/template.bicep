param frontdoors_cogworks_headless_name string = 'cogworks-headless'
param frontdoor_cogworks_website_host string = 'cogworksheadless.z28.web.core.windows.net'
param frontdoors_cogworks_website_path string

resource frontdoors_cogworks_headless_name_resource 'Microsoft.Network/frontdoors@2020-05-01' = {
  name: frontdoors_cogworks_headless_name
  location: 'Global'
  properties: {
    resourceState: 'Enabled'
    enabledState: 'Enabled'
    friendlyName: frontdoors_cogworks_headless_name
    backendPools: [
      {
        id: '${frontdoors_cogworks_headless_name_resource.id}/BackendPools/live'
        name: 'live'
        properties: {
          resourceState: 'Enabled'
          backends: [
            {
              address: frontdoor_cogworks_website_host
              httpPort: 80
              httpsPort: 443
              priority: 1
              weight: 50
              backendHostHeader: frontdoor_cogworks_website_host
              enabledState: 'Enabled'
            }
          ]
          healthProbeSettings: {
            id: '${frontdoors_cogworks_headless_name_resource.id}/HealthProbeSettings/healthProbeSettings-1626352308062'
          }
          loadBalancingSettings: {
            id: '${frontdoors_cogworks_headless_name_resource.id}/LoadBalancingSettings/loadBalancingSettings-1626352308062'
          }
        }
      }
    ]
    healthProbeSettings: [
      {
        id: '${frontdoors_cogworks_headless_name_resource.id}/HealthProbeSettings/healthProbeSettings-1626352308062'
        name: 'healthProbeSettings-1626352308062'
        properties: {
          intervalInSeconds: 30
          path: '/'
          protocol: 'Https'
          resourceState: 'Enabled'
          enabledState: 'Enabled'
          healthProbeMethod: 'HEAD'
        }
      }
    ]
    frontendEndpoints: [
      {
        id: '${frontdoors_cogworks_headless_name_resource.id}/FrontendEndpoints/${frontdoors_cogworks_headless_name}-azurefd-net'
        name: '${frontdoors_cogworks_headless_name}-azurefd-net'
        properties: {
          hostName: '${frontdoors_cogworks_headless_name}.azurefd.net'
          sessionAffinityEnabledState: 'Disabled'
          sessionAffinityTtlSeconds: 0
          resourceState: 'Enabled'
        }
      }
    ]
    loadBalancingSettings: [
      {
        id: '${frontdoors_cogworks_headless_name_resource.id}/LoadBalancingSettings/loadBalancingSettings-1626352308062'
        name: 'loadBalancingSettings-1626352308062'
        properties: {
          additionalLatencyMilliseconds: 0
          sampleSize: 4
          successfulSamplesRequired: 2
          resourceState: 'Enabled'
        }
      }
    ]
    routingRules: [
      {
        id: '${frontdoors_cogworks_headless_name_resource.id}/RoutingRules/All'
        name: 'All'
        properties: {
          acceptedProtocols: [
            'Http'
            'Https'
          ]
          patternsToMatch: [
            '/*'
          ]
          enabledState: 'Enabled'
          resourceState: 'Enabled'
          frontendEndpoints: [
            {
              id: '${frontdoors_cogworks_headless_name_resource.id}/FrontendEndpoints/${frontdoors_cogworks_headless_name}-azurefd-net'
            }
          ]
          routeConfiguration: {
            customForwardingPath: frontdoors_cogworks_website_path
            forwardingProtocol: 'HttpsOnly'
            '@odata.type': '#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration'
            backendPool: {
              id: '${frontdoors_cogworks_headless_name_resource.id}/BackendPools/live'
            }
          }
        }
      }
    ]
    backendPoolsSettings: {
      enforceCertificateNameCheck: 'Enabled'
      sendRecvTimeoutSeconds: 30
    }
  }
}
