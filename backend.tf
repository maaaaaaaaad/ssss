terraform {
  backend "s3" {
    bucket         = "jellomark-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-northeast-2"
    dynamodb_table = "jellomark-terraform-lock"
    encrypt        = true
    profile        = "jellomark"
  }
}
