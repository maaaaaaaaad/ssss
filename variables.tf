variable "aws_region" {
  type    = string
  default = "ap-northeast-2"
}

variable "aws_profile" {
  type    = string
  default = "jellomark"
}

variable "project_name" {
  type    = string
  default = "jellomark"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  type    = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  type    = list(string)
  default = ["10.0.101.0/24", "10.0.102.0/24"]
}

variable "availability_zones" {
  type    = list(string)
  default = ["ap-northeast-2a", "ap-northeast-2c"]
}

variable "ec2_instance_type" {
  type    = string
  default = "t3.micro"
}

variable "ec2_public_key_path" {
  type    = string
  default = "~/.ssh/jellomark-ec2.pub"
}

variable "db_name" {
  type    = string
  default = "jellomark"
}

variable "db_username" {
  type    = string
  default = "jellomark"
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "db_instance_class" {
  type    = string
  default = "db.t3.micro"
}

variable "domain_name" {
  type    = string
  default = "jellomark.com"
}
