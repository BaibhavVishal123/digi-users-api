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

# # Uncomment for local TF development if state file already in azure
# terraform {
#   backend "azurerm" {
#     resource_group_name  = "TF-ResourceGroup"
#     storage_account_name = "tfsabob"
#     container_name       = "tfstate"
#     key                  = "terraform.tfstate"
#   }
# }


provider "azurerm" {
  features {}
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