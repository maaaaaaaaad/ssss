resource "aws_route53_zone" "main" {
  name = "jellomark.com"

  tags = {
    Name = "${var.project_name}-zone"
  }
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.jellomark.com"
  type    = "A"
  ttl     = 300
  records = [aws_eip.backend.public_ip]
}
