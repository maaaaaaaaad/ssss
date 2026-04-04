output "vpc_id" {
  value = aws_vpc.main.id
}

output "ec2_public_ip" {
  value = aws_eip.backend.public_ip
}

output "ec2_instance_id" {
  value = aws_instance.backend.id
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "rds_address" {
  value = aws_db_instance.postgres.address
}

output "ecr_repository_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/jellomark-ec2 ec2-user@${aws_eip.backend.public_ip}"
}
