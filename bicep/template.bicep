param frontdoors_cogworks_headless_name string = 'cogworks-headless'
param frontdoor_cogworks_website_host string
param frontdoors_cogworks_website_path string

resource frontdoors_cogworks_headless_name_resource 'Microsoft.Network/frontdoors@2020-05-01' = {
  name: frontdoors_cogworks_headless_name
  location: 'Global'
  properties: {
    enabledState: 'Enabled'
    friendlyName: frontdoors_cogworks_headless_name
    backendPools: [
      {
        name: 'live'
        properties: {
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
        }
      }
    ]
    routingRules: [
      {
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
          frontendEndpoints: [
            {
              id: '${resourceId('Microsoft.Network/frontdoors', frontdoors_cogworks_headless_name)}/FrontendEndpoints/${frontdoors_cogworks_headless_name}-azurefd-net'
            }
          ]
          routeConfiguration: {
            customForwardingPath: frontdoors_cogworks_website_path
            forwardingProtocol: 'HttpsOnly'
            '@odata.type': '#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration'
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
