# We strongly recommend using the required_providers block to set the
# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }
}

# # Uncomment for local TF development
# terraform {
#   backend "azurerm" {
#     resource_group_name  = "TF-ResourceGroup"
#     storage_account_name = "tfsabob"
#     container_name       = "tfstate"
#     key                  = "terraform.tfstate"
#   }
# }

variable "client_secret" {
}
provider "azurerm" {
  features {}
  # subscription_id = "4c8aab75-8197-48e7-a45a-da738a7060ed"
  # client_id       = "9addaa5c-8e37-4b9f-a86d-686e7eb3279c"
  # client_secret   = "CAa_EaTfoM99Ig~pZIrs57NG1UqQgR.UDf"
  # tenant_id       = "6169c379-c30b-43d0-91b8-30ea4874d9a4"
}

# Create a resource group
resource "azurerm_resource_group" "helloworld" {
  name     = "hello-world-resources"
  location = "West Europe"
}

# Create a virtual network within the resource group
resource "azurerm_virtual_network" "helloworld" {
  name                = "hello-world-network"
  resource_group_name = azurerm_resource_group.helloworld.name
  location            = azurerm_resource_group.helloworld.location
  address_space       = ["10.1.0.0/24"]
}